type Props = {
  label: string;
  value: number;
  /** Short, optional unit / context suffix. */
  hint?: string;
};

/**
 * Single metric tile used in the dashboard overview grid.
 *
 * Visuals follow the rest of the Tunera UI: ivory surface, hairline
 * stone border, a thin orange rule under the metric label, large
 * tabular-numeric value. The tile shows raw counts only — no growth
 * arrows, no fake compare-to-yesterday delta until we actually have
 * the data to back one.
 */
export function MetricCard({ label, value, hint }: Props) {
  return (
    <div className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-3xl font-semibold tabular-nums tracking-tightish text-tunera-ink">
          {value.toLocaleString("tr-TR")}
        </span>
        {hint ? (
          <span className="text-[11px] uppercase tracking-[0.18em] text-tunera-muted-ink">
            {hint}
          </span>
        ) : null}
      </div>
    </div>
  );
}
