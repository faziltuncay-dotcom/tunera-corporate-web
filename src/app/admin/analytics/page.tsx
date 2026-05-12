import type { Metadata } from "next";
import {
  getBrandRedirectBreakdown,
  getContactCtaBreakdown,
  getDailyTimeSeries,
  getDeviceDistribution,
  getLastEventAt,
  getRecentEvents,
  getSummaryMetrics,
  getTopCountries,
  getTopPages,
  getTopReferrers,
} from "@/lib/analytics/aggregate";
import { isAnalyticsConfigured, isAnalyticsSaltConfigured } from "@/lib/analytics/server";
import { MetricCard } from "./_components/MetricCard";
import { CountList } from "./_components/CountList";
import { TimeSeriesChart } from "./_components/TimeSeriesChart";
import { RecentEventsTable } from "./_components/RecentEventsTable";
import { StatusBlock } from "./_components/StatusBlock";

/**
 * Admin analytics dashboard.
 *
 * Server component, force-dynamic — every render reads live counts
 * from `analytics_events`. The page deliberately stays small and
 * legible:
 *
 *   - Six metric tiles for the overview (today + last 7 days).
 *   - A daily trend chart over 14 days.
 *   - A grid of count-lists for top pages, referrers, devices,
 *     countries, brand redirects and contact CTAs.
 *   - A recent-events table with sanitised columns only.
 *
 * When the database is not configured the page renders the same
 * shell with an honest "analytics storage not configured" banner —
 * no fabricated zeroes, no fake bar charts.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Analytics — Tunera Admin",
  robots: { index: false, follow: false },
};

export default async function AnalyticsAdminPage() {
  const configured = isAnalyticsConfigured();
  const saltConfigured = isAnalyticsSaltConfigured();

  const [
    summary,
    series,
    topPages,
    topReferrers,
    devices,
    countries,
    brandRedirects,
    contactCta,
    recentEvents,
    lastEventAt,
  ] = await Promise.all([
    getSummaryMetrics(),
    getDailyTimeSeries(14),
    getTopPages(10),
    getTopReferrers(10),
    getDeviceDistribution(),
    getTopCountries(10),
    getBrandRedirectBreakdown(),
    getContactCtaBreakdown(),
    getRecentEvents(50),
    getLastEventAt(),
  ]);

  return (
    <main className="min-h-screen bg-tunera-ivory px-4 py-10 text-tunera-ink sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-tunera-orange" />
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              Admin
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tighter2 sm:text-4xl">Analytics</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-tunera-muted-ink sm:text-base">
            Live counts from the Tunera corporate site. Every metric here is derived from the events
            ingested through
            <code className="mx-1 rounded-sm bg-tunera-sand/60 px-1 py-0.5 text-[12px] text-tunera-ink">
              /api/analytics/event
            </code>
            — no third-party SDK and no raw IP storage.
          </p>
          {!configured ? (
            <div className="mt-6 rounded-md border border-tunera-orange/40 bg-tunera-orange/5 px-4 py-3 text-sm text-tunera-ink">
              <strong>Analytics storage is not configured.</strong> Set <code>DATABASE_URL</code>{" "}
              and <code>ANALYTICS_SALT</code> to start persisting events. The site keeps working
              without analytics — only this dashboard shows zeros until storage is wired up.
            </div>
          ) : null}
        </header>

        <section className="mb-6">
          <StatusBlock
            databaseConfigured={configured}
            saltConfigured={saltConfigured}
            lastEventAt={lastEventAt}
          />
        </section>

        <section
          aria-label="Overview metrics"
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6"
        >
          <MetricCard label="Page views today" value={summary.pageViewsToday} />
          <MetricCard label="Visitors today" value={summary.visitorsToday} hint="consented" />
          <MetricCard label="Page views 7d" value={summary.pageViewsLast7d} />
          <MetricCard label="Visitors 7d" value={summary.visitorsLast7d} hint="consented" />
          <MetricCard label="Brand redirects 7d" value={summary.brandRedirectsLast7d} />
          <MetricCard label="Contact CTAs 7d" value={summary.contactCtaLast7d} />
        </section>

        <section className="mt-8">
          <TimeSeriesChart
            data={series}
            emptyLabel="No daily activity recorded in the last 14 days."
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <CountList title="Top pages (7d)" rows={topPages} emptyLabel="No page views yet." />
          <CountList
            title="Top referrers (7d)"
            rows={topReferrers}
            emptyLabel="No referrers yet."
          />
          <CountList title="Devices (7d)" rows={devices} emptyLabel="No device data yet." />
          <CountList title="Countries (7d)" rows={countries} emptyLabel="No country data yet." />
          <CountList
            title="Brand redirects (30d)"
            rows={brandRedirects}
            emptyLabel="No brand redirect clicks yet."
          />
          <CountList
            title="Contact CTAs (30d)"
            rows={contactCta}
            emptyLabel="No contact CTA clicks yet."
          />
        </section>

        <section className="mt-8">
          <RecentEventsTable rows={recentEvents} />
        </section>

        <footer className="mt-12 text-xs text-tunera-muted-ink">
          Built into the Tunera Corporate Web codebase. Tracked event names and KVKK / privacy notes
          are documented in
          <code className="mx-1 rounded-sm bg-tunera-sand/60 px-1 py-0.5 text-[11px] text-tunera-ink">
            docs/analytics-admin.md
          </code>
          .
        </footer>
      </div>
    </main>
  );
}
