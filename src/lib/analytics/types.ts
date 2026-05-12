/**
 * Public type surface for the Tunera analytics module.
 *
 * The module is intentionally small and self-contained: it never imports
 * from the rest of the site (no auth, no CMS, no third-party SDK). Each
 * accepted event is enumerated in `ALLOWED_EVENT_NAMES`; everything else
 * is rejected at the API boundary, so this list doubles as the schema
 * the dashboard reads from.
 */

export const ALLOWED_EVENT_NAMES = [
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
] as const;

export type AnalyticsEventName = (typeof ALLOWED_EVENT_NAMES)[number];

export const ALLOWED_EVENT_SET: ReadonlySet<string> = new Set(ALLOWED_EVENT_NAMES);

export type AnalyticsLocale = "tr" | "en" | null;

export type AnalyticsDeviceType = "desktop" | "tablet" | "mobile" | "unknown";

/**
 * Payload accepted from the client. `path`, `locale`, `referrer`,
 * `metadata`, and the visitor / session ids are optional — the server
 * fills in what it can from request context and rejects anything that
 * fails validation.
 */
export type AnalyticsClientPayload = {
  event: AnalyticsEventName;
  path?: string;
  locale?: string;
  referrer?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  visitorId?: string | null;
  sessionId?: string | null;
  consentAnalytics?: boolean;
  metadata?: unknown;
};

/**
 * Normalised event ready to persist. The geo / device columns are
 * derived from request headers + user-agent; visitor / session ids are
 * already hashed with the server salt.
 */
export type StoredAnalyticsEvent = {
  eventName: AnalyticsEventName;
  path: string;
  locale: AnalyticsLocale;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  deviceType: AnalyticsDeviceType;
  browser: string | null;
  os: string | null;
  sessionIdHash: string | null;
  visitorIdHash: string | null;
  consentAnalytics: boolean;
  metadata: Record<string, string | number | boolean>;
};

/**
 * Aggregation result shapes consumed by the admin dashboard.
 */
export type SummaryWindow = "today" | "last7d";

export type SummaryMetrics = {
  pageViewsToday: number;
  visitorsToday: number;
  pageViewsLast7d: number;
  visitorsLast7d: number;
  brandRedirectsLast7d: number;
  contactCtaLast7d: number;
};

export type DailySeriesPoint = {
  day: string;
  pageViews: number;
  visitors: number;
};

export type CountRow = {
  label: string;
  count: number;
};

export type RecentEventRow = {
  createdAt: string;
  eventName: AnalyticsEventName;
  path: string;
  locale: AnalyticsLocale;
  country: string | null;
  deviceType: AnalyticsDeviceType;
  consentAnalytics: boolean;
};
