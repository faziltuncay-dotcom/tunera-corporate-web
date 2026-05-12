import type { Sql } from "postgres";
import { getAnalyticsDb } from "./server";
import type { CountRow, DailySeriesPoint, RecentEventRow, SummaryMetrics } from "./types";

/**
 * Aggregation helpers consumed by the admin analytics page.
 *
 * Every function gracefully degrades to a zero / empty value when the
 * database is not configured so the dashboard can still render — it
 * just shows truthful empty state instead of inventing numbers.
 *
 * Phase 2 made every helper range-aware via `getDateRangeFromSearchParam`
 * so the same dashboard URL controls the window across cards and
 * charts (`?range=7d|30d|90d`, default 30d). The window is bounded
 * server-side so an arbitrary `?range=99999d` cannot trigger a
 * full-table scan.
 *
 * The internal-route filter (`publicPathFilter`) is still applied to
 * every read, so historical /admin / /api / /_next rows that landed
 * before Analytics 1.2 stay invisible without anyone having to mutate
 * production data.
 */

const CONTACT_CTA_EVENTS = [
  "contact_whatsapp_click",
  "contact_phone_click",
  "contact_email_click",
  "contact_map_click",
] as const;

const BRAND_EVENTS = ["brand_card_click", "brand_redirect_click"] as const;

/**
 * SQL fragment that limits every aggregate query to public traffic.
 * Mirrors `isInternalPath()` in `sanitize.ts`. Keep the two in sync
 * — change the JS predicate and the SQL filter together.
 */
const publicPathFilter = (sql: Sql) => sql`(
  path NOT IN ('/admin', '/api', '/favicon.ico', '/robots.txt', '/sitemap.xml')
  AND path NOT LIKE '/admin/%'
  AND path NOT LIKE '/api/%'
  AND path NOT LIKE '/_next/%'
)`;

// ─── range helpers ────────────────────────────────────────────────

export const VALID_RANGE_DAYS = [7, 30, 90] as const;
export type RangeDays = (typeof VALID_RANGE_DAYS)[number];
export const DEFAULT_RANGE_DAYS: RangeDays = 30;

const RANGE_BY_TOKEN: Record<string, RangeDays> = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

/**
 * Resolve a `?range=` URL search-param value to a whitelisted number
 * of days. Anything outside the documented set falls back to the
 * default so the dashboard never runs an unbounded scan in response
 * to a malformed URL.
 */
export function getDateRangeFromSearchParam(value: unknown): RangeDays {
  if (typeof value !== "string") return DEFAULT_RANGE_DAYS;
  const normalized = value.trim().toLowerCase();
  return RANGE_BY_TOKEN[normalized] ?? DEFAULT_RANGE_DAYS;
}

const clampDays = (value: number): RangeDays => {
  if (!Number.isFinite(value)) return DEFAULT_RANGE_DAYS;
  const truncated = Math.trunc(value);
  if (truncated <= 7) return 7;
  if (truncated <= 30) return 30;
  return 90;
};

// ─── overview ─────────────────────────────────────────────────────

const EMPTY_SUMMARY: SummaryMetrics = {
  pageViewsToday: 0,
  visitorsToday: 0,
  pageViewsInRange: 0,
  visitorsInRange: 0,
  brandRedirectsInRange: 0,
  contactCtaInRange: 0,
};

