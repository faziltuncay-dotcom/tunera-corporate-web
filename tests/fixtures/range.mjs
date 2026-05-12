// Pure-JS mirror of `getDateRangeFromSearchParam` from
// `src/lib/analytics/aggregate.ts`. Mirrored here so the Node test
// runner can exercise the contract without TypeScript compilation.

export const VALID_RANGE_DAYS = [7, 30, 90];
export const DEFAULT_RANGE_DAYS = 30;

const RANGE_BY_TOKEN = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function getDateRangeFromSearchParam(value) {
  if (typeof value !== "string") return DEFAULT_RANGE_DAYS;
  const normalized = value.trim().toLowerCase();
  return RANGE_BY_TOKEN[normalized] ?? DEFAULT_RANGE_DAYS;
}
