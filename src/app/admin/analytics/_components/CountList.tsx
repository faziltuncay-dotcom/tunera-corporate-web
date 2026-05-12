import type { CountRow } from "@/lib/analytics/types";

type Props = {
  title: string;
  rows: CountRow[];
  /** Empty-state copy shown when no data exists yet. */
  emptyLabel: string;
};

/**
 * Horizontal bar list. Each row is `label — count` with a thin
 * orange bar whose width is proportional to its share of the max.
 *
 * Pure server component; renders SVG-free using CSS-only widths so a
 * deeply nested 0-row state still works without invented data.
 */
export function CountList({ title, rows, emptyLabel }: Props) {
  const max = rows.reduce((a, r) => Math.max(a, r.count), 0);
  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>{title}</span>
      </header>
      {rows.length === 0 ? (
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      ) : (
        <ol className="space-y-3">
          {rows.map((r) => {
            const pct = max > 0 ? Math.max(2, Math.round((r.count / max) * 100)) : 0;
            return (
              <li key={r.label}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="truncate text-tunera-ink" title={r.label}>
                    {r.label}
                  </span>
                  <span className="tabular-nums text-tunera-muted-ink">
                    {r.count.toLocaleString("tr-TR")}
                  </span>
                </div>
                <div
                  aria-hidden
                  className="mt-1 h-1.5 w-full overflow-hidden rounded-sm bg-tunera-stone/30"
                >
                  <div className="h-full bg-tunera-orange/80" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