export async function getSummaryMetrics(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<SummaryMetrics> {
  const sql = await getAnalyticsDb();
  if (!sql) return EMPTY_SUMMARY;
  const days = clampDays(rangeDays);
  try {
    const [row] = await sql<
      {
        page_views_today: number;
        visitors_today: number;
        page_views_range: number;
        visitors_range: number;
        brand_redirects_range: number;
        contact_cta_range: number;
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
            AND created_at >= NOW() - make_interval(days => ${days})
        )::int AS page_views_range,
        COUNT(DISTINCT visitor_id_hash) FILTER (
          WHERE event_name = 'page_view'
            AND visitor_id_hash IS NOT NULL
            AND created_at >= NOW() - make_interval(days => ${days})
        )::int AS visitors_range,
        COUNT(*) FILTER (
          WHERE event_name = ANY(${BRAND_EVENTS as unknown as string[]})
            AND created_at >= NOW() - make_interval(days => ${days})
        )::int AS brand_redirects_range,
        COUNT(*) FILTER (
          WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
            AND created_at >= NOW() - make_interval(days => ${days})
        )::int AS contact_cta_range
      FROM analytics_events
      WHERE ${publicPathFilter(sql)}
    `;
    if (!row) return EMPTY_SUMMARY;
    return {
      pageViewsToday: row.page_views_today ?? 0,
      visitorsToday: row.visitors_today ?? 0,
      pageViewsInRange: row.page_views_range ?? 0,
      visitorsInRange: row.visitors_range ?? 0,
      brandRedirectsInRange: row.brand_redirects_range ?? 0,
      contactCtaInRange: row.contact_cta_range ?? 0,
    };
  } catch (err) {
    console.error("[analytics] getSummaryMetrics failed", err);
    return EMPTY_SUMMARY;
  }
}

export async function getDailyTimeSeries(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<DailySeriesPoint[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ day: string; page_views: number; visitors: number }[]>`
      WITH days AS (
        SELECT generate_series(
          (CURRENT_DATE - (${days - 1}::int)),
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
        AND ${publicPathFilter(sql)}
      GROUP BY days.day
      ORDER BY days.day ASC
    `;
    return rows.map((r) => ({ day: r.day, pageViews: r.page_views, visitors: r.visitors }));
  } catch (err) {
    console.error("[analytics] getDailyTimeSeries failed", err);
    return [];
  }
}

// ─── ranking helpers ─────────────────────────────────────────────

async function topByColumn(
  column: "path" | "referrer" | "country" | "device_type" | "browser" | "os",
  filterEventName: string | null,
  rangeDays: RangeDays,
  limit: number,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const filter = filterEventName ?? null;
    const rows = await sql<{ label: string | null; count: number }[]>`
      SELECT ${sql(column)} AS label, COUNT(*)::int AS count
      FROM analytics_events
      WHERE created_at >= NOW() - make_interval(days => ${days})
        AND (${filter}::text IS NULL OR event_name = ${filter})
        AND ${sql(column)} IS NOT NULL
        AND ${sql(column)} <> ''
        AND ${publicPathFilter(sql)}
      GROUP BY ${sql(column)}
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

export const getTopPages = (rangeDays: RangeDays = DEFAULT_RANGE_DAYS, limit = 10) =>
  topByColumn("path", "page_view", rangeDays, limit);
export const getTopReferrers = (rangeDays: RangeDays = DEFAULT_RANGE_DAYS, limit = 10) =>
  topByColumn("referrer", null, rangeDays, limit);
export const getDeviceDistribution = (rangeDays: RangeDays = DEFAULT_RANGE_DAYS) =>
  topByColumn("device_type", null, rangeDays, 10);
export const getTopCountries = (rangeDays: RangeDays = DEFAULT_RANGE_DAYS, limit = 10) =>
  topByColumn("country", null, rangeDays, limit);

export async function getBrandRedirectBreakdown(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ brand: string | null; count: number }[]>`
      SELECT COALESCE(metadata->>'brand', 'unspecified') AS brand, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${BRAND_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
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

export async function getContactCtaBreakdown(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ event_name: string; count: number }[]>`
      SELECT event_name, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY event_name
      ORDER BY count DESC
    `;
    return rows.map((r) => ({ label: r.event_name, count: r.count }));
  } catch (err) {
    console.error("[analytics] getContactCtaBreakdown failed", err);
    return [];
  }
}

export async function getLastEventAt(): Promise<string | null> {
  const sql = await getAnalyticsDb();
  if (!sql) return null;
  try {
    const [row] = await sql<{ created_at: Date | null }[]>`
      SELECT MAX(created_at) AS created_at FROM analytics_events
      WHERE ${publicPathFilter(sql)}
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
      WHERE ${publicPathFilter(sql)}
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

// ─── Phase 2 helpers ─────────────────────────────────────────────

/**
 * Section view counts grouped by stable section key. Each row also
 * carries the readable label captured at fire time so the dashboard
 * can show "Home Hero" rather than "home_hero".
 */
export type SectionViewRow = { section: string; label: string; count: number };

export async function getSectionViews(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
  limit = 12,
): Promise<SectionViewRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ section: string; label: string | null; count: number }[]>`
      SELECT
        metadata->>'section' AS section,
        MAX(metadata->>'label') AS label,
        COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = 'section_view'
        AND metadata ? 'section'
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY section
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return rows
      .filter((r) => typeof r.section === "string" && r.section.length > 0)
      .map((r) => ({ section: r.section, label: r.label ?? r.section, count: r.count }));
  } catch (err) {
    console.error("[analytics] getSectionViews failed", err);
    return [];
  }
}

/**
 * Scroll-depth distribution: how many fires landed at each milestone
 * (25 / 50 / 75 / 100). Pages where the visitor never crosses a
 * milestone do not contribute. Useful as a "how deep do people read?"
 * read.
 */
export async function getScrollDepthDistribution(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ depth: string; count: number }[]>`
      SELECT
        COALESCE(metadata->>'depth', 'unknown') AS depth,
        COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = 'scroll_depth'
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY depth
      ORDER BY
        CASE COALESCE(metadata->>'depth', 'unknown')
          WHEN '25' THEN 1
          WHEN '50' THEN 2
          WHEN '75' THEN 3
          WHEN '100' THEN 4
          ELSE 5
        END
    `;
    return rows.map((r) => ({ label: `${r.depth}%`, count: r.count }));
  } catch (err) {
    console.error("[analytics] getScrollDepthDistribution failed", err);
    return [];
  }
}

/**
 * Brand-funnel rollup. For each represented brand we report the
 * three contiguous engagement steps:
 *
 *   1. brand-card section impressions (`section_view` of
 *      `brands_cards`)
 *   2. brand card clicks (`brand_card_click` with
 *      `metadata.brand`)
 *   3. brand redirect clicks (`brand_redirect_click` with
 *      `metadata.brand`)
 *
 * The numbers are not "conversion %" — sparse data and Phase 2's
 * recent rollout would make any percentage misleading. The
 * dashboard renders the three integers side by side and the
 * operator reads the funnel themselves.
 */
export type BrandFunnelRow = {
  brand: string;
  cardImpressions: number;
  cardClicks: number;
  redirects: number;
};

export async function getBrandFunnel(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<BrandFunnelRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    // Section impressions are not brand-specific (the `brands_cards`
    // section contains both cards) — we surface a single shared
    // impressions number per row so the operator can see how many
    // visitors saw the cards at all.
    const [impressionsRow] = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = 'section_view'
        AND metadata->>'section' = 'brands_cards'
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
    `;
    const impressions = impressionsRow?.count ?? 0;

    const clickRows = await sql<{ brand: string; clicks: number; redirects: number }[]>`
      SELECT
        COALESCE(metadata->>'brand', 'unspecified') AS brand,
        COUNT(*) FILTER (WHERE event_name = 'brand_card_click')::int AS clicks,
        COUNT(*) FILTER (WHERE event_name = 'brand_redirect_click')::int AS redirects
      FROM analytics_events
      WHERE event_name = ANY(${BRAND_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY brand
      ORDER BY (
        COUNT(*) FILTER (WHERE event_name = 'brand_card_click') +
        COUNT(*) FILTER (WHERE event_name = 'brand_redirect_click')
      ) DESC
      LIMIT 10
    `;

    return clickRows.map((r) => ({
      brand: r.brand,
      cardImpressions: impressions,
      cardClicks: r.clicks,
      redirects: r.redirects,
    }));
  } catch (err) {
    console.error("[analytics] getBrandFunnel failed", err);
    return [];
  }
}

/**
 * Which pages do contact CTAs originate from? Helpful for
 * understanding which surface most often nudges visitors toward
 * email / map / phone / WhatsApp.
 */
export async function getContactIntentBySource(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
  limit = 8,
): Promise<CountRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ path: string; count: number }[]>`
      SELECT path, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY path
      ORDER BY count DESC
      LIMIT ${limit}
    `;
    return rows.map((r) => ({ label: r.path, count: r.count }));
  } catch (err) {
    console.error("[analytics] getContactIntentBySource failed", err);
    return [];
  }
}

