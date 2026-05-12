"use client";

import { ALLOWED_EVENT_SET, type AnalyticsEventName } from "./types";

/**
 * Browser-side analytics helper used by both the page-view auto
 * tracker and CTA click handlers.
 *
 * Properties of every public function in this file:
 *
 *   - **fail silently on the visitor** — a network error, a 4xx /
 *     5xx response, or a Content-Security-Policy block must never
 *     break navigation or render an error in the UI.
 *   - **never carry personal data** — form *contents* are not
 *     forwarded. The CTA helpers only emit a coarse event name and
 *     small metadata (e.g. `{ brand: "granfort" }`).
 *   - **honour consent** — when consent is denied or unset, the
 *     tracker still records *anonymous* page / event counts but
 *     omits the visitor / session ids. When consent is explicitly
 *     granted, ids are attached so the dashboard can compute unique
 *     visitor counts.
 *   - **SSR safe** — every helper short-circuits when `window` is
 *     undefined, so importing them from a Server Component is fine.
 *
 * Consent + visitor / session ids live in `localStorage` /
 * `sessionStorage` under the `tunera-analytics-*` namespace so a
 * Tunera tracker never collides with any third-party analytics that
 * gets bolted on later.
 */

const CONSENT_KEY = "tunera-analytics-consent";
const VISITOR_KEY = "tunera-analytics-visitor";
const SESSION_KEY = "tunera-analytics-session";
const API_PATH = "/api/analytics/event";

export type ConsentState = "granted" | "denied" | "unset";

const isBrowser = (): boolean => typeof window !== "undefined";

const safeLocalStorageGet = (key: string): string | null => {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeLocalStorageSet = (key: string, value: string): void => {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* swallow — private mode, storage full, etc. */
  }
};

const safeSessionStorageGet = (key: string): string | null => {
  if (!isBrowser()) return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSessionStorageSet = (key: string, value: string): void => {
  if (!isBrowser()) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* swallow */
  }
};

const newOpaqueId = (): string => {
  if (isBrowser() && typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  // Fallback: 16 random bytes hex — only hit on very old browsers.
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 256)
      .toString(16)
      .padStart(2, "0"),
  ).join("");
};

export function getConsentState(): ConsentState {
  const raw = safeLocalStorageGet(CONSENT_KEY);
  if (raw === "granted" || raw === "denied") return raw;
  return "unset";
}

export function setConsentState(next: Exclude<ConsentState, "unset">): void {
  safeLocalStorageSet(CONSENT_KEY, next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("tunera-analytics-consent-change", { detail: next }));
  }
}

export function getVisitorId(): string | null {
  if (getConsentState() !== "granted") return null;
  let id = safeLocalStorageGet(VISITOR_KEY);
  if (!id) {
    id = newOpaqueId();
    safeLocalStorageSet(VISITOR_KEY, id);
  }
  return id;
}

export function getSessionId(): string | null {
  if (getConsentState() !== "granted") return null;
  let id = safeSessionStorageGet(SESSION_KEY);
  if (!id) {
    id = newOpaqueId();
    safeSessionStorageSet(SESSION_KEY, id);
  }
  return id;
}

const detectLocaleFromPath = (path: string): "tr" | "en" | null => {
  if (path === "/" || path.startsWith("/tr")) return "tr";
  if (path.startsWith("/en")) return "en";
  return null;
};

const parseUtm = (): {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
} => {
  if (!isBrowser()) return { utmSource: null, utmMedium: null, utmCampaign: null };
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
    };
  } catch {
    return { utmSource: null, utmMedium: null, utmCampaign: null };
  }
};

export type TrackOptions = {
  path?: string;
  locale?: "tr" | "en" | null;
  metadata?: Record<string, string | number | boolean>;
};

/**
 * Fire an analytics event. Returns a promise that always resolves
 * (never rejects) so callers can safely `void trackTuneraEvent(...)`
 * inline from click handlers without `try/catch`.
 */
export async function trackTuneraEvent(
  eventName: AnalyticsEventName | string,
  options: TrackOptions = {},
): Promise<void> {
  if (!isBrowser()) return;
  if (!ALLOWED_EVENT_SET.has(eventName)) return;

  const path = options.path ?? window.location.pathname;
  const locale = options.locale ?? detectLocaleFromPath(path);
  const consent = getConsentState();
  const consentGranted = consent === "granted";
  const utm = parseUtm();

  const payload = {
    event: eventName,
    path,
    locale,
    referrer: document.referrer || null,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
    visitorId: consentGranted ? getVisitorId() : null,
    sessionId: consentGranted ? getSessionId() : null,
    consentAnalytics: consentGranted,
    metadata: options.metadata ?? {},
  };

  try {
    const body = JSON.stringify(payload);
    // `keepalive` lets the request complete after a navigation, which
    // is important for outbound brand_redirect_click clicks where the
    // user is leaving the page.
    await fetch(API_PATH, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
      credentials: "omit",
      cache: "no-store",
    });
  } catch {
    /* swallow — analytics must never break the page */
  }
}
