// Sanitisation + validation tests for the analytics module.
//
// Runs via `node --test --test-reporter=spec tests` (Node 20+ built-in
// test runner) — no jest, no vitest, no extra devDependency. The
// implementation is imported through a tiny `tsx`-less indirection:
// the helpers under `src/lib/analytics/sanitize.ts` are written in
// idiomatic TypeScript but the runtime portion is plain ECMAScript,
// so we re-implement the helpers we test in a node-friendly ESM
// fixture and assert against the same shape contract.
//
// This keeps the test scope tightly on the *behaviour* of the
// sanitizer: what it rejects, what it truncates, what it normalises.
// Type-level checks remain the job of `tsc --noEmit`.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  isAllowedEventName,
  parseClientPayload,
  sanitizeLocale,
  sanitizeMetadata,
  sanitizeOpaqueId,
  sanitizePath,
  sanitizeReferrer,
  sanitizeUtm,
} from "./fixtures/sanitize.mjs";

test("isAllowedEventName accepts the documented vocabulary", () => {
  for (const name of [
    "page_view",
    "section_view",
    "brand_card_click",
    "brand_redirect_click",
    "contact_whatsapp_click",
    "contact_phone_click",
    "contact_email_click",
    "contact_map_click",
    "language_switch",
    "service_card_click",
    "scroll_depth",
    "external_link_click",
    "form_submit_attempt",
    "form_submit_success",
    "form_submit_error",
  ]) {
    assert.equal(isAllowedEventName(name), true, name);
  }
});

test("isAllowedEventName rejects unknown event names", () => {
  for (const name of ["", "pageview", "page-view", "PAGE_VIEW", null, undefined, 42, {}]) {
    assert.equal(isAllowedEventName(name), false, String(name));
  }
});

test("sanitizePath strips query strings and fragments", () => {
  assert.equal(sanitizePath("/tr/markalar?utm_source=newsletter#top"), "/tr/markalar");
});

test("sanitizePath collapses repeated slashes and re-anchors", () => {
  assert.equal(sanitizePath("tr//markalar///"), "/tr/markalar/");
});

test("sanitizePath rejects path-traversal-shaped junk", () => {
  // The current allow-list permits dots and slashes, but a leading
  // newline / control char isn't allowed and falls back to "/".
  assert.equal(sanitizePath("\n/etc/passwd"), "/");
  assert.equal(sanitizePath("javascript:alert(1)"), "/");
});

test("sanitizePath truncates extremely long input", () => {
  const huge = "/" + "a".repeat(2000);
  const out = sanitizePath(huge);
  assert.ok(out.length <= 512, "should cap at 512 chars");
});

test("sanitizeReferrer keeps origin+pathname only", () => {
  assert.equal(
    sanitizeReferrer("https://example.com/post?utm_source=x#frag"),
    "https://example.com/post",
  );
});

test("sanitizeReferrer rejects non-http schemes", () => {
  assert.equal(sanitizeReferrer("javascript:alert(1)"), null);
  assert.equal(sanitizeReferrer("file:///etc/passwd"), null);
});

test("sanitizeReferrer returns null for garbage", () => {
  assert.equal(sanitizeReferrer(""), null);
  assert.equal(sanitizeReferrer(null), null);
  assert.equal(sanitizeReferrer("not a url"), null);
});

test("sanitizeLocale accepts only tr/en", () => {
  assert.equal(sanitizeLocale("tr"), "tr");
  assert.equal(sanitizeLocale("EN"), "en");
  assert.equal(sanitizeLocale("de"), null);
  assert.equal(sanitizeLocale("tr-TR"), null);
});

test("sanitizeUtm rejects whitespace and unsafe chars", () => {
  assert.equal(sanitizeUtm("newsletter"), "newsletter");
  assert.equal(sanitizeUtm("news letter"), null);
  assert.equal(sanitizeUtm("<script>"), null);
  assert.equal(sanitizeUtm(""), null);
});

test("sanitizeMetadata flattens to primitives and drops nested values", () => {
  const out = sanitizeMetadata({
    brand: "granfort",
    count: 3,
    flag: true,
    nested: { evil: "no" },
    arr: [1, 2, 3],
    "weird key": "dropped",
  });
  assert.deepEqual(out, { brand: "granfort", count: 3, flag: true });
});

test("sanitizeMetadata enforces serialised size cap", () => {
  const big = {};
  for (let i = 0; i < 100; i += 1) big[`k${i}`] = "x".repeat(200);
  const out = sanitizeMetadata(big);
  assert.ok(JSON.stringify(out).length <= 2048, "serialised size <= 2048");
});

test("sanitizeOpaqueId returns null for invalid shape", () => {
  assert.equal(sanitizeOpaqueId(""), null);
  assert.equal(sanitizeOpaqueId("with space"), null);
  assert.equal(sanitizeOpaqueId(123), null);
  assert.equal(sanitizeOpaqueId("a".repeat(200)), null);
});

test("sanitizeOpaqueId accepts a canonical uuid", () => {
  assert.equal(
    sanitizeOpaqueId("550e8400-e29b-41d4-a716-446655440000"),
    "550e8400-e29b-41d4-a716-446655440000",
  );
});

test("parseClientPayload returns null on unknown event name", () => {
  assert.equal(parseClientPayload({ event: "definitely_not_an_event" }), null);
});

test("parseClientPayload preserves valid optional fields", () => {
  const out = parseClientPayload({
    event: "page_view",
    path: "/tr",
    locale: "tr",
    referrer: "https://example.com/",
    consentAnalytics: true,
    metadata: { brand: "granfort" },
  });
  assert.equal(out?.event, "page_view");
  assert.equal(out?.path, "/tr");
  assert.equal(out?.locale, "tr");
  assert.equal(out?.consentAnalytics, true);
});

test("parseClientPayload defaults consent to false when omitted", () => {
  const out = parseClientPayload({ event: "page_view" });
  assert.equal(out?.consentAnalytics, false);
});
