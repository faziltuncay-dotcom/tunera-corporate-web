// Locks the SEO route map and the helpers that compose it.
//
// These tests guard:
//   - canonical absolute URLs for every supported (locale, key) pair
//   - hreflang map shape (must always include tr-TR, en, and x-default)
//   - the full canonical inventory (used by sitemap.ts)
//   - the *exclusion* of redirect-only routes and internal routes
//     from the inventory — a regression here would put admin, api,
//     framework or redirect URLs into the public sitemap.

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  SEO_ROUTES,
  SEO_ROUTE_KEYS,
  allCanonicalUrls,
  canonicalUrl,
  hreflangMap,
  siteConfig,
} from "./fixtures/seo.mjs";

test("siteConfig exposes baseUrl, locales and default locale", () => {
  assert.equal(siteConfig.baseUrl, "https://tunera.com.tr");
  assert.deepEqual([...siteConfig.locales], ["tr", "en"]);
  assert.equal(siteConfig.defaultLocale, "tr");
});

test("canonicalUrl returns absolute URLs for every (locale, key) pair", () => {
  assert.equal(canonicalUrl("tr", "home"), "https://tunera.com.tr/tr");
  assert.equal(canonicalUrl("tr", "brands"), "https://tunera.com.tr/tr/markalar");
  assert.equal(canonicalUrl("tr", "contact"), "https://tunera.com.tr/tr/iletisim");
  assert.equal(canonicalUrl("en", "home"), "https://tunera.com.tr/en");
  assert.equal(canonicalUrl("en", "brands"), "https://tunera.com.tr/en/brands");
  assert.equal(canonicalUrl("en", "contact"), "https://tunera.com.tr/en/contact");
});

test("hreflangMap always includes tr-TR, en and x-default", () => {
  for (const key of SEO_ROUTE_KEYS) {
    const map = hreflangMap(key);
    assert.deepEqual(Object.keys(map).sort(), ["en", "tr-TR", "x-default"]);
    assert.equal(map["tr-TR"], canonicalUrl("tr", key));
    assert.equal(map.en, canonicalUrl("en", key));
    assert.equal(map["x-default"], canonicalUrl(siteConfig.defaultLocale, key));
  }
});

test("allCanonicalUrls returns six URLs (3 keys x 2 locales)", () => {
  const urls = allCanonicalUrls();
  assert.equal(urls.length, 6);
  const seen = new Set(urls.map((entry) => entry.url));
  assert.equal(seen.size, 6, "every canonical url must be unique");
});

test("canonical inventory excludes redirect-only and internal routes", () => {
  const urls = allCanonicalUrls().map((entry) => entry.url);
  const banned = [
    // redirect-only legacy paths
    "/markalar",
    "/iletisim",
    "/hizmetler",
    "/hakkimizda",
    "/tr/hakkimizda",
    "/tr/hizmetler",
    "/en/about",
    "/en/services",
    // internal surfaces
    "/admin/analytics",
    "/admin/analytics/export",
    "/api/analytics/event",
    "/_next/static/foo",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];
  for (const path of banned) {
    const full = `${siteConfig.baseUrl}${path}`;
    assert.equal(urls.includes(full), false, `unexpected sitemap entry: ${full}`);
  }
});

test("SEO_ROUTES is locked to the three canonical keys", () => {
  assert.deepEqual(Object.keys(SEO_ROUTES.tr).sort(), ["brands", "contact", "home"]);
  assert.deepEqual(Object.keys(SEO_ROUTES.en).sort(), ["brands", "contact", "home"]);
});
