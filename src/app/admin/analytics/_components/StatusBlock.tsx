import { formatIstanbulDateTime } from "@/lib/analytics/format";

type Props = {
  databaseConfigured: boolean;
  saltConfigured: boolean;
  lastEventAt: string | null;
  /**
   * Range-aware data-quality flags. The page passes simple booleans
   * derived from the same aggregate queries that drive the panels
   * below, so the operator can read "is this surface meaningful in
   * the selected range?" without scanning every panel.
   */
  rangeLabel: string;
  hasSectionData: boolean;
  hasScrollData: boolean;
  hasJourneyData: boolean;
  hasConsentedVisitors: boolean;
};

const Pill = ({ ok, label }: { ok: boolean; label: string }) => (
  <span
    className={
      "inline-flex items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] " +
      (ok
        ? "border-tunera-orange/30 bg-tunera-orange/5 text-tunera-orange"
        : "border-tunera-ink/15 text-tunera-muted-ink")
    }
  >
    <span
      aria-hidden
      className={
        "inline-block h-1.5 w-1.5 rounded-full " +
        (ok ? "bg-tunera-orange" : "bg-tunera-muted-ink/55")
      }
    />
    {label}
  </span>
);

const Cell = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</dt>
    <dd className="mt-1.5">{children}</dd>
  </div>
);

/**
 * Admin-only data-quality panel.
 *
 * Surfaces the operational state the dashboard depends on so the
 * Tunera operator can confirm at a glance whether storage is wired
 * up, events are arriving, and which Phase-2 surfaces have data in
 * the selected range — without ever revealing the `DATABASE_URL`,
 * the `ANALYTICS_SALT`, the admin password, or any raw visitor /
 * session id. The panel only reflects boolean configuration state,
 * a single timestamp, and per-surface presence flags.
 *
 * Phase 2.1 widens the original four-cell strip to a two-row grid:
 *
 *   Row 1 (configuration / housekeeping):
 *     storage mode, visitor-id hashing, admin route, last event,
 *     internal-route filter
 *
 *   Row 2 (range-aware data quality):
 *     section data present, scroll data present,
 *     consented-visitor data present, repeated-journey data present
 */
export function StatusBlock({
  databaseConfigured,
  saltConfigured,
  lastEventAt,
  rangeLabel,
  hasSectionData,
  hasScrollData,
  hasJourneyData,
  hasConsentedVisitors,
}: Props) {
  const storageMode = databaseConfigured ? "active" : "no-op";
  return (
    <section
      aria-label="Data quality"
      className="rounded-md border border-tunera-stone/60 bg-white px-5 py-4 sm:px-6"
    >
      <header className="flex items-center justify-between gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <div className="flex items-center gap-2">
          <span aria-hidden className="h-px w-6 bg-tunera-orange" />
          <span>Data quality</span>
        </div>
        <span className="text-tunera-muted-ink">{rangeLabel}</span>
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-5">
        <Cell label="Storage mode">
          <Pill ok={databaseConfigured} label={storageMode} />
        </Cell>
        <Cell label="Visitor id hashing">
          <Pill ok={saltConfigured} label={saltConfigured ? "configured" : "disabled"} />
        </Cell>
        <Cell label="Admin route">
          <Pill ok label="protected" />
        </Cell>
        <Cell label="Internal route filter">
          <Pill ok label="active" />
        </Cell>
        <Cell label="Last event">
          <span className="text-tunera-ink tabular-nums">
            {formatIstanbulDateTime(lastEventAt)}
          </span>
        </Cell>
      </dl>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-tunera-stone/40 pt-4 text-sm sm:grid-cols-4">
        <Cell label="Consented visitors">
          <Pill ok={hasConsentedVisitors} label={hasConsentedVisitors ? "yes" : "no"} />
        </Cell>
        <Cell label="Section tracking data">
          <Pill ok={hasSectionData} label={hasSectionData ? "yes" : "no"} />
        </Cell>
        <Cell label="Scroll tracking data">
          <Pill ok={hasScrollData} label={hasScrollData ? "yes" : "no"} />
        </Cell>
        <Cell label="Repeated journeys">
          <Pill ok={hasJourneyData} label={hasJourneyData ? "yes" : "no"} />
        </Cell>
      </dl>

      <p className="mt-4 text-[11px] leading-relaxed text-tunera-muted-ink">
        Section, scroll and journey data require accepted analytics preferences. No raw IP, raw
        visitor id or session id is read or shown anywhere on this page.
      </p>
    </section>
  );
}
