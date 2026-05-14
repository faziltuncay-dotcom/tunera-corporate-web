# SEO

This document captures the technical SEO foundation introduced in
Phase SEO 1.0 — metadata strategy, route inventory, robots policy,
sitemap layout, structured data, and the manual Search Console
steps that need to happen by hand after go-live.

## Current indexing status

The corporate site is **noindex / nofollow** at the time of writing.

The flag that controls this is:

```ts
// src/config/launch.ts
export const launch = { allowIndexing: false } as const;
```

Two things read it:

- `src/app/robots.ts` — when `allowIndexing` is false the robots.txt
  emits `Disallow: /` for every user-agent. The sitemap reference is
  still emitted so the wiring is in place for go-live.
- `src/lib/seo/metadata.ts#robotsForCurrentLaunch()` — returns
  `noindex,nofollow,nocache` (with an explicit `googleBot` block of
  the same) and is set as the `robots` field on every page metadata
  object.

To turn the site fully indexable, flip `allowIndexing` to `true` in
`src/config/launch.ts` and redeploy. No other code change is needed
to enable indexing.

## Route inventory

Real, indexable pages — these live in `src/lib/seo/routes.ts` as the
`SEO_ROUTES` map and are the **only** URLs in the sitemap:

| Locale | Key     | Path           |
| ------ | ------- | -------------- |
| tr     | home    | `/tr`          |
| tr     | brands  | `/tr/markalar` |
| tr     | contact | `/tr/iletisim` |
| en     | home    | `/en`          |
| en     | brands  | `/en/brands`   |
| en     | contact | `/en/contact`  |

Special case:

- `/` — renders the TR home identically to `/tr`. Its metadata
  forces `<link rel="canonical" href="https://tunera.com.tr/tr">`
  so search engines consolidate the duplicate URL into `/tr`.
  `/` is intentionally **not** in the sitemap.

Redirect-only routes — these 307 to either the locale home or one
of the canonical pages above; they are intentionally absent from
both the SEO route map and the sitemap:

- `/markalar` → `/tr/markalar`
- `/iletisim` → `/tr/iletisim`
- `/hakkimizda` → `/tr#hakkimizda`
- `/hizmetler` → `/tr#hizmetler`
- `/tr/hakkimizda` → `/tr#hakkimizda`
- `/tr/hizmetler` → `/tr#hizmetler`
- `/en/about` → `/en#about`
- `/en/services` → `/en#services`

About / services are deliberately section anchors on the locale
home, not separate pages. They do not get their own canonical URL,
their own hreflang pair, or a sitemap entry.

Internal surfaces excluded from the sitemap and from indexing:

- `/admin/**` — HTTP Basic-gated by middleware, also `noindex`
- `/api/**` — JSON endpoints, also blocked by robots.txt at go-live
- `/_next/**` — framework assets

## Metadata strategy

All page-level metadata flows through two helpers:

- `siteRootMetadata()` — mounted from `src/app/layout.tsx`. Sets
  `metadataBase`, default OG image, applicationName, and the
  launch-gated robots policy.
- `buildPageMetadata(locale, key)` — used by every canonical page
  to set the page-specific title, description, canonical URL,
  hreflang languages, OG block, Twitter card, and robots policy.
- `buildRootIndexMetadata()` — special case for `/`, returns the
  TR home metadata so `/` canonicalises to `/tr`.

Page copy lives in `PAGE_COPY` inside `src/lib/seo/metadata.ts`:

| Page           | Title                                               |
| -------------- | --------------------------------------------------- |
| `/tr` and `/`  | Tunera Denizcilik &#124; Denizcilikte Yeni Dönem    |
| `/tr/markalar` | Markalar &#124; Tunera Denizcilik                   |
| `/tr/iletisim` | İletişim &#124; Tunera Denizcilik                   |
| `/en`          | Tunera Maritime &#124; A New Era in Marine Services |
| `/en/brands`   | Brands &#124; Tunera Maritime                       |
| `/en/contact`  | Contact &#124; Tunera Maritime                      |

Descriptions are written in human language at ~140–170 chars; no
keyword stuffing, no claims about pricing, dealer counts, awards,
SLAs, certifications, or stock.

## Canonical and hreflang

Every canonical page emits:

- `<link rel="canonical" href="https://tunera.com.tr/<path>">`
- `<link rel="alternate" hreflang="tr-TR" href=".../tr/...">`
- `<link rel="alternate" hreflang="en"    href=".../en/...">`
- `<link rel="alternate" hreflang="x-default" href=".../tr/...">`

`x-default` points at the TR locale because the bare `/` route
serves the TR home today.

## robots.txt

`src/app/robots.ts` produces `/robots.txt` from a single conditional:

- Pre-launch: `User-agent: *` / `Disallow: /` plus the sitemap URL
- Post-launch: `User-agent: *` / `Allow: /` plus
  `Disallow: /admin/`, `Disallow: /api/`, `Disallow: /_next/`,
  the sitemap URL, and a `Host` directive

