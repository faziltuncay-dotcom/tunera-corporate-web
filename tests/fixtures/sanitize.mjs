// Pure-JS mirror of `src/lib/analytics/sanitize.ts` used by
// `tests/analytics-sanitize.test.mjs`. Node 20's built-in test runner
// cannot load `.ts` files, so the runtime behaviour is duplicated
// here — typed surface lives in the .ts file, behavioural contract
// lives in this fixture and is exercised by the tests.
//
// Keep the two in sync. If you change a regex, a length cap, or a
// validation branch in the source file, mirror it here. The
// duplication is intentional: it keeps the test runner dependency-
// free and gives us a behavioural spec we can read end-to-end.

const ALLOWED_EVENT_NAMES = [
  "page_view",
  "section_view",
  "brand_card_click",
  "brand_redirect_click",
  "contact_whatsapp_click",
  "contact_phone_click",
  "contact_email_click",
  "contact_map_click",
  "language_switch",
  "service_card_click",
  "scroll_depth",
  "external_link_click",
  "form_submit_attempt",
  "form_submit_success",
  "form_submit_error",
];

const ALLOWED_EVENT_SET = new Set(ALLOWED_EVENT_NAMES);

const MAX_PATH_LENGTH = 512;
const MAX_REFERRER_LENGTH = 512;
const MAX_UTM_LENGTH = 128;
const MAX_LOCALE_LENGTH = 8;
const MAX_METADATA_BYTES = 2048;
const MAX_METADATA_KEYS = 24;
const MAX_METADATA_VALUE_LENGTH = 256;

const SAFE_PATH_RE = /^[\w\-./:#?&=%]+$/;
const SAFE_UTM_RE = /^[\w\-.]{1,128}$/;

export function isAllowedEventName(name) {
  return typeof name === "string" && ALLOWED_EVENT_SET.has(name);
}

export function sanitizePath(input) {
  if (typeof input !== "string" || input.length === 0) return "/";
  let path = input.split("?", 1)[0] ?? "/";
  path = path.split("#", 1)[0] ?? "/";
  if (!path.startsWith("/")) path = "/" + path;
  path = path.replace(/\/{2,}/g, "/");
  if (path.length > MAX_PATH_LENGTH) path = path.slice(0, MAX_PATH_LENGTH);
  if (!SAFE_PATH_RE.test(path)) return "/";
  return path;
}

export function sanitizeReferrer(input) {
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

export function sanitizeLocale(input) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length > MAX_LOCALE_LENGTH) return null;
  if (trimmed === "tr" || trimmed === "en") return trimmed;
  return null;
}

export function sanitizeUtm(input) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim().slice(0, MAX_UTM_LENGTH);
  if (trimmed.length === 0) return null;
  if (!SAFE_UTM_RE.test(trimmed)) return null;
  return trimmed;
}

export function sanitizeMetadata(input) {
  if (input === null || typeof input !== "object") return {};
  const out = {};
  let keys = 0;
  for (const [rawKey, rawValue] of Object.entries(input)) {
    if (keys >= MAX_METADATA_KEYS) break;
    if (typeof rawKey !== "string") continue;
    const key = rawKey.trim().slice(0, 64);
    if (key.length === 0) continue;
    if (!/^[a-zA-Z0-9_]+$/.test(key)) continue;
    let value = null;
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
  let serialized = JSON.stringify(out);
  while (serialized.length > MAX_METADATA_BYTES) {
    const lastKey = Object.keys(out).pop();
    if (!lastKey) break;
    delete out[lastKey];
    serialized = JSON.stringify(out);
  }
  return out;
}

export function sanitizeOpaqueId(input) {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  if (trimmed.length === 0 || trimmed.length > 128) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

export function parseClientPayload(input) {
  if (input === null || typeof input !== "object") return null;
  const value = input;
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
