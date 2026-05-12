import type { JourneyRow } from "@/lib/analytics/aggregate";
import { pathLabel } from "@/lib/analytics/labels";

type Props = {
  rows: JourneyRow[];
  emptyLabel: string;
};

/**
 * Top consented journeys panel.
 *
 * Renders the most common visitor path sequences as
 * `Label → Label → Label` strings with the underlying raw paths
 * shown as small secondary text. Each row carries a count of how
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
      <header className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Top journeys (consented)</span>
      </header>
      <p className="mb-4 text-[11px] leading-relaxed text-tunera-muted-ink">
        Aggregated path sequences inside consented sessions. Single-visitor walks are not shown; a
        sequence must be followed by at least two consented visitors before it appears here.
        Consecutive same-path views collapse. No raw session id leaves the database.
      </p>
      {rows.length === 0 ? (
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      ) : (
        <ol className="space-y-3">
          {rows.map((r, i) => (
            <li key={i} className="flex items-baseline justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm text-tunera-ink" title={r.steps.join(" → ")}>
                  {r.steps.map((p) => pathLabel(p)).join(" → ")}
                </div>
                <div className="truncate text-[11px] text-tunera-muted-ink">
                  {r.steps.join(" → ")}
                </div>
              </div>
              <span className="shrink-0 tabular-nums text-tunera-muted-ink">
                {r.count.toLocaleString("tr-TR")}
              </span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
