import type { BrandFunnelRow } from "@/lib/analytics/aggregate";

type Props = {
  rows: BrandFunnelRow[];
  emptyLabel: string;
};

/**
 * Brand-funnel panel.
 *
 * Three integers per brand (impressions, card clicks, redirects)
 * laid out as a wide row so the operator can read the drop-off at a
 * glance. The component deliberately does NOT compute a percentage:
 * Phase 2 just rolled out, the impressions number is shared across
 * brands (the section is the brand-cards container, not per-card),
 * and a misleading "12% conversion" would do more harm than good.
 * If/when the underlying signal is rich enough for honest funnel
 * math we can revisit.
 */
export function BrandFunnel({ rows, emptyLabel }: Props) {
  if (rows.length === 0) {
    return (
      <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
        <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
          <span aria-hidden className="h-px w-6 bg-tunera-orange" />
          <span>Brand funnel</span>
        </header>
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      </section>
    );
  }
  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Brand funnel</span>
      </header>
      <ul className="space-y-3">
        {rows.map((r) => (
          <li
            key={r.brand}
            className="grid grid-cols-2 items-baseline gap-2 border-t border-tunera-stone/40 pt-3 first:border-t-0 first:pt-0 sm:grid-cols-4"
          >
            <div className="text-sm font-semibold tracking-tightish text-tunera-ink">{r.brand}</div>
            <FunnelCell label="Impr." value={r.cardImpressions} />
            <FunnelCell label="Card" value={r.cardClicks} />
            <FunnelCell label="Redir." value={r.redirects} />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-tunera-muted-ink">
        Impr. = brand-cards section views; Card = brand_card_click; Redir. = brand_redirect_click.
        Section impressions are shared across the cards on the page; per-card impressions are not
        yet measured.
      </p>
    </section>
  );
}

const FunnelCell = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</span>
    <span className="text-base tabular-nums text-tunera-ink">{value.toLocaleString("tr-TR")}</span>
  </div>
);
