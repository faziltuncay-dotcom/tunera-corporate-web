/**
 * Referrer normalisation + self-host detection.
 *
 * Used by the admin dashboard's Top Referrers panel. Two pure
 * helpers:
 *
 *   - `normalizeReferrer(raw)` returns a friendly label for a stored
 *     referrer URL. Known social / search hosts collapse to a short
 *     brand name ("Instagram", "Google", "WhatsApp") regardless of
 *     the link-shim subdomain Instagram/Facebook/X redirect through.
 *     Unknown hosts fall through to the bare hostname so the operator
 *     still sees something truthful.
 *
 *   - `isSelfReferrerHost(host)` returns true when the supplied host
 *     is one of the Tunera production origins. Self-referrals get
 *     filtered out at the SQL layer too (`selfReferrerSqlPattern`),
 *     but this predicate exists for unit tests and for any
 *     post-processing.
 *
 * Both helpers are pure JS and have no `next` / database
 * dependency so they can be reused by the route layer, the
 * aggregate layer, and the JS test harness in `tests/`.
 */

const SOCIAL_LABEL_BY_HOST: Readonly<Record<string, string>> = {
  // Instagram link shim is l.instagram.com; web is www.instagram.com.
  "instagram.com": "Instagram",
  "www.instagram.com": "Instagram",
  "l.instagram.com": "Instagram",
  // Facebook link shim is l.facebook.com (mobile m.facebook.com too).
  "facebook.com": "Facebook",
  "www.facebook.com": "Facebook",
  "l.facebook.com": "Facebook",
  "m.facebook.com": "Facebook",
  "lm.facebook.com": "Facebook",
  // Google search referrers come from country-coded TLDs as well.
  "google.com": "Google",
  "www.google.com": "Google",
  "google.com.tr": "Google",
  "www.google.com.tr": "Google",
  // LinkedIn.
  "linkedin.com": "LinkedIn",
  "www.linkedin.com": "LinkedIn",
  // X / Twitter.
  "t.co": "X / Twitter",
  "x.com": "X / Twitter",
  "www.x.com": "X / Twitter",
  "twitter.com": "X / Twitter",
  "www.twitter.com": "X / Twitter",
  // WhatsApp web + link API.
  "whatsapp.com": "WhatsApp",
  "www.whatsapp.com": "WhatsApp",
  "web.whatsapp.com": "WhatsApp",
  "api.whatsapp.com": "WhatsApp",
};

/**
 * Production hosts that must be treated as self-referrers and
 * therefore excluded from Top Referrers (which is an *acquisition*
 * surface — internal navigation isn't a traffic source).
 *
 * Matched case-insensitively. Any future deployment origin (custom
 * domain, preview origin used for QA) belongs in this list too.
 */
export const SELF_REFERRER_HOSTS: ReadonlyArray<string> = ["tunera.com.tr", "www.tunera.com.tr"];

const stripWww = (host: string): string => (host.startsWith("www.") ? host.slice(4) : host);

export function isSelfReferrerHost(host: string | null | undefined): boolean {
  if (typeof host !== "string" || host.length === 0) return false;
  const lower = host.trim().toLowerCase();
  if (lower.length === 0) return false;
  return SELF_REFERRER_HOSTS.includes(lower) || SELF_REFERRER_HOSTS.includes(stripWww(lower));
}

export type NormalizedReferrer = {
  /** Lower-case hostname, e.g. "l.instagram.com". `null` for invalid input. */
  host: string | null;
  /** Friendly label for the dashboard, e.g. "Instagram" or "example.com". */
  label: string;
  /** True when the referrer is one of the Tunera production hosts. */
  isSelf: boolean;
};

/**
 * Turn a stored referrer string into a normalized display row.
 *
 *   - Empty / invalid input → `{ host: null, label: "Direct", isSelf: false }`
 *     so historical NULLs render meaningfully instead of disappearing.
 *   - Self-host input → `{ ..., isSelf: true }`. The dashboard filters
 *     these out before display.
 *   - Known social/search host → mapped friendly label.
 *   - Otherwise → bare hostname.
 *
 * The function does NOT throw — sanitised production data should
 * always parse, but defensive callers can rely on this never raising.
 */
export function normalizeReferrer(raw: string | null | undefined): NormalizedReferrer {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { host: null, label: "Direct", isSelf: false };
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    // Sometimes a host-only value sneaks in. Try again with a scheme.
    try {
      url = new URL(`https://${raw}`);
    } catch {
      return { host: null, label: raw.slice(0, 64), isSelf: false };
    }
  }
  const host = url.hostname.toLowerCase();
  const isSelf = isSelfReferrerHost(host);
  if (isSelf) {
    return { host, label: host, isSelf: true };
  }
  const social = SOCIAL_LABEL_BY_HOST[host];
  if (social) return { host, label: social, isSelf: false };
  return { host, label: host, isSelf: false };
}

/**
 * Aggregate raw `(referrer, count)` rows into a normalized,
 * self-referrer-free top list.
 *
 *   - Self-referrer rows are dropped.
 *   - Empty referrers are dropped (they belong to "Direct" traffic,
 *     which is reported separately by the page-view counters; we do
 *     not want a "Direct" row to dominate the social/search panel).
 *   - Remaining rows are grouped by their normalized label so the
 *     three Instagram link-shim variants (l.instagram.com,
 *     www.instagram.com, instagram.com) collapse to one "Instagram"
 *     row with summed counts.
 *   - The result is sorted by count desc and capped at `limit`.
 */
export function aggregateReferrers(
  rows: ReadonlyArray<{ referrer: string | null; count: number }>,
  limit: number,
): Array<{ label: string; count: number }> {
  const totals = new Map<string, number>();
  for (const row of rows) {
    if (!row.referrer || row.referrer.length === 0) continue;
    const normalized = normalizeReferrer(row.referrer);
    if (normalized.isSelf || normalized.host === null) continue;
    const prev = totals.get(normalized.label) ?? 0;
    totals.set(normalized.label, prev + (Number.isFinite(row.count) ? row.count : 0));
  }
  return [...totals.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, Math.max(0, limit));
}
