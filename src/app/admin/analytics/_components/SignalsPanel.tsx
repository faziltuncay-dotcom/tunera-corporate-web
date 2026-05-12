import type { SalesSignals } from "@/lib/analytics/aggregate";
import { LOW_DATA_THRESHOLD, isLowData, pathLabel } from "@/lib/analytics/labels";

type Props = {
  signals: SalesSignals;
  emptyLabel: string;
};

/**
 * "Sales signals" — a deliberately small panel that surfaces five
 * coarse readings the operator can act on without spreadsheet work.
 *
 * Wording is neutral on purpose. These are signals, not leads. No
 * "hot lead", no "high probability", no "conversion score", no
 * revenue estimate, no individual visitor identification. Every
 * value is a count over the selected range. When the totals are too
 * small to be informative, a low-data disclaimer is appended.
 */
export function SignalsPanel({ signals, emptyLabel }: Props) {
  const totalCta = signals.mobileCtaCount + signals.desktopCtaCount;
  const allEmpty =
    !signals.topContactPage &&
    !signals.topBrandPage &&
    !signals.topCtaReferrer &&
    !signals.topCtaCountry &&
    totalCta === 0;
  const lowData = !allEmpty && isLowData(totalCta);

  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Sales signals</span>
      </header>
      <p className="mb-4 text-[11px] leading-relaxed text-tunera-muted-ink">
        Directional indicators only — these are <strong>signals, not leads</strong>. Counts are not
        weighted, ranked or scored; no revenue, probability or visitor identity is computed.
      </p>
      {allEmpty ? (
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      ) : (
        <>
          <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <Signal
              label="Strongest contact-intent page"
              value={signals.topContactPage ? pathLabel(signals.topContactPage.label) : "—"}
              secondary={signals.topContactPage?.label}
              count={signals.topContactPage?.count ?? null}
            />
            <Signal
              label="Strongest brand-interest page"
              value={signals.topBrandPage ? pathLabel(signals.topBrandPage.label) : "—"}
              secondary={signals.topBrandPage?.label}
              count={signals.topBrandPage?.count ?? null}
            />
            <Signal
              label="CTA source with most activity"
              value={signals.topCtaReferrer?.label ?? "—"}
              count={signals.topCtaReferrer?.count ?? null}
            />
            <Signal
              label="Country with most contact intent"
              value={signals.topCtaCountry?.label ?? "—"}
              count={signals.topCtaCountry?.count ?? null}
            />
            <DeviceSplit
              label="Device split for CTA actions"
              mobile={signals.mobileCtaCount}
              desktop={signals.desktopCtaCount}
            />
          </dl>
          {lowData ? (
            <p className="mt-4 rounded-sm border border-tunera-orange/40 bg-tunera-orange/5 px-3 py-2 text-[11px] leading-relaxed text-tunera-ink">
              Low data — only {totalCta} CTA action{totalCta === 1 ? "" : "s"} in this range
              (threshold {LOW_DATA_THRESHOLD}). Treat the rankings above as direction only, not as
              evidence.
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}

const Signal = ({
  label,
  value,
  secondary,
  count,
}: {
  label: string;
  value: string;
  secondary?: string;
  count: number | null;
}) => (
  <div>
    <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</dt>
    <dd className="mt-1 flex items-baseline justify-between gap-3">
      <div className="min-w-0">
        <div className="truncate text-tunera-ink" title={value}>
          {value}
        </div>
        {secondary && secondary !== value ? (
          <div className="truncate text-[11px] text-tunera-muted-ink">{secondary}</div>
        ) : null}
      </div>
      {count !== null ? (
        <span className="shrink-0 tabular-nums text-tunera-muted-ink">
          {count.toLocaleString("tr-TR")}
        </span>
      ) : null}
    </dd>
  </div>
);

const DeviceSplit = ({
  label,
  mobile,
  desktop,
}: {
  label: string;
  mobile: number;
  desktop: number;
}) => {
  const total = mobile + desktop;
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</dt>
      <dd className="mt-1 flex items-baseline justify-between gap-3">
        <span className="text-tunera-ink">
          Mobile {mobile.toLocaleString("tr-TR")} · Desktop {desktop.toLocaleString("tr-TR")}
        </span>
        <span className="tabular-nums text-tunera-muted-ink">{total.toLocaleString("tr-TR")}</span>
      </dd>
    </div>
  );
};