/**
 * Aggregated visitor journeys.
 *
 *   - Only consented sessions (`visitor_id_hash IS NOT NULL`)
 *     contribute, so every row carries a real stable key.
 *   - Per visitor, paths visited within the range are de-duplicated
 *     (consecutive same-path views collapse) and concatenated in
 *     time order.
 *   - Aggregation requires `count >= minCount` so small samples
 *     don't show up as "real journeys".
 *   - Raw `visitor_id_hash` values never leave Postgres — only the
 *     integer count of how many visitors followed each path
 *     sequence is returned.
 */
export type JourneyRow = { steps: string[]; count: number };

export async function getTopJourneys(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
  minCount = 2,
  limit = 8,
): Promise<JourneyRow[]> {
  const sql = await getAnalyticsDb();
  if (!sql) return [];
  const days = clampDays(rangeDays);
  try {
    const rows = await sql<{ steps: string[]; count: number }[]>`
      WITH visits AS (
        SELECT
          visitor_id_hash,
          path,
          created_at,
          LAG(path) OVER (PARTITION BY visitor_id_hash ORDER BY created_at) AS prev_path
        FROM analytics_events
        WHERE event_name = 'page_view'
          AND visitor_id_hash IS NOT NULL
          AND created_at >= NOW() - make_interval(days => ${days})
          AND ${publicPathFilter(sql)}
      ),
      collapsed AS (
        SELECT visitor_id_hash, path, created_at
        FROM visits
        WHERE prev_path IS DISTINCT FROM path
      ),
      paths AS (
        SELECT visitor_id_hash, ARRAY_AGG(path ORDER BY created_at) AS steps
        FROM collapsed
        GROUP BY visitor_id_hash
        HAVING COUNT(*) >= 2
      )
      SELECT steps, COUNT(*)::int AS count
      FROM paths
      GROUP BY steps
      HAVING COUNT(*) >= ${minCount}
      ORDER BY count DESC, steps ASC
      LIMIT ${limit}
    `;
    return rows.map((r) => ({ steps: r.steps ?? [], count: r.count }));
  } catch (err) {
    console.error("[analytics] getTopJourneys failed", err);
    return [];
  }
}

