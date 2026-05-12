import { getAnalyticsDb } from "./server";
import type { CountRow, DailySeriesPoint, RecentEventRow, SummaryMetrics } from "./types";

/**
 * Aggregation helpers consumed by the admin analytics page.
 *
 * Every function gracefully degrades to a zero / empty value when the
 * database is not configured so the dashboard can still render — it
 * just shows truthful empty state instead of inventing numbers.
 *
 * Queries deliberately keep the surface area small: we only run a
 * handful of well-indexed COUNT / GROUP BY against
 * `analytics_events`. That's enough for early-phase volumes; once
 * traffic grows we can swap individual helpers for materialised
 * `analytics_daily_rollups` reads without changing the dashboard.
 */

const EMPTY_SUMMARY: SummaryMetrics = {
  pageViewsToday: 0,
  visitorsToday: 0,
  pageViewsLast7d: 0,
  visitorsLast7d: 0,
  brandRedirectsLast7d: 0,
  contactCtaLast7d: 0,
};

const CONTACT_CTA_EVENTS = [
  "contact_whatsapp_click",
  "contact_phone_click",
  "contact_email_click",
  "contact_map_click",
];

export async function getSummaryMetrics(): Promise<SummaryMetrics> {
  const sql = await getAnalyticsDb();
  if (!sql) return EMPTY_SUMMARY;
  try {
    const [row] = await sql<
      {
        page_views_today: number;
        visitors_today: number;
        page_views_7d: number;
        visitors_7d: number;
        brand_redirects_7d: number;
        contact_cta_7d: number;
      }[]
    >`
      SELECT
        COUNT(*) FILTER (
          WHERE event_name = 'page_view'
            AND created_at >= date_trunc('day', NOW())
        )::int AS page_views_today,
        COUNT(DISTINCT visitor_id_hash) FILTER (
          WHERE event_name = 'page_view'
            AND visitor_id_hash IS NOT NULL
            AND created_at >= date_trunc('day', NOW())
        )::int AS visitors_today,
        COUNT(*) FILTER (
          WHERE event_name = 'page_view'
            AND created_at >= NOW() - INTERVAL '7 days'
        )::int AS page_views_7d,
        COUNT(DISTINCT visitor_id_hash) FILTER (
          WHERE event_name = 'page_view'
            AND visitor_id_hash IS NOT NULL
            AND created_at >= NOW() - INTERVAL '7 days'
        )::int AS visitors_7d,
        COUNT(*) FILTER (
          WHERE event_name IN ('brand_redirect_click','brand_card_click')
            AND created_at >= NOW() - INTERVAL '7 days'
        )::int AS brand_redirects_7d,
        COUNT(*) FILTER (
          WHERE event_name = ANY(${CONTACT_CTA_EVENTS})
            AND created_at >= NOW() - INTERVAL '7 days'
        )::int AS contact_cta_7d
      FROM analytics_events
    `;
    if (!row) return EMPTY_SUMMARY;
    return {
      pageViewsToday: row.page_views_today ?? 0,
      visitorsToday: row.visitors_today ?? 0,
      pageViewsLast7d: row.page_views_7d ?? 0,
      visitorsLast7d: row.visitors_7d ?? 0,
      brandRedirectsLast7d: row.brand_redirects_7d ?? 0,
      contactCtaLast7d: row.contact_cta_7d ?? 0,
    };
  } catch (err) {
    console.error("[analytics] getSummaryMetrics failed", err);
    return EMPTY_SUMMARY;
  }
}

export async function getDailyTimeSeries(days = 14): Promise<DailySeriesPoint[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const clampedDays = Math.max(1, Math.min(60, Math.trunc(days)));
  try {
    const rows = await sql<{ day: string; page_views: number; visitors: number }[]>`
      WITH days AS (
        SELECT generate_series(
          (CURRENT_DATE - (${clampedDays - 1}::int)),
          CURRENT_DATE,
          INTERVAL '1 day'
        )::date AS day
      )
      SELECT
        to_char(days.day, 'YYYY-MM-DD') AS day,
        COALESCE(SUM(CASE WHEN e.event_name = 'page_view' THEN 1 ELSE 0 END), 0)::int AS page_views,
        COUNT(DISTINCT CASE WHEN e.event_name = 'page_view' THEN e.visitor_id_hash END)::int AS visitors
      FROM days
      LEFT JOIN analytics_events e
        ON DATE(e.created_at) = days.day
      GROUP BY days.day
      ORDER BY days.day ASC
    `;
    return rows.map((r) => ({ day: r.day, pageViews: r.page_views, visitors: r.visitors }));
  } catch (err) {
    console.error("[analytics] getDailyTimeSeries failed", err);
    return [];
  }
}

