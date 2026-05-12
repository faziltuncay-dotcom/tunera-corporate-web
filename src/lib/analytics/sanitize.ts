import {
  ALLOWED_EVENT_SET,
  type AnalyticsClientPayload,
  type AnalyticsEventName,
  type AnalyticsLocale,
} from "./types";

/**
 * Sanitisation + validation helpers for inbound analytics payloads.
 *
 * Everything that the server ultimately stores passes through these
 * helpers. Inputs are treated as untrusted: paths get capped and
 * stripped of query strings; referrers are limited to their origin +
 * pathname; UTM values lose anything that isn't a plain token;
 * metadata is flattened to a one-level map of primitive values whose
 * combined size cannot exceed `MAX_METADATA_BYTES`.
 *
 * No external dependency: the helpers run in both the route handler
 * and the unit tests (which use `node --test`).
 */

const MAX_PATH_LENGTH = 512;
const MAX_REFERRER_LENGTH = 512;
const MAX_UTM_LENGTH = 128;
const MAX_LOCALE_LENGTH = 8;
const MAX_METADATA_BYTES = 2048;
const MAX_METADATA_KEYS = 24;
const MAX_METADATA_VALUE_LENGTH = 256;

const SAFE_PATH_RE = /^[\w\-./:#?&=%]+$/;
const SAFE_UTM_RE = /^[\w\-.]{1,128}$/;

export function isAllowedEventName(name: unknown): name is AnalyticsEventName {
  return typeof name === "string" && ALLOWED_EVENT_SET.has(name);
}

/**
 * Path prefixes (and exact paths) that must never be counted as
 * public website traffic.
 *
 *   - `/admin`           — gated dashboard surface
 *   - `/api`             — internal endpoints, including the
 *                          analytics collector itself
 *   - `/_next`           — Next.js framework assets
 *   - `/favicon.ico`,
 *     `/robots.txt`,
 *     `/sitemap.xml`     — crawler housekeeping requests
 *
 * The list is the single source of truth used by the client tracker
 * (skip the fetch entirely), the API collector (no-op return 204
 * even if a client manually crafts an excluded path), and the
 * aggregate SQL helpers (filter the rows out of every dashboard
 * card). Centralising it here keeps "what counts as public traffic"
 * as one decision in one file.
 */
export const INTERNAL_PATH_PREFIXES = ["/admin", "/api", "/_next"] as const;
export const INTERNAL_EXACT_PATHS: ReadonlySet<string> = new Set([
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
]);

/**
 * True when the supplied path must be excluded from public analytics.
 *
 * Accepts arbitrary input. Non-strings, empty strings, and bare `/`
 * all fall through to `false` so the homepage and any caller error
 * never silently disappear from analytics.
 *
 * Matching is prefix + exact:
 *   - `/admin`           → true
 *   - `/admin/analytics` → true   (prefix + boundary)
 *   - `/administer`      → false  (no boundary after the prefix)
 *   - `/api/x`           → true
 *   - `/_next/static/…`  → true
 *   - `/favicon.ico`     → true
 *   - `/`                → false  (homepage stays public)
 */
export function isInternalPath(input: unknown): boolean {
  if (typeof input !== "string" || input.length === 0) return false;
  if (INTERNAL_EXACT_PATHS.has(input)) return true;
  for (const prefix of INTERNAL_PATH_PREFIXES) {
    if (input === prefix) return true;
    if (input.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

export function sanitizePath(input: unknown): string {
  if (typeof input !== "string" || input.length === 0) return "/";
  // Keep only the path portion. We deliberately drop the query string
  // and the fragment — they tend to carry session-bound noise and
  // occasionally PII (e.g. a search box) that has no place in the
  // analytics store.
  let path = input.split("?", 1)[0] ?? "/";
  path = path.split("#", 1)[0] ?? "/";
  if (!path.startsWith("/")) path = "/" + path;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > MAX_PATH_LENGTH) path = path.slice(0, MAX_PATH_LENGTH);
  if (!SAFE_PATH_RE.test(path)) return "/";
  return path;
}

export function sanitizeReferrer(input: unknown): string | null {
  if (typeof input !== "string" || input.length === 0) return null;
  try {
    const url = new URL(input);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const trimmed = `${url.origin}${url.pathname}`;
    if (trimmed.length > MAX_REFERRER_LENGTH) return trimmed.slice(0, MAX_REFERRER_LENGTH);
    return trimmed;
  } catch {
    return null;
  }
}

export function sanitizeLocale(input: unknown): AnalyticsLocale {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length > MAX_LOCALE_LENGTH) return null;
  if (trimmed === "tr" || trimmed === "en") return trimmed;
  return null;
}

export function sanitizeUtm(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().slice(0, MAX_UTM_LENGTH);
  if (trimmed.length === 0) return null;
  if (!SAFE_UTM_RE.test(trimmed)) return null;
  return trimmed;
}

/**
 * Flatten an arbitrary input into a one-level record of primitive
 * values. Anything that fails type / length / shape constraints is
 * dropped silently. The resulting object never exceeds
 * `MAX_METADATA_BYTES` when JSON-encoded.
 */
export function sanitizeMetadata(input: unknown): Record<string, string | number | boolean> {
  if (input === null || typeof input !== "object") return {};
  const out: Record<string, string | number | boolean> = {};
  let keys = 0;
  for (const [rawKey, rawValue] of Object.entries(input as Record<string, unknown>)) {
    if (keys >= MAX_METADATA_KEYS) break;
    if (typeof rawKey !== "string") continue;
    const key = rawKey.trim().slice(0, 64);
    if (key.length === 0) continue;
    if (!/^[a-zA-Z0-9_]+$/.test(key)) continue;
    let value: string | number | boolean | null = null;
    if (typeof rawValue === "string") {
      value = rawValue.slice(0, MAX_METADATA_VALUE_LENGTH);
    } else if (typeof rawValue === "number") {
      if (Number.isFinite(rawValue)) value = rawValue;
    } else if (typeof rawValue === "boolean") {
      value = rawValue;
    }
    if (value === null) continue;
    out[key] = value;
    keys += 1;
  }
  // Final size cap — if a caller crammed maximum-length strings into
  // every key, drop entries from the end until we fit.
  let serialized = JSON.stringify(out);
  while (serialized.length > MAX_METADATA_BYTES) {
    const lastKey = Object.keys(out).pop();
    if (!lastKey) break;
    delete out[lastKey];
    serialized = JSON.stringify(out);
  }
  return out;
}

/**
 * Validate a hex-ish opaque identifier supplied by the client.
 * Visitor / session ids are generated browser-side as
 * `crypto.randomUUID()` and are hashed with the server salt before
 * being stored, so we only need a coarse shape check here.
 */
export function sanitizeOpaqueId(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > 128) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

/**
 * Coerce a raw JSON payload into a typed `AnalyticsClientPayload`.
 * Returns `null` if the event name fails validation — every other
 * field is sanitised at the call site.
 */
export function parseClientPayload(input: unknown): AnalyticsClientPayload | null {
  if (input === null || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  const event = value.event;
  if (!isAllowedEventName(event)) return null;
  return {
    event,
    path: typeof value.path === "string" ? value.path : undefined,
    locale: typeof value.locale === "string" ? value.locale : undefined,
    referrer: typeof value.referrer === "string" ? value.referrer : null,
    utmSource: typeof value.utmSource === "string" ? value.utmSource : null,
    utmMedium: typeof value.utmMedium === "string" ? value.utmMedium : null,
    utmCampaign: typeof value.utmCampaign === "string" ? value.utmCampaign : null,
    visitorId: typeof value.visitorId === "string" ? value.visitorId : null,
    sessionId: typeof value.sessionId === "string" ? value.sessionId : null,
    consentAnalytics: value.consentAnalytics === true,
    metadata: value.metadata,
  };
}
