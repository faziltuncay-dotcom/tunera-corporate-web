// Internal-path exclusion contract.
//
// Runs via `node --test --test-reporter=spec tests`. Drives the
// in-fixture `isInternalPath()` mirror of the production helper
// (kept in `tests/fixtures/sanitize.mjs`) so the behavioural
// contract is exercised without TypeScript compilation. Update both
// the production file (`src/lib/analytics/sanitize.ts`) and the
// fixture together whenever the exclude list changes.

import { test } from "node:test";
import assert from "node:assert/strict";

import { isInternalPath } from "./fixtures/sanitize.mjs";

test("isInternalPath returns true for the documented admin paths", () => {
  for (const p of ["/admin", "/admin/", "/admin/analytics", "/admin/anything/deep"]) {
    assert.equal(isInternalPath(p), true, p);
  }
});

test("isInternalPath returns true for API and framework paths", () => {
  for (const p of [
    "/api",
    "/api/analytics/event",
    "/api/some/other/thing",
    "/_next/static/chunks/main.js",
    "/_next/image",
  ]) {
    assert.equal(isInternalPath(p), true, p);
  }
});

test("isInternalPath returns true for crawler / housekeeping files", () => {
  for (const p of ["/favicon.ico", "/robots.txt", "/sitemap.xml"]) {
    assert.equal(isInternalPath(p), true, p);
  }
});

test("isInternalPath returns false for public Tunera routes", () => {
  for (const p of [
    "/",
    "/tr",
    "/en",
    "/tr/markalar",
    "/en/brands",
    "/tr/iletisim",
    "/en/contact",
    "/hizmetler",
  ]) {
    assert.equal(isInternalPath(p), false, p);
  }
});

test("isInternalPath does not match names that merely share a prefix", () => {
  // The predicate must respect the path boundary: `/administer` and
  // `/apiary` are public-looking routes that happen to start with
  // the same characters as `/admin` / `/api` and must not be
  // accidentally excluded.
  for (const p of ["/administer", "/apiary", "/_nextgen", "/admin-helper"]) {
    assert.equal(isInternalPath(p), false, p);
  }
});

test("isInternalPath safely handles non-string and empty input", () => {
  assert.equal(isInternalPath(null), false);
  assert.equal(isInternalPath(undefined), false);
  assert.equal(isInternalPath(42), false);
  assert.equal(isInternalPath({}), false);
  assert.equal(isInternalPath(""), false);
});
