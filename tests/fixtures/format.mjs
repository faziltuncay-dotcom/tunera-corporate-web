// Pure-JS mirror of `src/lib/analytics/format.ts`. Kept here so the
// `node --test` runner can exercise the behavioural contract without
// TypeScript compilation. Mirror any change in the production helper
// here as well — the test
// `tests/analytics-format.test.mjs` documents the contract.

const TIME_ZONE = "Europe/Istanbul";
const LOCALE = "tr-TR";
const ZONE_SUFFIX = " TR";
const EMPTY = "—";

const toDate = (value) => {
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

export function formatIstanbulDateTime(value) {
  const d = toDate(value);
  if (!d) return EMPTY;
  return `${dateTimeFormatter.format(d)}${ZONE_SUFFIX}`;
}

export function formatIstanbulDate(value) {
  const d = toDate(value);
  if (!d) return EMPTY;
  return dateFormatter.format(d);
}
