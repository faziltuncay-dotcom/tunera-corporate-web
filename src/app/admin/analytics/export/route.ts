import { NextResponse } from "next/server";
import {
  DEFAULT_RANGE_DAYS,
  getBrandFunnel,
  getBrandRedirectBreakdown,
  getContactCtaBreakdown,
  getContactIntentBySource,
  getDailyTimeSeries,
  getDateRangeFromSearchParam,
  getDeviceDistribution,
  getSalesSignals,
  getScrollDepthDistribution,
  getSectionViews,
  getSummaryMetrics,
  getTopCountries,
  getTopJourneys,
  getTopPages,
  getTopReferrers,
  type RangeDays,
} from "@/lib/analytics/aggregate";
import { eventLabel, pathLabel, scrollDepthLabel, sectionLabel } from "@/lib/analytics/labels";
import { isAnalyticsConfigured } from "@/lib/analytics/server";

/**
 * Admin-only CSV export of the dashboard's aggregate read-outs.
 *
 *   GET /admin/analytics/export?range=7d|30d|90d
 *
 * Sits behind the same HTTP Basic gate as the rest of `/admin/*`
 * (see `src/middleware.ts`) — the matcher already covers this
 * path, so no extra auth code is needed and the export cannot be
 * fetched anonymously. The route is `force-dynamic` and runs on
 * the Node runtime so it can use the same `postgres` driver as the
 * dashboard.
 *
 * What's exported:
 *   - the same six aggregate read-outs the dashboard renders
 *     (overview, daily series, top pages / referrers / devices /
 *     countries, brand redirects, contact CTAs, section views,
 *     scroll depth, brand funnel, contact intent by source, top
 *     consented journeys, sales signals)
 *   - all are already passed through `publicPathFilter` and the
 *     internal-route exclusion at the aggregate layer.
 *
 * What is **not** exported, ever:
 *   - raw `visitor_id_hash` or `session_id_hash`
 *   - raw IP, geo coordinates, or any PII
 *   - per-event metadata blobs
 *   - rows from `/admin`, `/api`, `/_next`, `/favicon.ico`,
 *     `/robots.txt`, `/sitemap.xml`
 *
 * The output is a single multi-section CSV. Each section is
 * introduced by a `# section: <name>` comment line and a header
 * row. Excel / Google Sheets imports handle the comments as
 * first-column literal text; the operator can split the file by
 * section as needed.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const csvEscape = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) return `"${str.replace(/"/g, '""')}"`;
  return str;
};

const csvRow = (cells: ReadonlyArray<unknown>): string => cells.map(csvEscape).join(",");

const formatRange = (days: RangeDays): string => (days === 7 ? "7d" : days === 30 ? "30d" : "90d");

export async function GET(req: Request): Promise<NextResponse> {
  const url = new URL(req.url);
  const rangeDays = getDateRangeFromSearchParam(url.searchParams.get("range"));
  const rangeToken = formatRange(rangeDays);

  if (!isAnalyticsConfigured()) {
    return new NextResponse("# analytics storage not configured\n", {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="tunera-analytics-${rangeToken}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const [
    summary,
    series,
    topPages,
    topReferrers,
    devices,
    countries,
    brandRedirects,
    contactCta,
    sectionViews,
    scrollDepth,
    brandFunnel,
    contactIntent,
    journeys,
    signals,
  ] = await Promise.all([
    getSummaryMetrics(rangeDays),
    getDailyTimeSeries(rangeDays),
    getTopPages(rangeDays, 50),
    getTopReferrers(rangeDays, 50),
    getDeviceDistribution(rangeDays),
    getTopCountries(rangeDays, 50),
    getBrandRedirectBreakdown(rangeDays),
    getContactCtaBreakdown(rangeDays),
    getSectionViews(rangeDays, 50),
    getScrollDepthDistribution(rangeDays),
    getBrandFunnel(rangeDays),
    getContactIntentBySource(rangeDays, 50),
    getTopJourneys(rangeDays, 2, 50),
    getSalesSignals(rangeDays),
  ]);

  const lines: string[] = [];
  const generatedAt = new Date().toISOString();
  lines.push(`# tunera analytics export`);
  lines.push(
    `# range: last ${rangeDays === DEFAULT_RANGE_DAYS ? rangeDays + " days (default)" : rangeDays + " days"}`,
  );
  lines.push(`# generated_at_utc: ${generatedAt}`);
  lines.push("");

  // Overview
  lines.push("# section: overview");
  lines.push(csvRow(["metric", "value"]));
  lines.push(csvRow(["page_views_today", summary.pageViewsToday]));
  lines.push(csvRow(["visitors_today_consented", summary.visitorsToday]));
  lines.push(csvRow(["page_views_in_range", summary.pageViewsInRange]));
  lines.push(csvRow(["visitors_in_range_consented", summary.visitorsInRange]));
  lines.push(csvRow(["brand_redirects_in_range", summary.brandRedirectsInRange]));
  lines.push(csvRow(["contact_cta_in_range", summary.contactCtaInRange]));
  lines.push("");

  // Daily series
  lines.push("# section: daily_series");
  lines.push(csvRow(["day", "page_views", "visitors_consented"]));
  series.forEach((s) => lines.push(csvRow([s.day, s.pageViews, s.visitors])));
  lines.push("");

  // Generic ranking sections
  const ranked = (
    name: string,
    headers: ReadonlyArray<string>,
    rows: ReadonlyArray<{ label: string; count: number }>,
  ) => {
    lines.push(`# section: ${name}`);
    lines.push(csvRow(headers));
    rows.forEach((r) => lines.push(csvRow([r.label, r.count])));
    lines.push("");
  };

  ranked(
    "top_pages",
    ["path", "page_views"],
    topPages.map((r) => ({ label: r.label, count: r.count })),
  );
  ranked(
    "top_referrers",
    ["referrer", "events"],
    topReferrers.map((r) => ({ label: r.label, count: r.count })),
  );
  ranked(
    "devices",
    ["device_type", "events"],
    devices.map((r) => ({ label: r.label, count: r.count })),
  );
  ranked(
    "countries",
    ["country", "events"],
    countries.map((r) => ({ label: r.label, count: r.count })),
  );
  ranked(
    "brand_redirects",
    ["brand", "events"],
    brandRedirects.map((r) => ({ label: r.label, count: r.count })),
  );

  // Contact CTAs (with humanised event label)
  lines.push("# section: contact_cta");
  lines.push(csvRow(["event_name", "event_label", "events"]));
  contactCta.forEach((r) => lines.push(csvRow([r.label, eventLabel(r.label), r.count])));
  lines.push("");

  // Section views (with humanised section label)
  lines.push("# section: section_views");
  lines.push(csvRow(["section_key", "section_label", "events"]));
  sectionViews.forEach((s) => lines.push(csvRow([s.section, sectionLabel(s.section), s.count])));
  lines.push("");

  // Scroll depth
  lines.push("# section: scroll_depth");
  lines.push(csvRow(["milestone", "label", "events"]));
  scrollDepth.forEach((r) => {
    const raw = r.label.replace(/%$/, "");
    lines.push(csvRow([raw, scrollDepthLabel(raw), r.count]));
  });
  lines.push("");

  // Brand funnel
  lines.push("# section: brand_funnel");
  lines.push(csvRow(["brand", "brand_section_views_shared", "card_clicks", "redirect_clicks"]));
  brandFunnel.forEach((r) =>
    lines.push(csvRow([r.brand, r.cardImpressions, r.cardClicks, r.redirects])),
  );
  lines.push("");

  // Contact intent by source page
  lines.push("# section: contact_intent_by_source_page");
  lines.push(csvRow(["path", "path_label", "events"]));
  contactIntent.forEach((r) => lines.push(csvRow([r.label, pathLabel(r.label), r.count])));
  lines.push("");

  // Top consented journeys
  lines.push("# section: top_consented_journeys");
  lines.push(csvRow(["sequence", "labels", "consented_visitor_count"]));
  journeys.forEach((j) =>
    lines.push(
      csvRow([j.steps.join(" -> "), j.steps.map((s) => pathLabel(s)).join(" -> "), j.count]),
    ),
  );
  lines.push("");

  // Sales signals
  lines.push("# section: sales_signals");
  lines.push(csvRow(["signal", "value", "count"]));
  lines.push(
    csvRow([
      "strongest_contact_intent_page",
      signals.topContactPage?.label ?? "",
      signals.topContactPage?.count ?? "",
    ]),
  );
  lines.push(
    csvRow([
      "strongest_brand_interest_page",
      signals.topBrandPage?.label ?? "",
      signals.topBrandPage?.count ?? "",
    ]),
  );
  lines.push(
    csvRow([
      "cta_source_with_most_activity",
      signals.topCtaReferrer?.label ?? "",
      signals.topCtaReferrer?.count ?? "",
    ]),
  );
  lines.push(
    csvRow([
      "country_with_most_contact_intent",
      signals.topCtaCountry?.label ?? "",
      signals.topCtaCountry?.count ?? "",
    ]),
  );
  lines.push(csvRow(["mobile_cta_count", "", signals.mobileCtaCount]));
  lines.push(csvRow(["desktop_cta_count", "", signals.desktopCtaCount]));
  lines.push("");

  // Privacy footer (kept inside the file so it travels with any copy)
  lines.push("# privacy: no raw IP, no visitor or session id, no PII included.");
  lines.push(
    "# privacy: internal admin / api / framework rows are excluded at the aggregate layer.",
  );

  const body = lines.join("\n") + "\n";
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="tunera-analytics-${rangeToken}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
