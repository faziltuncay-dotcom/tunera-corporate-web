#!/usr/bin/env node
//
// seo-smoke.mjs — Phase SEO 1.0 supplementary smoke.
//
// Hits the canonical public routes plus /robots.txt and
// /sitemap.xml on a locally-running production server and reports
// the status code, page title, and presence of canonical / OG /
// hreflang / robots meta tags.
//
// This script is intentionally small and uses only Node built-ins
// (no fetch wrapper, no HTML parser dependency). It is a sanity
// check, not a replacement for the production verification flow
// in docs/seo.md.
//
// Usage:
//   PORT=3100 pnpm start &
//   pnpm seo:smoke
//
// Override the base URL by setting SMOKE_BASE_URL. Exits non-zero
// if any required tag is missing on a 200 page so the script can
// gate CI later if needed.

const BASE = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3100";

const HTML_ROUTES = [
  { path: "/", expectStatus: 200 },
  { path: "/tr", expectStatus: 200 },
  { path: "/en", expectStatus: 200 },
  { path: "/tr/markalar", expectStatus: 200 },
  { path: "/en/brands", expectStatus: 200 },
  { path: "/tr/iletisim", expectStatus: 200 },
  { path: "/en/contact", expectStatus: 200 },
];

const TEXT_ROUTES = [
  { path: "/robots.txt", expectStatus: 200, mustInclude: ["sitemap.xml"] },
  { path: "/sitemap.xml", expectStatus: 200, mustInclude: ["<urlset"] },
];

// Admin routes must reject without auth. The exact status depends on
// the deployment env: when ADMIN_ANALYTICS_USERNAME / _PASSWORD are
// set (production) the middleware returns 401 with WWW-Authenticate;
// when those envs are missing (local smoke) the middleware fails
// closed with 503. Both are "blocked" — either is a pass.
const ADMIN_ROUTES = [
  { path: "/admin/analytics", expectStatus: [401, 503] },
  { path: "/admin/analytics/export?range=30d", expectStatus: [401, 503] },
];

async function fetchText(path) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual" });
  const body = res.status === 200 ? await res.text() : "";
  return { status: res.status, body };
}

const findFirst = (html, re) => {
  const m = re.exec(html);
  return m ? m[1] : null;
};

const inspectHtml = (html) => {
  const title = findFirst(html, /<title>([^<]*)<\/title>/i);
  const description = findFirst(html, /<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = findFirst(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const robots = findFirst(html, /<meta\s+name="robots"\s+content="([^"]*)"/i);
  const ogTitle = findFirst(html, /<meta\s+property="og:title"\s+content="([^"]*)"/i);
  const ogDescription = findFirst(html, /<meta\s+property="og:description"\s+content="([^"]*)"/i);
  const ogImage = findFirst(html, /<meta\s+property="og:image"\s+content="([^"]*)"/i);
  const twitterCard = findFirst(html, /<meta\s+name="twitter:card"\s+content="([^"]*)"/i);
  const hreflangCount = (html.match(/<link\s+rel="alternate"\s+hreflang=/gi) ?? []).length;
  const hasOrganizationLd = /"@type":"Organization"/.test(html);
  const hasWebsiteLd = /"@type":"WebSite"/.test(html);
  return {
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    hreflangCount,
    hasOrganizationLd,
    hasWebsiteLd,
  };
};

const REQUIRED_HTML_KEYS = [
  "title",
  "description",
  "canonical",
  "robots",
  "ogTitle",
  "ogDescription",
  "ogImage",
  "twitterCard",
];

const failures = [];

console.log(`SEO smoke against ${BASE}\n`);

console.log("# HTML routes");
for (const route of HTML_ROUTES) {
  const { status, body } = await fetchText(route.path);
  if (status !== route.expectStatus) {
    failures.push(`${route.path}: status ${status} (expected ${route.expectStatus})`);
    console.log(`  ${route.path.padEnd(20)} status=${status} ✗`);
    continue;
  }
  const info = inspectHtml(body);
  const missing = REQUIRED_HTML_KEYS.filter((key) => !info[key]);
  if (info.hreflangCount < 3) missing.push(`hreflang(${info.hreflangCount}/3)`);
  if (!info.hasOrganizationLd) missing.push("org-jsonld");
  if (!info.hasWebsiteLd) missing.push("website-jsonld");
  const tag = missing.length === 0 ? "✓" : `✗ missing=${missing.join(",")}`;
  if (missing.length > 0) failures.push(`${route.path}: ${tag}`);
  console.log(`  ${route.path.padEnd(20)} status=${status} ${tag}`);
  console.log(`    title:     ${info.title ?? "(none)"}`);
  console.log(`    canonical: ${info.canonical ?? "(none)"}`);
  console.log(`    robots:    ${info.robots ?? "(none)"}`);
  console.log(`    hreflang:  ${info.hreflangCount} link(s)`);
}

console.log("\n# Text routes");
for (const route of TEXT_ROUTES) {
  const { status, body } = await fetchText(route.path);
  let tag = "✓";
  if (status !== route.expectStatus) {
    tag = `✗ status=${status}`;
    failures.push(`${route.path}: status ${status} (expected ${route.expectStatus})`);
  } else {
    for (const needle of route.mustInclude ?? []) {
      if (!body.includes(needle)) {
        tag = `✗ missing="${needle}"`;
        failures.push(`${route.path}: missing "${needle}"`);
        break;
      }
    }
  }
  console.log(`  ${route.path.padEnd(20)} status=${status} ${tag}`);
}

console.log("\n# Admin routes (must reject without auth)");
for (const route of ADMIN_ROUTES) {
  const res = await fetch(`${BASE}${route.path}`, { redirect: "manual" });
  const expected = Array.isArray(route.expectStatus) ? route.expectStatus : [route.expectStatus];
  let tag = "✓";
  if (!expected.includes(res.status)) {
    tag = `✗ status=${res.status} (expected one of ${expected.join("/")})`;
    failures.push(`${route.path}: status ${res.status} (expected one of ${expected.join("/")})`);
  }
  console.log(`  ${route.path.padEnd(35)} status=${res.status} ${tag}`);
}

if (failures.length > 0) {
  console.log(`\nseo:smoke FAILED (${failures.length} issue(s)):`);
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log("\nseo:smoke OK");
