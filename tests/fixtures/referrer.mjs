// Pure-JS mirror of `src/lib/analytics/referrer.ts`. Mirrors are kept
// in sync by hand because Node's built-in `node --test` cannot load
// `.ts` files directly. Update both when the production map moves.

const SOCIAL_LABEL_BY_HOST = {
  "instagram.com": "Instagram",
  "www.instagram.com": "Instagram",
  "l.instagram.com": "Instagram",
  "facebook.com": "Facebook",
  "www.facebook.com": "Facebook",
  "l.facebook.com": "Facebook",
  "m.facebook.com": "Facebook",
  "lm.facebook.com": "Facebook",
  "google.com": "Google",
  "www.google.com": "Google",
  "google.com.tr": "Google",
  "www.google.com.tr": "Google",
  "linkedin.com": "LinkedIn",
  "www.linkedin.com": "LinkedIn",
  "t.co": "X / Twitter",
  "x.com": "X / Twitter",
  "www.x.com": "X / Twitter",
  "twitter.com": "X / Twitter",
  "www.twitter.com": "X / Twitter",
  "whatsapp.com": "WhatsApp",
  "www.whatsapp.com": "WhatsApp",
  "web.whatsapp.com": "WhatsApp",
  "api.whatsapp.com": "WhatsApp",
};

export const SELF_REFERRER_HOSTS = ["tunera.com.tr", "www.tunera.com.tr"];

const stripWww = (host) => (host.startsWith("www.") ? host.slice(4) : host);

export function isSelfReferrerHost(host) {
  if (typeof host !== "string" || host.length === 0) return false;
  const lower = host.trim().toLowerCase();
  if (lower.length === 0) return false;
  return SELF_REFERRER_HOSTS.includes(lower) || SELF_REFERRER_HOSTS.includes(stripWww(lower));
}

export function normalizeReferrer(raw) {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { host: null, label: "Direct", isSelf: false };
  }
  let url;
  try {
    url = new URL(raw);
  } catch {
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

export function aggregateReferrers(rows, limit) {
  const totals = new Map();
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
