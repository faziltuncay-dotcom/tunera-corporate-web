// Date-range search-param parsing contract.
//
// `?range=` controls every dashboard card / chart. The parser must
// fall back safely so a malformed URL never triggers an unbounded
// query, and must match the user-facing tokens (`7d`, `30d`, `90d`)
// exactly. Anything else lands on the documented default (30).

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_RANGE_DAYS,
  VALID_RANGE_DAYS,
  getDateRangeFromSearchParam,
} from "./fixtures/range.mjs";

test("VALID_RANGE_DAYS exposes the documented set", () => {
  assert.deepEqual(VALID_RANGE_DAYS, [7, 30, 90]);
});

test("DEFAULT_RANGE_DAYS is 30", () => {
  assert.equal(DEFAULT_RANGE_DAYS, 30);
});

test("getDateRangeFromSearchParam accepts the three supported tokens", () => {
  assert.equal(getDateRangeFromSearchParam("7d"), 7);
  assert.equal(getDateRangeFromSearchParam("30d"), 30);
  assert.equal(getDateRangeFromSearchParam("90d"), 90);
});

test("getDateRangeFromSearchParam normalises whitespace and case", () => {
  assert.equal(getDateRangeFromSearchParam(" 7D "), 7);
  assert.equal(getDateRangeFromSearchParam("90D"), 90);
});

test("getDateRangeFromSearchParam falls back to default for unknown values", () => {
  for (const bad of [
    "1d",
    "0d",
    "120d",
    "-7d",
    "7days",
    "7",
    "garbage",
    "",
    null,
    undefined,
    42,
    {},
    [],
  ]) {
    assert.equal(getDateRangeFromSearchParam(bad), DEFAULT_RANGE_DAYS, String(bad));
  }
});