async function topByColumn(
  column: "path" | "referrer" | "country" | "device_type" | "browser" | "os",
  filterEventName: string | null,
  limit = 10,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  try {
    const safeColumn = column;
    const filter = filterEventName ?? null;
    const rows = await sql<{ label: string | null; count: number }[]>`
      SELECT ${sql(safeColumn)} AS label, COUNT(*)::int AS count
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '7 days'
        AND (${filter}::text IS NULL OR event_name = ${filter})
        AND ${sql(safeColumn)} IS NOT NULL
        AND ${sql(safeColumn)} <> ''
      GROUP BY ${sql(safeColumn)}
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return rows
      .filter((r) => r.label !== null && r.label.length > 0)
      .map((r) => ({ label: r.label as string, count: r.count }));
  } catch (err) {
    console.error("[analytics] topByColumn failed", { column, err });
    return [];
  }
}

export const getTopPages = (limit = 10) => topByColumn("path", "page_view", limit);
export const getTopReferrers = (limit = 10) => topByColumn("referrer", null, limit);
export const getDeviceDistribution = () => topByColumn("device_type", null, 10);
export const getTopCountries = (limit = 10) => topByColumn("country", null, limit);

export async function getBrandRedirectBreakdown(): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  try {
    const rows = await sql<{ brand: string | null; count: number }[]>`
      SELECT COALESCE(metadata->>'brand', 'unspecified') AS brand, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name IN ('brand_redirect_click','brand_card_click')
        AND created_at >= NOW() - INTERVAL '30 days'
      GROUP BY brand
      ORDER BY count DESC
      LIMIT 10
    `;
    return rows.map((r) => ({ label: r.brand ?? "unspecified", count: r.count }));
  } catch (err) {
    console.error("[analytics] getBrandRedirectBreakdown failed", err);
    return [];
  }
}

export async function getContactCtaBreakdown(): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  try {
    const rows = await sql<{ event_name: string; count: number }[]>`
      SELECT event_name, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS})
        AND created_at >= NOW() - INTERVAL '30 days'
      GROUP BY event_name
      ORDER BY count DESC
    `;
    return rows.map((r) => ({ label: r.event_name, count: r.count }));
  } catch (err) {
    console.error("[analytics] getContactCtaBreakdown failed", err);
    return [];
  }
}

/**
 * Returns the wall-clock timestamp of the most recent event in
 * `analytics_events`, or `null` if the database is unconfigured /
 * empty. Used by the admin diagnostics block to surface "events are
 * actually arriving" without dumping any per-event detail.
 */
export async function getLastEventAt(): Promise<string | null> {
  const sql = await getAnalyticsDb();
  if (!sql) return null;
  try {
    const [row] = await sql<{ created_at: Date | null }[]>`
      SELECT MAX(created_at) AS created_at FROM analytics_events
    `;
    if (!row || !row.created_at) return null;
    return row.created_at.toISOString();
  } catch (err) {
    console.error("[analytics] getLastEventAt failed", err);
    return null;
  }
}

export async function getRecentEvents(limit = 50): Promise<RecentEventRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const clamped = Math.max(1, Math.min(200, Math.trunc(limit)));
  try {
    const rows = await sql<
      {
        created_at: Date;
        event_name: string;
        path: string;
        locale: string | null;
        country: string | null;
        device_type: string | null;
        consent_analytics: boolean;
      }[]
    >`
      SELECT created_at, event_name, path, locale, country, device_type, consent_analytics
      FROM analytics_events
      ORDER BY created_at DESC
      LIMIT ${clamped}
    `;
    return rows.map((r) => ({
      createdAt: r.created_at.toISOString(),
      eventName: r.event_name as RecentEventRow["eventName"],
      path: r.path,
      locale: (r.locale === "tr" || r.locale === "en"
        ? r.locale
        : null) as RecentEventRow["locale"],
      country: r.country,
      deviceType: (r.device_type ?? "unknown") as RecentEventRow["deviceType"],
      consentAnalytics: r.consent_analytics,
    }));
  } catch (err) {
    console.error("[analytics] getRecentEvents failed", err);
    return [];
  }
}
