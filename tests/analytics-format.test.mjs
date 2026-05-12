// Istanbul-timezone formatting contract for the admin analytics UI.
//
// `analytics_events.created_at` is `TIMESTAMPTZ` (absolute UTC) so the
// display layer is responsible for surfacing wall-clock Türkiye time
// to the operator. These tests pin two things:
//
//   1. A known UTC instant renders as the matching Türkiye local
//      time. Europe/Istanbul has been a fixed +03:00 offset since
//      September 2016, so we can assert against an exact string
//      without becoming brittle around DST transitions.
//   2. Missing / invalid input is normalised to the dashboard's
//      "—" placeholder rather than throwing or leaking a
//      half-formatted string.
//
// The test imports the JS fixture mirror of the helper (Node's
// built-in `node --test` cannot load `.ts` directly). Keep the
// fixture and the production helper in sync — both are 30-ish lines.

import { test } from "node:test";
import assert from "node:assert/strict";

import { formatIstanbulDate, formatIstanbulDateTime } from "./fixtures/format.mjs";

test("formatIstanbulDateTime converts a UTC instant to Türkiye time", () => {
  // 19:55 UTC on 12 May 2026 — Türkiye is +03:00, so it must read 22:55.
  const out = formatIstanbulDateTime("2026-05-12T19:55:00.000Z");
  assert.equal(out, "12.05.2026 22:55 TR");
});

test("formatIstanbulDateTime handles a UTC instant that crosses local midnight", () => {
  // 23:30 UTC on 12 May 2026 is 02:30 on 13 May in Türkiye.
  const out = formatIstanbulDateTime("2026-05-12T23:30:00.000Z");
  assert.equal(out, "13.05.2026 02:30 TR");
});

test("formatIstanbulDateTime accepts Date instances", () => {
  const out = formatIstanbulDateTime(new Date("2026-05-12T19:55:00.000Z"));
  assert.equal(out, "12.05.2026 22:55 TR");
});

test("formatIstanbulDateTime accepts numeric epoch ms", () => {
  // 2026-05-12T19:55:00.000Z = 1778615700000
  const epoch = Date.UTC(2026, 4, 12, 19, 55, 0, 0);
  const out = formatIstanbulDateTime(epoch);
  assert.equal(out, "12.05.2026 22:55 TR");
});

test("formatIstanbulDateTime returns em-dash for nullish / invalid input", () => {
  for (const bad of [null, undefined, "", "not a date", "2026-13-99T99:99Z", NaN, {}, []]) {
    assert.equal(formatIstanbulDateTime(bad), "—", String(bad));
  }
});

test("formatIstanbulDateTime never mutates its input", () => {
  const input = new Date("2026-05-12T19:55:00.000Z");
  const before = input.getTime();
  formatIstanbulDateTime(input);
  assert.equal(input.getTime(), before);
});

test("formatIstanbulDate renders DD.MM.YYYY", () => {
  // Date-only string parses as UTC midnight; in Türkiye that's 03:00
  // on the same day, so the displayed date stays 12.05.2026.
  assert.equal(formatIstanbulDate("2026-05-12"), "12.05.2026");
  assert.equal(formatIstanbulDate(new Date("2026-05-12T00:00:00.000Z")), "12.05.2026");
});

test("formatIstanbulDate returns em-dash for nullish / invalid input", () => {
  for (const bad of [null, undefined, "", "garbage"]) {
    assert.equal(formatIstanbulDate(bad), "—", String(bad));
  }
});
