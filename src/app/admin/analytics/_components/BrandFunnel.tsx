import type { BrandFunnelRow } from "@/lib/analytics/aggregate";
import { LOW_DATA_THRESHOLD, isLowData } from "@/lib/analytics/labels";

type Props = {
  rows: BrandFunnelRow[];
  emptyLabel: string;
};

/**
 * Brand-interest panel.
 *
 * Three integers per brand laid out as a wide row so the operator
 * can read drop-off at a glance:
 *
 *   1. Brand-cards section views (shared across the cards on the
 *      page — per-card impressions are deferred).
 *   2. Brand card clicks.
 *   3. Brand redirect clicks.
 *
 * No conversion percentage is computed: Phase 2 just rolled out, the
 * impressions number is shared across cards, and a misleading
 * "12% conversion" would do more harm than good. The panel is
 * labelled "Directional interest" to set the right expectation.
 *
 * When the totals are too small to read meaningfully, a low-data
 * disclaimer is appended.
 */
export function BrandFunnel({ rows, emptyLabel }: Props) {
  if (rows.length === 0) {
    return (
      <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
        <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
          <span aria-hidden className="h-px w-6 bg-tunera-orange" />
          <span>Brand interest</span>
        </header>
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      </section>
    );
  }
  const totalEvents = rows.reduce(
    (acc, r) => acc + r.cardImpressions + r.cardClicks + r.redirects,
    0,
  );
  const lowData = isLowData(totalEvents);
  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Brand interest</span>
      </header>
      <p className="mb-4 text-[11px] leading-relaxed text-tunera-muted-ink">
        Directional interest, not a conversion funnel. Brand section views are shared across the
        cards on the page; per-card impressions are not yet measured, so a percentage would mislead.
        Read the three counts on their own.
      </p>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li
            key={r.brand}
            className="grid grid-cols-2 items-baseline gap-2 border-t border-tunera-stone/40 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-4"
          >
            <div className="text-sm font-semibold tracking-tightish text-tunera-ink">{r.brand}</div>
            <FunnelCell label="Brand section views" value={r.cardImpressions} />
            <FunnelCell label="Card clicks" value={r.cardClicks} />
            <FunnelCell label="Redirect clicks" value={r.redirects} />
          </li>
        ))}
      </ul>
      {lowData ? (
        <p className="mt-4 rounded-sm border border-tunera-orange/40 bg-tunera-orange/5 px-3 py-2 text-[11px] leading-relaxed text-tunera-ink">
          Low data — only {totalEvents} brand event{totalEvents === 1 ? "" : "s"} in this range
          (threshold {LOW_DATA_THRESHOLD}). Read as direction only.
        </p>
      ) : null}
    </section>
  );
}

const FunnelCell = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</span>
    <span className="text-base tabular-nums text-tunera-ink">{value.toLocaleString("tr-TR")}</span>
  </div>
);
