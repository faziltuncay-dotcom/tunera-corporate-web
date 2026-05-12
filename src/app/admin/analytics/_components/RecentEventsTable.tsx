import { formatIstanbulDateTime } from "@/lib/analytics/format";
import type { RecentEventRow } from "@/lib/analytics/types";

type Props = {
  rows: RecentEventRow[];
};

/**
 * Compact recent-events table.
 *
 * Each column shows only sanitised, non-identifying data: timestamp,
 * event name, path, locale, country (or null), device type, and a
 * boolean consent flag. No referrer string and no metadata blob — if
 * deeper inspection is needed later we'd add a single-event detail
 * view rather than dump the entire metadata json into the table.
 */
export function RecentEventsTable({ rows }: Props) {
  if (rows.length === 0) {
    return (
      <section className="rounded-md border border-tunera-stone/60 bg-white p-5">
        <header className="mb-4 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
          <span aria-hidden className="h-px w-6 bg-tunera-orange" />
          <span>Recent events</span>
        </header>
        <p className="text-sm text-tunera-muted-ink">
          No events recorded yet. Once tracking starts they will appear here.
        </p>
      </section>
    );
  }
  return (
    <section className="overflow-hidden rounded-md border border-tunera-stone/60 bg-white">
      <header className="flex items-center gap-2 border-b border-tunera-stone/40 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
        <span aria-hidden className="h-px w-6 bg-tunera-orange" />
        <span>Recent events</span>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-tunera-sand/40 text-[10px] uppercase tracking-[0.18em] text-tunera-muted-ink">
            <tr>
              <th scope="col" className="px-5 py-2 font-medium">
                Time
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Event
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Path
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Locale
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Country
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Device
              </th>
              <th scope="col" className="px-5 py-2 font-medium">
                Consent
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.createdAt}-${i}`} className="border-t border-tunera-stone/30 align-top">
                <td className="whitespace-nowrap px-5 py-3 tabular-nums text-tunera-muted-ink">
                  {formatIstanbulDateTime(r.createdAt)}
                </td>
                <td className="px-5 py-3 text-tunera-ink">{r.eventName}</td>
                <td className="max-w-[220px] truncate px-5 py-3 text-tunera-ink" title={r.path}>
                  {r.path}
                </td>
                <td className="px-5 py-3 text-tunera-muted-ink">{r.locale ?? "—"}</td>
                <td className="px-5 py-3 text-tunera-muted-ink">{r.country ?? "—"}</td>
                <td className="px-5 py-3 text-tunera-muted-ink">{r.deviceType}</td>
                <td className="px-5 py-3">
                  <span
                    className={
                      "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] " +
                      (r.consentAnalytics
                        ? "border-tunera-orange/30 bg-tunera-orange/5 text-tunera-orange"
                        : "border-tunera-ink/15 text-tunera-muted-ink")
                    }
                  >
                    {r.consentAnalytics ? "granted" : "anon"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
