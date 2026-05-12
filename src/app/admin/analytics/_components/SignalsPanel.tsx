import type { SalesSignals } from "@/lib/analytics/aggregate";

type Props = {
  signals: SalesSignals;
  emptyLabel: string;
};

/**
 * "Sales signals" — a deliberately small panel that surfaces five
 * coarse readings the operator can act on without spreadsheet work:
 * top contact-intent page, top brand-interest page, top traffic
 * source by CTA count, top country by contact CTA, and the mobile vs
 * desktop split among contact CTAs.
 *
 * The wording matters: these are signals, not leads. No revenue is
 * estimated, no probability is published, no individual visitor is
 * identified — every value is a count over the selected range.
 */
export function SignalsPanel({ signals, emptyLabel }: Props) {
  const allEmpty =
    !signals.topContactPage &&
    !signals.topBrandPage &&
    !signals.topCtaReferrer &&
    !signals.topCtaCountry &&
    signals.mobileCtaCount === 0 &&
    signals.desktopCtaCount === 0;

  return (
    <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
      <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Sales signals</span>
      </header>
      {allEmpty ? (
        <p className="text-sm text-tunera-muted-ink">{emptyLabel}</p>
      ) : (
        <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <Signal
            label="Top contact-intent page"
            value={signals.topContactPage?.label ?? "—"}
            count={signals.topContactPage?.count ?? null}
          />
          <Signal
            label="Top brand-interest page"
            value={signals.topBrandPage?.label ?? "—"}
            count={signals.topBrandPage?.count ?? null}
          />
          <Signal
            label="Top CTA referrer"
            value={signals.topCtaReferrer?.label ?? "—"}
            count={signals.topCtaReferrer?.count ?? null}
          />
          <Signal
            label="Top contact-CTA country"
            value={signals.topCtaCountry?.label ?? "—"}
            count={signals.topCtaCountry?.count ?? null}
          />
          <DeviceSplit
            label="Mobile vs desktop contact CTA"
            mobile={signals.mobileCtaCount}
            desktop={signals.desktopCtaCount}
          />
        </dl>
      )}
      <p className="mt-3 text-[11px] leading-relaxed text-tunera-muted-ink">
        Counts only — no probability, no revenue estimate, no visitor identification. Use as
        direction, not as scoring.
      </p>
    </section>
  );
}

const Signal = ({
  label,
  value,
  count,
}: {
  label: string;
  value: string;
  count: number | null;
}) => (
  <div>
    <dt className="text-[10px] uppercase tracking-[0.2em] text-tunera-muted-ink">{label}</dt>
    <dd className="mt-1 flex items-baseline justify-between gap-3">
      <span className="truncate text-tunera-ink" title={value}>
        {value}
      </span>
      {count !== null ? (
        <span className="tabular-nums text-tunera-muted-ink">{count.toLocaleString("tr-TR")}</span>
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