robots.txt is not a security boundary. The `/admin/**` surface
stays HTTP-Basic-gated by middleware regardless.

## sitemap.xml

`src/app/sitemap.ts` produces `/sitemap.xml`. It is emitted in
**both** indexing states — the sitemap describes the canonical URL
structure even when the site is `noindex`, so go-live is a single
flag flip.

Each entry includes:

- `url`, `lastModified`, `changeFrequency`, `priority`
- `alternates.languages` for the TR/EN pair plus `x-default`

Priority and change frequency:

| Page    | Priority | Change frequency |
| ------- | -------- | ---------------- |
| home    | 1.0      | monthly          |
| brands  | 0.8      | monthly          |
| contact | 0.6      | yearly           |

## Open Graph and Twitter cards

Every canonical page sets:

- `og:title`, `og:description`, `og:url`, `og:site_name`,
  `og:type=website`, `og:locale` (`tr_TR` or `en_US`),
  `og:locale:alternate`, `og:image`
- `twitter:card=summary_large_image`, `twitter:title`,
  `twitter:description`, `twitter:image`

The image used is the existing site hero,
`/assets/brand/web/optimized/hero-marine-pair-1920w.jpg`. A
dedicated 1200×630 OG composition is **deferred** — see
"Deferred work" below.

## Structured data (JSON-LD)

Mounted once from `src/app/layout.tsx` via the `<JsonLd>` component:

- **Organization** — legal name, alternate name, URL, logo, email,
  description, both office postal addresses (Kartal management,
  Tuzla operations), `areaServed: TR`.
- **WebSite** — site name, alternate name, URL, supported languages.

What is intentionally **not** in the JSON-LD:

- `aggregateRating` / `review` — no public review system exists
- `award` / `certification` — none confirmed
- dealer counts, distribution coverage
- `openingHours` — not confirmed in copy
- `offer`, `priceSpecification` — no pricing surfaces exist
- 24/7 / instant-quote / response-SLA claims
- phone numbers — none currently published on the site

## Search Console — manual steps after go-live

These do **not** happen from code. Run them once, by hand, after
`launch.allowIndexing` is flipped to `true` and the production
deploy is verified.

1. Sign in at <https://search.google.com/search-console> with the
   account that should own the property.
2. Add a new property for `tunera.com.tr`.
   Prefer the **Domain** property type (DNS verification) so the
   record covers `https://tunera.com.tr` and any future
   subdomains. URL-prefix is acceptable as a fallback.
3. Complete the DNS or HTML verification flow.
4. In the property's left sidebar, open **Sitemaps** and submit:
   `https://tunera.com.tr/sitemap.xml`
5. Use **URL Inspection** on the canonical pages and request
   indexing for at least:
   - `https://tunera.com.tr/tr`
   - `https://tunera.com.tr/en`
   - `https://tunera.com.tr/tr/markalar`
   - `https://tunera.com.tr/en/brands`
   - `https://tunera.com.tr/tr/iletisim`
   - `https://tunera.com.tr/en/contact`
6. Confirm in the **Coverage** report after a few days that:
   - `/admin/**`, `/api/**`, `/_next/**` are not indexed
   - the redirect routes are recognised as 307s and not indexed
     as separate pages

A second pass with Bing Webmaster Tools follows the same flow if
needed.

## Deferred work

- **Dedicated OG image (1200×630)**. The current OG image reuses
  the site hero, which is 1920×1080 and does not match the
  Open Graph recommended ratio. A future asset pass should ship a
  purpose-built social card for both locales and update
  `siteConfig.defaultOgImage`.
- **Per-locale OG image**. Once a dedicated card exists, consider
  one variant per locale (`og:image` field overrides per page).
- **`BreadcrumbList` JSON-LD**. The site is shallow today (one
  level under each locale), so breadcrumbs are not yet justified.
- **`LocalBusiness` / `BoatDealer` JSON-LD types**. The base
  `Organization` block ships with both office addresses; a
  `LocalBusiness` upgrade should wait until opening hours and a
  public phone number can be confirmed by the owner.
- **Twitter `site` handle**. No official `@` handle is available
  to publish; the Twitter card therefore uses the generic
  `summary_large_image` layout without a site/creator handle.

## What this phase intentionally did **not** do

- Submit the sitemap to Search Console from code.
- Flip `launch.allowIndexing` to true.
- Add fake schema claims (awards, ratings, dealer counts, SLAs).
- Add paid-SEO meta tags (e.g. `keywords`, `news_keywords`).
- Add hidden keyword content anywhere in the rendered DOM.
- Touch any analytics, admin, or middleware behaviour.
- Touch the GRANFORT WEB APP repository.

## SEO smoke

Run after building locally:

```bash
PORT=3100 pnpm start &
pnpm seo:smoke
```

The smoke script (`scripts/seo-smoke.mjs`) hits the canonical
routes plus `/robots.txt` and `/sitemap.xml` and reports the
status code, page title, and presence of canonical/OG/hreflang
tags. It is supplementary — it does not replace the production
verification described above.
