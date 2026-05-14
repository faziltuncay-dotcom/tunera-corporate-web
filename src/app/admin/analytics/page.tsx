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
import { eventLabel, pathLabel, scrollDepthLabel, sectionLabel } from "@/lib/analytics/labels";
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
 * Phase 2.1 polish (this commit):
 *   - Path / section / event names are humanised everywhere via
 *     `labels.ts`; raw values stay accessible in small secondary
 *     text where it helps debugging.
 *   - Each Phase-2 surface ships a one-line helper paragraph that
 *     names the consent dependency and tells the operator how to
 *     read the panel honestly.
 *   - The diagnostics strip is now a two-row "Data quality" panel
 *     with range-aware presence flags (section / scroll / journey /
 *     consented data).
 *   - Sales signals call themselves signals, not leads, and a
 *     low-data disclaimer fires below `LOW_DATA_THRESHOLD` events.
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

const Helper = ({ children }: { children: React.ReactNode }) => (
  <p className="-mt-2 mb-4 max-w-3xl text-[12px] leading-relaxed text-tunera-muted-ink">
    {children}
  </p>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-3 text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
    {children}
  </h2>
);

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

  // Display normalisations — labels stay display-only; raw values
  // remain in the database untouched.
  const lowerRange = rangeLabel.toLowerCase();
  const topPagesDisplay = topPages.map((r) => ({ label: pathLabel(r.label), count: r.count }));
  const contactIntentDisplay = contactIntent.map((r) => ({
    label: pathLabel(r.label),
    count: r.count,
  }));
  const sectionViewsDisplay = sectionViews.map((s) => ({
    label: sectionLabel(s.section),
    count: s.count,
  }));
  const scrollDepthDisplay = scrollDepth.map((r) => ({
    label: scrollDepthLabel(r.label.replace(/%$/, "")),
    count: r.count,
  }));
  const contactCtaDisplay = contactCta.map((r) => ({
    label: eventLabel(r.label),
    count: r.count,
  }));

  // Range-aware data-quality flags for the StatusBlock.
  const hasSectionData = sectionViews.length > 0;
  const hasScrollData = scrollDepth.length > 0;
  const hasJourneyData = journeys.length > 0;
  const hasConsentedVisitors = summary.visitorsInRange > 0;

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
              — no third-party SDK, no raw IP storage, no individual visitor identification.
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

        <section className="mb-8">
          <StatusBlock
            databaseConfigured={configured}
            saltConfigured={saltConfigured}
            lastEventAt={lastEventAt}
            rangeLabel={rangeLabel}
            hasSectionData={hasSectionData}
            hasScrollData={hasScrollData}
            hasJourneyData={hasJourneyData}
            hasConsentedVisitors={hasConsentedVisitors}
          />
        </section>

        <SectionHeading>Overview</SectionHeading>
        <Helper>
          Today is the calendar day in the server&apos;s timezone. Range counts cover the
          {` ${lowerRange}`}. Visitor counts only include sessions that accepted analytics
          preferences; page-view counts include every visitor.
        </Helper>
        <section
          aria-label="Overview metrics"
          className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-6"
        >
          <MetricCard label="Page views today" value={summary.pageViewsToday} />
          <MetricCard label="Visitors today" value={summary.visitorsToday} hint="consented" />
          <MetricCard label={`Page views ${lowerRange}`} value={summary.pageViewsInRange} />
          <MetricCard
            label={`Visitors ${lowerRange}`}
            value={summary.visitorsInRange}
            hint="consented"
          />
          <MetricCard
            label={`Brand redirects ${lowerRange}`}
            value={summary.brandRedirectsInRange}
          />
          <MetricCard label={`Contact CTAs ${lowerRange}`} value={summary.contactCtaInRange} />
        </section>

        <section className="mt-8">
          <TimeSeriesChart
            data={series}
            emptyLabel={`No daily activity recorded in the ${lowerRange}.`}
          />
        </section>

        <section className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <CountList
            title={`Top pages (${lowerRange})`}
            rows={topPagesDisplay}
            emptyLabel="No page views yet."
          />
          <CountList
            title={`Top referrers (${lowerRange})`}
            rows={topReferrers}
            emptyLabel="No referrers yet."
            helper="External sources that brought visitors to the site. Only landing page views count — scroll and section events are not counted here. Self-referrals are excluded."
          />
          <CountList
            title={`Devices (${lowerRange})`}
            rows={devices}
            emptyLabel="No device data yet."
          />
          <CountList
            title={`Countries (${lowerRange})`}
            rows={countries}
            emptyLabel="No country data yet."
          />
          <CountList
            title={`Brand redirects (${lowerRange})`}
            rows={brandRedirects}
            emptyLabel="No brand redirect clicks yet."
          />
          <CountList
            title={`Contact CTAs (${lowerRange})`}
            rows={contactCtaDisplay}
            emptyLabel="No contact CTA clicks yet."
          />
        </section>

        <section className="mt-12">
          <SectionHeading>Engagement</SectionHeading>
          <Helper>
            Section views and scroll-depth milestones are{" "}
            <strong>only collected from visitors who accepted analytics preferences</strong>. If
            both panels are empty, the most likely cause is no consent yet — not low traffic.
            Reaching 100% scroll on a long page is rare and should not be read as failure on shorter
            pages.
          </Helper>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <CountList
              title="Section views"
              rows={sectionViewsDisplay}
              emptyLabel="No section_view events yet (consent required)."
            />
            <CountList
              title="Scroll depth"
              rows={scrollDepthDisplay}
              emptyLabel="No scroll_depth events yet (consent required)."
            />
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading>Brand interest</SectionHeading>
          <Helper>
            Three honest counts per brand: how many visitors saw the brand-cards section, how many
            clicked into a card, and how many continued to a brand site redirect. Section views are
            shared across the cards on the page; per-card impressions are deferred — that is why no
            conversion percentage is shown.
          </Helper>
          <BrandFunnel rows={brandFunnel} emptyLabel="No brand events yet." />
        </section>

        <section className="mt-12">
          <SectionHeading>Contact intent</SectionHeading>
          <Helper>
            Public pages from which a contact CTA (email or map) was clicked. Phone and WhatsApp
            CTAs are reserved event names but not yet wired to a UI surface, so they would only
            appear here once those CTAs ship.
          </Helper>
          <CountList
            title="Top pages where contact CTAs originated"
            rows={contactIntentDisplay}
            emptyLabel="No contact CTAs yet."
          />
        </section>

        <section className="mt-12">
          <SectionHeading>Top journeys</SectionHeading>
          <Helper>
            Aggregated visitor path sequences. Requires accepted analytics preferences. A sequence
            must be followed by at least two consented visitors before it appears here, so an empty
            list usually means &quot;not enough repeated journeys yet&quot; rather than &quot;no
            journeys at all&quot;.
          </Helper>
          <JourneyList rows={journeys} emptyLabel="No repeated consented journey pattern yet." />
        </section>

        <section className="mt-12">
          <SectionHeading>Sales signals</SectionHeading>
          <Helper>
            Directional indicators only — these are <strong>signals, not leads</strong>. No CRM row
            is created, no probability is computed, no revenue is estimated. A low-data disclaimer
            appears below the cards when the underlying CTA volume is too small to read
            meaningfully.
          </Helper>
          <SignalsPanel signals={signals} emptyLabel="No CTA activity yet in this range." />
        </section>

        <section className="mt-12">
          <SectionHeading>Recent events</SectionHeading>
          <Helper>
            Latest 50 events across the public site, with internal admin / API / framework rows
            already filtered out. Path and event-name columns show humanised labels with the raw
            value underneath.
          </Helper>
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
