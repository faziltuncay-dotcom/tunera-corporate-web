import type { AnalyticsDeviceType } from "./types";

/**
 * Request-context derivation helpers.
 *
 * The route handler never reads — and never stores — the raw client
 * IP. Instead we read whatever the edge / CDN forwards in well-known
 * geo headers (Vercel, Cloudflare, Netlify all use the same `x-*`
 * conventions for country / region / city). On a self-hosted node
 * stack with no edge geo lookup the helpers return `null` for every
 * field, which is fine — the dashboard will just show "unknown" for
 * that share of traffic instead of inventing a country.
 */

const COUNTRY_HEADERS = ["x-vercel-ip-country", "cf-ipcountry", "x-country"] as const;
const REGION_HEADERS = ["x-vercel-ip-country-region", "x-region"] as const;
const CITY_HEADERS = ["x-vercel-ip-city", "x-city"] as const;

const truncate = (input: string | null | undefined, max: number): string | null => {
  if (!input) return null;
  const trimmed = input.trim();
  if (trimmed.length === 0) return null;
  return trimmed.slice(0, max);
};

const readFirstHeader = (
  headers: Headers,
  names: ReadonlyArray<string>,
  max: number,
): string | null => {
  for (const name of names) {
    const raw = headers.get(name);
    const value = truncate(raw, max);
    if (value) return value;
  }
  return null;
};

export type GeoFields = {
  country: string | null;
  region: string | null;
  city: string | null;
};

export function deriveGeoFromHeaders(headers: Headers): GeoFields {
  return {
    country: readFirstHeader(headers, COUNTRY_HEADERS, 8),
    region: readFirstHeader(headers, REGION_HEADERS, 64),
    city: readFirstHeader(headers, CITY_HEADERS, 64),
  };
}

export type UserAgentFields = {
  deviceType: AnalyticsDeviceType;
  browser: string | null;
  os: string | null;
};

/**
 * Tiny user-agent parser. The point isn't comprehensive accuracy — we
 * only need the rough buckets the dashboard groups by — so we keep the
 * heuristics linear and avoid pulling in a UA-parser library.
 */
export function parseUserAgent(uaHeader: string | null): UserAgentFields {
  if (!uaHeader) return { deviceType: "unknown", browser: null, os: null };
  const ua = uaHeader.toLowerCase();

  let deviceType: AnalyticsDeviceType = "desktop";
  if (/(ipad|tablet|kindle|playbook|silk)/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua))) {
    deviceType = "tablet";
  } else if (/(iphone|ipod|android.*mobile|windows phone|blackberry|opera mini|mobile)/.test(ua)) {
    deviceType = "mobile";
  }

  let browser: string | null = null;
  if (/edg\//.test(ua)) browser = "Edge";
  else if (/opr\/|opera/.test(ua)) browser = "Opera";
  else if (/firefox\//.test(ua)) browser = "Firefox";
  else if (/chrome\/|crios\//.test(ua)) browser = "Chrome";
  else if (/safari\//.test(ua)) browser = "Safari";

  let os: string | null = null;
  if (/windows nt/.test(ua)) os = "Windows";
  else if (/iphone|ipad|ipod/.test(ua)) os = "iOS";
  else if (/mac os x/.test(ua)) os = "macOS";
  else if (/android/.test(ua)) os = "Android";
  else if (/linux/.test(ua)) os = "Linux";

  return { deviceType, browser, os };
}
