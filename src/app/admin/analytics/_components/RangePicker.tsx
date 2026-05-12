import Link from "next/link";
import { VALID_RANGE_DAYS, type RangeDays } from "@/lib/analytics/aggregate";

type Props = {
  current: RangeDays;
};

const TOKEN_FOR: Record<RangeDays, string> = { 7: "7d", 30: "30d", 90: "90d" };

/**
 * Date-range picker for the admin dashboard.
 *
 * Renders the three whitelisted ranges (7 / 30 / 90 days) as a small
 * pill row that updates `?range=` on the same `/admin/analytics`
 * URL. Each option is a real `<Link>` so the change is a normal
 * server-rendered navigation (the page is `force-dynamic`, so
 * Next re-renders with the new range without any client state).
 *
 * The component knows nothing about the dashboard layout — it only
 * highlights the currently active option. The underlying
 * `getDateRangeFromSearchParam` helper guarantees that an unknown
 * value falls back to the default, so a hand-typed `?range=garbage`
 * still renders a usable dashboard with the default option lit.
 */
export function RangePicker({ current }: Props) {
  return (
    <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em]">
      <span className="text-tunera-muted-ink">Range</span>
      {VALID_RANGE_DAYS.map((days) => {
        const token = TOKEN_FOR[days];
        const isCurrent = days === current;
        return (
          <Link
            key={token}
            href={`/admin/analytics?range=${token}`}
            aria-current={isCurrent ? "page" : undefined}
            className={
              "rounded-sm border px-3 py-1 transition-colors " +
              (isCurrent
                ? "border-tunera-orange bg-tunera-orange/10 text-tunera-orange"
                : "border-tunera-ink/15 text-tunera-ink/70 hover:border-tunera-orange hover:text-tunera-orange")
            }
          >
            {token}
          </Link>
        );
      })}
    </div>
  );
}
