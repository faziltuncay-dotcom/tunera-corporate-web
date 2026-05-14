// Tests for the SEO 1.1 referrer normalisation + self-host filter.
//
// The production bug these tests guard against was: a single
// Instagram visitor scrolling four times produced four extra
// "Instagram" rows in Top Referrers because the aggregate query
// counted every event name (page_view + scroll_depth + section_view)
// instead of `page_view` only. The aggregate-layer SQL fix is in
// `src/lib/analytics/aggregate.ts#getTopReferrers`; this file pins
// the pure JS post-processing layer that runs over the raw rows.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  SELF_REFERRER_HOSTS,
  aggregateReferrers,
  isSelfReferrerHost,
  normalizeReferrer,
} from "./fixtures/referrer.mjs";

test("normalizeReferrer maps every Instagram link-shim host to 'Instagram'", () => {
  for (const ref of [
    "https://l.instagram.com/?u=https%3A%2F%2Ftunera.com.tr%2Ftr",
    "https://www.instagram.com/some/profile",
    "https://instagram.com/",
  ]) {
    const out = normalizeReferrer(ref);
    assert.equal(out.label, "Instagram", `expected Instagram for ${ref}`);
    assert.equal(out.isSelf, false);
  }
});

test("normalizeReferrer maps Facebook link-shim and main hosts to 'Facebook'", () => {
  for (const ref of [
    "https://l.facebook.com/l.php?u=https%3A%2F%2Ftunera.com.tr",
    "https://www.facebook.com/",
    "https://m.facebook.com/",
    "https://lm.facebook.com/",
  ]) {
    assert.equal(normalizeReferrer(ref).label, "Facebook", `expected Facebook for ${ref}`);
  }
});

test("normalizeReferrer maps Google country TLDs to 'Google'", () => {
  for (const ref of [
    "https://www.google.com/search",
    "https://google.com/",
    "https://www.google.com.tr/search",
    "https://google.com.tr/",
  ]) {
    assert.equal(normalizeReferrer(ref).label, "Google", `expected Google for ${ref}`);
  }
});

test("normalizeReferrer maps LinkedIn / X / Twitter / WhatsApp", () => {
  assert.equal(normalizeReferrer("https://www.linkedin.com/").label, "LinkedIn");
  assert.equal(normalizeReferrer("https://t.co/abc").label, "X / Twitter");
  assert.equal(normalizeReferrer("https://x.com/some").label, "X / Twitter");
  assert.equal(normalizeReferrer("https://twitter.com/some").label, "X / Twitter");
  assert.equal(normalizeReferrer("https://web.whatsapp.com/").label, "WhatsApp");
  assert.equal(normalizeReferrer("https://api.whatsapp.com/").label, "WhatsApp");
});

test("normalizeReferrer marks tunera.com.tr referrers as self", () => {
  const a = normalizeReferrer("https://tunera.com.tr/tr/markalar");
  assert.equal(a.isSelf, true);
  assert.equal(a.host, "tunera.com.tr");
  const b = normalizeReferrer("http://www.tunera.com.tr/tr/iletisim");
  assert.equal(b.isSelf, true);
  assert.equal(b.host, "www.tunera.com.tr");
});

test("normalizeReferrer falls through to hostname for unknown external hosts", () => {
  const out = normalizeReferrer("https://example.com/some/page");
  assert.equal(out.label, "example.com");
  assert.equal(out.isSelf, false);
});

test("normalizeReferrer accepts host-only input via https fallback", () => {
  assert.equal(normalizeReferrer("instagram.com").label, "Instagram");
});

test("normalizeReferrer returns 'Direct' for empty / null / whitespace", () => {
  for (const ref of [null, undefined, "", "   "]) {
    const out = normalizeReferrer(ref);
    assert.equal(out.host, null);
    assert.equal(out.label, "Direct");
    assert.equal(out.isSelf, false);
  }
});

test("isSelfReferrerHost recognises both bare and www-prefixed self hosts", () => {
  assert.equal(isSelfReferrerHost("tunera.com.tr"), true);
  assert.equal(isSelfReferrerHost("www.tunera.com.tr"), true);
  assert.equal(isSelfReferrerHost("WWW.TUNERA.COM.TR"), true);
  assert.equal(isSelfReferrerHost("instagram.com"), false);
  assert.equal(isSelfReferrerHost(""), false);
  assert.equal(isSelfReferrerHost(null), false);
});

test("SELF_REFERRER_HOSTS still contains both production hosts", () => {
  assert.deepEqual([...SELF_REFERRER_HOSTS].sort(), ["tunera.com.tr", "www.tunera.com.tr"]);
});

test("aggregateReferrers groups link-shim variants under the same label", () => {
  const rows = [
    { referrer: "https://l.instagram.com/", count: 3 },
    { referrer: "https://www.instagram.com/", count: 4 },
    { referrer: "https://instagram.com/", count: 1 },
    { referrer: "https://www.linkedin.com/", count: 2 },
  ];
  const out = aggregateReferrers(rows, 5);
  assert.deepEqual(out, [
    { label: "Instagram", count: 8 },
    { label: "LinkedIn", count: 2 },
  ]);
});

test("aggregateReferrers drops self-referrer rows", () => {
  const rows = [
    { referrer: "https://tunera.com.tr/tr", count: 99 },
    { referrer: "https://www.tunera.com.tr/tr/markalar", count: 7 },
    { referrer: "https://instagram.com/", count: 1 },
  ];
  const out = aggregateReferrers(rows, 5);
  assert.deepEqual(out, [{ label: "Instagram", count: 1 }]);
});

test("aggregateReferrers drops null / empty referrers and respects the limit", () => {
  const rows = [
    { referrer: null, count: 99 },
    { referrer: "", count: 99 },
    { referrer: "https://example.com/", count: 5 },
    { referrer: "https://other.com/", count: 4 },
    { referrer: "https://third.com/", count: 3 },
  ];
  const out = aggregateReferrers(rows, 2);
  assert.equal(out.length, 2);
  assert.deepEqual(
    out.map((r) => r.label),
    ["example.com", "other.com"],
  );
});

test("aggregateReferrers tolerates non-finite counts", () => {
  const rows = [
    { referrer: "https://instagram.com/", count: Number.NaN },
    { referrer: "https://instagram.com/", count: 5 },
  ];
  const out = aggregateReferrers(rows, 1);
  assert.deepEqual(out, [{ label: "Instagram", count: 5 }]);
});
