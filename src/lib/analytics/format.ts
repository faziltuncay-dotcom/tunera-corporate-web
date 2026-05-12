/**
 * Display-side date/time helpers for the admin analytics dashboard.
 *
 * The analytics_events table stores `created_at` as `TIMESTAMPTZ` so
 * the underlying value is already absolute UTC. The dashboard,
 * however, is consumed exclusively by Tunera operators in Türkiye —
 * if we render whatever the host happens to think is "local" (Vercel
 * runs Lambda containers in UTC, browsers depend on the user's
 * machine clock) the operator sees "22:55 UTC = 19:55 displayed" and
 * mistakes activity for being three hours behind reality. These two
 * helpers force the display to Europe/Istanbul via `Intl.DateTimeFormat`
 * so the operator always reads the timestamps in Türkiye local time
 * regardless of where the server / browser thinks it is.
 *
 * The helpers never mutate their inputs and never throw: anything
 * that doesn't parse to a valid Date renders as `—`, the same
 * em-dash placeholder the dashboard already uses for empty cells.
 * The fixed " TR" suffix makes the displayed timezone unambiguous
 * for the operator without depending on the visitor's locale.
 */

const TIME_ZONE = "Europe/Istanbul";
const LOCALE = "tr-TR";
const ZONE_SUFFIX = " TR";
const EMPTY = "—";

const toDate = (value: Date | string | number | null | undefined): Date | null => {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) {
    return Number.isFinite(value.getTime()) ? value : null;
  }
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isFinite(d.getTime()) ? d : null;
  }
  return null;
};

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/**
 * Format an absolute timestamp for display, in `DD.MM.YYYY HH:mm TR`
 * shape. Returns `"—"` for missing / invalid input.
 */
export function formatIstanbulDateTime(value: Date | string | number | null | undefined): string {
  const d = toDate(value);
  if (!d) return EMPTY;
  return `${dateTimeFormatter.format(d)}${ZONE_SUFFIX}`;
}

/**
 * Format a calendar date for display, in `DD.MM.YYYY` shape. Used
 * for chart axis labels where the bucket key is a date-only string
 * (e.g. `2026-05-12`) and the operator just needs the date in
 * Turkish day-month-year order. Bucket boundaries themselves are
 * computed server-side and remain in the server's local time —
 * see `getDailyTimeSeries` in `aggregate.ts`.
 */
export function formatIstanbulDate(value: Date | string | number | null | undefined): string {
  const d = toDate(value);
  if (!d) return EMPTY;
  return dateFormatter.format(d);
}
