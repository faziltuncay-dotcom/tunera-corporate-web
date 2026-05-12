import type { JourneyRow } from "@/lib/analytics/aggregate";

type Props = {
  rows: JourneyRow[];
  emptyLabel: string;
};

/**
 * Top consented journeys panel.
 *
 * Renders the most common visitor path sequences as
 * `step1 → step2 → step3` strings. Each row carries a count of how
 * many distinct consented visitors followed that exact sequence.
 *
 * The aggregate query already enforces:
 *   - consented sessions only (`visitor_id_hash IS NOT NULL`)
 *   - `count >= 2` so a single visitor's idiosyncratic walk does
 *     not get surfaced as a "real journey"
 *   - per-visitor consecutive-duplicate paths collapsed
 *   - no raw session ids in the result set
 *
 * The dashboard surfaces only aggregated counts; individual visitor
 * timelines are intentionally not built.
 */
export function JourneyList({ rows, emptyLabel }: Props) {
  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Top journeys (consented)</span>
      </header>
      {rows.length === 0 ? (
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      ) : (
        <ol className="space-y-3">
          {rows.map((r, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-tunera-ink" title={r.steps.join(" → ")}>
                {r.steps.join(" → ")}
              </span>
              <span className="tabular-nums text-tunera-muted-ink">
                {r.count.toLocaleString("tr-TR")}
              </span>
            </li>
          ))}
        </ol>
      )}
      <p className="mt-3 text-[11px] leading-relaxed text-tunera-muted-ink">
        Aggregated from consented sessions only. Sequences below two visitors are not shown.
      </p>
    </section>
  );
}