/**
 * Small bundle of "where is the most signal coming from?" rollups.
 * Each entry is a single readable label + count — the dashboard
 * renders them as a four-row strip. Empty entries (no data) collapse
 * gracefully into "—".
 */
export type SalesSignals = {
  topContactPage: CountRow | null;
  topBrandPage: CountRow | null;
  topCtaReferrer: CountRow | null;
  topCtaCountry: CountRow | null;
  mobileCtaCount: number;
  desktopCtaCount: number;
};

const EMPTY_SIGNALS: SalesSignals = {
  topContactPage: null,
  topBrandPage: null,
  topCtaReferrer: null,
  topCtaCountry: null,
  mobileCtaCount: 0,
  desktopCtaCount: 0,
};

export async function getSalesSignals(
  rangeDays: RangeDays = DEFAULT_RANGE_DAYS,
): Promise<SalesSignals> {
  const sql = await getAnalyticsDb();
  if (!sql) return EMPTY_SIGNALS;
  const days = clampDays(rangeDays);
  try {
    const [topContact] = await sql<{ path: string; count: number }[]>`
      SELECT path, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY path ORDER BY count DESC LIMIT 1
    `;
    const [topBrand] = await sql<{ path: string; count: number }[]>`
      SELECT path, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${BRAND_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
      GROUP BY path ORDER BY count DESC LIMIT 1
    `;
    const [topReferrer] = await sql<{ referrer: string | null; count: number }[]>`
      SELECT referrer, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND referrer IS NOT NULL AND referrer <> ''
        AND ${publicPathFilter(sql)}
      GROUP BY referrer ORDER BY count DESC LIMIT 1
    `;
    const [topCountry] = await sql<{ country: string | null; count: number }[]>`
      SELECT country, COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND created_at >= NOW() - make_interval(days => ${days})
        AND country IS NOT NULL AND country <> ''
        AND ${publicPathFilter(sql)}
      GROUP BY country ORDER BY count DESC LIMIT 1
    `;
    const [mobile] = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND device_type = 'mobile'
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
    `;
    const [desktop] = await sql<{ count: number }[]>`
      SELECT COUNT(*)::int AS count
      FROM analytics_events
      WHERE event_name = ANY(${CONTACT_CTA_EVENTS as unknown as string[]})
        AND device_type = 'desktop'
        AND created_at >= NOW() - make_interval(days => ${days})
        AND ${publicPathFilter(sql)}
    `;
    return {
      topContactPage: topContact ? { label: topContact.path, count: topContact.count } : null,
      topBrandPage: topBrand ? { label: topBrand.path, count: topBrand.count } : null,
      topCtaReferrer:
        topReferrer && topReferrer.referrer
          ? { label: topReferrer.referrer, count: topReferrer.count }
          : null,
      topCtaCountry:
        topCountry && topCountry.country
          ? { label: topCountry.country, count: topCountry.count }
          : null,
      mobileCtaCount: mobile?.count ?? 0,
      desktopCtaCount: desktop?.count ?? 0,
    };
  } catch (err) {
    console.error("[analytics] getSalesSignals failed", err);
    return EMPTY_SIGNALS;
  }
}
