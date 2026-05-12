import type { Metadata } from "next";
import {
  DEFAULT_RANGE_DAYS,
  getBrandFunnel,
  getBrandRedirectBreakdown,
  getContactCtaBreakdown,
  getContactIntentBySource,
  getDailyTimeSeries,
  getDateRangeFromSearchParam,
  getDeviceDistribution,
  getLastEventAt,
  getRecentEvents,
  getSalesSignals,
  getScrollDepthDistribution,
  getSectionViews,
  getSummaryMetrics,
  getTopCountries,
  getTopJourneys,
  getTopPages,
  getTopReferrers,
} from "@/lib/analytics/aggregate";
import { isAnalyticsConfigured, isAnalyticsSaltConfigured } from "@/lib/analytics/server";
import { BrandFunnel } from "./_components/BrandFunnel";
import { CountList } from "./_components/CountList";
import { JourneyList } from "./_components/JourneyList";
import { MetricCard } from "./_components/MetricCard";
import { RangePicker } from "./_components/RangePicker";
import { RecentEventsTable } from "./_components/RecentEventsTable";
import { SignalsPanel } from "./_components/SignalsPanel";
import { StatusBlock } from "./_components/StatusBlock";
import { TimeSeriesChart } from "./_components/TimeSeriesChart";

/**
 * Admin analytics dashboard.
 *
 * Server component, force-dynamic — every render reads live counts
 * from `analytics_events`. The page accepts a single search param,
 * `?range=7d|30d|90d` (default 30d), which threads through every
 * aggregate helper so all cards / charts agree on the same window.
 *
 * Phase 2 added five additional surfaces below the original
 * overview + recent-events strip:
 *
 *   - Engagement: section views, scroll-depth distribution.
 *   - Brand interest: brand funnel rollup per brand.
 *   - Contact intent: top pages CTAs originate from.
 *   - Top consented journeys: aggregated path sequences (visitor
 *     ids stay in Postgres; only counts surface).
 *   - Sales signals: a five-row "where is the most signal coming
 *     from?" digest with explicit counts and no fake conversion.
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

type Props = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const RANGE_LABEL: Record<7 | 30 | 90, string> = {
  7: "Last 7 days",
  30: "Last 30 days",
  90: "Last 90 days",
};

export default async function AnalyticsAdminPage({ searchParams }: Props) {
  const rangeParam = searchParams?.range;
  const rangeDays = getDateRangeFromSearchParam(
    Array.isArray(rangeParam) ? rangeParam[0] : rangeParam,
  );
  const rangeLabel = RANGE_LABEL[rangeDays] ?? RANGE_LABEL[DEFAULT_RANGE_DAYS];

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
    sectionViews,
    scrollDepth,
    brandFunnel,
    contactIntent,
    journeys,
    signals,
  ] = await Promise.all([
    getSummaryMetrics(rangeDays),
    getDailyTimeSeries(rangeDays),
    getTopPages(rangeDays, 10),
    getTopReferrers(rangeDays, 10),
    getDeviceDistribution(rangeDays),
    getTopCountries(rangeDays, 10),
    getBrandRedirectBreakdown(rangeDays),
    getContactCtaBreakdown(rangeDays),
    getRecentEvents(50),
    getLastEventAt(),
    getSectionViews(rangeDays, 12),
    getScrollDepthDistribution(rangeDays),
    getBrandFunnel(rangeDays),
    getContactIntentBySource(rangeDays, 8),
    getTopJourneys(rangeDays, 2, 8),
    getSalesSignals(rangeDays),
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
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-2xl text-sm leading-relaxed text-tunera-muted-ink sm:text-base">
              Live counts from the Tunera corporate site. Every metric here is derived from the
              events ingested through
              <code className="mx-1 rounded-sm bg-tunera-sand/60 px-1 py-0.5 text-[12px] text-tunera-ink">
                /api/analytics/event
              </code>
              — no third-party SDK and no raw IP storage.
            </p>
            <RangePicker current={rangeDays} />
          </div>
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
          <MetricCard
            label={`Page views ${rangeLabel.toLowerCase()}`}
            value={summary.pageViewsInRange}
          />
          <MetricCard
            label={`Visitors ${rangeLabel.toLowerCase()}`}
            value={summary.visitorsInRange}
            hint="consented"
          />
          <MetricCard
            label={`Brand redirects ${rangeLabel.toLowerCase()}`}
            value={summary.brandRedirectsInRange}
          />
          <MetricCard
            label={`Contact CTAs ${rangeLabel.toLowerCase()}`}
            value={summary.contactCtaInRange}
          />
        </section>

        <section className="mt-8">
          <TimeSeriesChart
            data={series}
            emptyLabel={`No daily activity recorded in the ${rangeLabel.toLowerCase()}.`}
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <CountList
            title={`Top pages (${rangeLabel.toLowerCase()})`}
            rows={topPages}
            emptyLabel="No page views yet."
          />
          <CountList
            title={`Top referrers (${rangeLabel.toLowerCase()})`}
            rows={topReferrers}
            emptyLabel="No referrers yet."
          />
          <CountList
            title={`Devices (${rangeLabel.toLowerCase()})`}
            rows={devices}
            emptyLabel="No device data yet."
          />
          <CountList
            title={`Countries (${rangeLabel.toLowerCase()})`}
            rows={countries}
            emptyLabel="No country data yet."
          />
          <CountList
            title={`Brand redirects (${rangeLabel.toLowerCase()})`}
            rows={brandRedirects}
            emptyLabel="No brand redirect clicks yet."
          />
          <CountList
            title={`Contact CTAs (${rangeLabel.toLowerCase()})`}
            rows={contactCta}
            emptyLabel="No contact CTA clicks yet."
          />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
            Engagement
          </h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CountList
              title="Section views"
              rows={sectionViews.map((s) => ({ label: s.label, count: s.count }))}
              emptyLabel="No section_view events yet (consent required)."
            />
            <CountList
              title="Scroll depth"
              rows={scrollDepth}
              emptyLabel="No scroll_depth events yet (consent required)."
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
            Brand interest
          </h2>
          <BrandFunnel rows={brandFunnel} emptyLabel="No brand events yet." />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
            Contact intent
          </h2>
          <CountList
            title="Top pages where contact CTAs originated"
            rows={contactIntent}
            emptyLabel="No contact CTAs yet."
          />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
            Journey
          </h2>
          <JourneyList
            rows={journeys}
            emptyLabel="Not enough consented journey data yet. Sequences shorter than two visitors are not shown."
          />
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
            Signals
          </h2>
          <SignalsPanel signals={signals} emptyLabel="No CTA activity yet in this range." />
        </section>

        <section className="mt-10">
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
