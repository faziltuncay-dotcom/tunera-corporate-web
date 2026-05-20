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
  forces `<link rel="canonical" href="https://www.tunera.com.tr/tr">`
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

- `<link rel="canonical" href="https://www.tunera.com.tr/<path>">`
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
   record covers both `https://tunera.com.tr` and
   `https://www.tunera.com.tr` once the apex DNS fix below is
   complete. URL-prefix is acceptable as a fallback — if used,
   add the **`https://www.tunera.com.tr`** prefix that matches
   the current canonical baseUrl.
3. Complete the DNS or HTML verification flow.
4. In the property's left sidebar, open **Sitemaps** and submit:
   `https://www.tunera.com.tr/sitemap.xml`
5. Use **URL Inspection** on the canonical pages and request
   indexing for at least:
   - `https://www.tunera.com.tr/tr`
   - `https://www.tunera.com.tr/en`
   - `https://www.tunera.com.tr/tr/markalar`
   - `https://www.tunera.com.tr/en/brands`
   - `https://www.tunera.com.tr/tr/iletisim`
   - `https://www.tunera.com.tr/en/contact`
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

## Apex domain DNS fix (registrar-side, outside this repo)

The apex `tunera.com.tr` currently resolves to Google service IPs
(the `216.239.32.x` family) instead of Vercel, and the TLS
handshake fails outright — apex HTTPS is unreachable, apex HTTP
returns a `404` from `server: ghs`. The site is only reachable at
`www.tunera.com.tr`.

That mismatch was the most likely cause of the Instagram "link
not safe" / "güvenli değil" warning: Meta's `facebookexternalhit`
crawler was hitting `og:url = https://tunera.com.tr/...` and
failing the connection, which falls through to a reputation
warning. The immediate fix in this repo was to switch
`siteConfig.baseUrl` to `https://www.tunera.com.tr` so every
canonical URL, sitemap entry, OG URL, Twitter card URL,
hreflang link and JSON-LD URL resolves to the deployed app. That
unblocks social previews without waiting on DNS.

The proper long-term fix happens at the registrar:

1. Open the domain registrar's DNS panel for `tunera.com.tr`.
2. For the apex (`@`) record, point it at Vercel's anycast IP
   (currently `76.76.21.21`) — or use an `ALIAS` / `ANAME` record
   pointing at `cname.vercel-dns.com` if the registrar supports
   it (apex `CNAME` is not allowed by DNS spec).
3. Leave the existing `www` CNAME pointing at
   `cname.vercel-dns.com` untouched.
4. In the Vercel project settings, ensure both `tunera.com.tr` and
   `www.tunera.com.tr` are added as domains and that one is set as
   the primary; configure the redirect direction (typically
   apex → www, though either works as long as both terminate TLS
   at Vercel).
5. After DNS propagates, verify with:

   ```sh
   curl -sI https://tunera.com.tr/
   curl -sI https://www.tunera.com.tr/
   ```

   Both should return `HTTP/2 200` (or the chosen redirect chain)
   and present a valid Vercel certificate.

Once apex serves the app, canonical can stay on `www` (no SEO
work required, since the site is currently `noindex` and nothing
is indexed yet) or be moved back to apex by reverting
`siteConfig.baseUrl` in a single line.

## Security headers

The site sends a baseline of low-risk security headers from
`next.config.mjs` `headers()`:

| Header                   | Value                                                  |
| ------------------------ | ------------------------------------------------------ |
| `X-Content-Type-Options` | `nosniff`                                              |
| `Referrer-Policy`        | `strict-origin-when-cross-origin`                      |
| `X-Frame-Options`        | `DENY`                                                 |
| `Permissions-Policy`     | `camera=(), microphone=(), geolocation=(), payment=()` |

What is **not** sent from Next.js, and why:

- `Strict-Transport-Security` — Vercel already attaches HSTS
  (`max-age=63072000`) on every `www` response. Re-emitting from
  Next would duplicate without value, and the `preload` directive
  cannot be added until apex `tunera.com.tr` is repointed at
  Vercel (preload requires both apex and www to present a valid
  certificate; apex currently fails TLS).
- `Content-Security-Policy` — deferred. A strict CSP without a
  report-only pass risks breaking Next.js inline bootstrap
  scripts, the analytics consent banner inline styles, and Vercel
  deployment instrumentation. When tackled, expect a 1–2 day
  rollout: ship CSP-Report-Only first, collect violation reports
  from real traffic for 48–72 h, then promote to enforcing CSP.
- `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy`
  — deferred. They can interfere with Open Graph scrapers and
  embedded map tiles, and are not required for the link-safety
  signal we are aiming at in this phase.

## Robots / social crawler posture

There are two reasonable robots postures while the site is
pre-launch. The site currently runs Option 1. Switching to
Option 2 is a one-line change in `src/app/robots.ts` (or, more
cleanly, a new flag separate from `launch.allowIndexing`).

### Option 1 — Pre-launch private posture _(current)_

- `robots.txt` emits `User-agent: *` / `Disallow: /`
- Every page metadata sets `robots: noindex, nofollow, nocache`
  (with an explicit `googleBot` block of the same) via
  `robotsForCurrentLaunch()`
- Compliant search crawlers stay out entirely
- Social preview crawlers that respect `robots.txt` may also
  refuse to fetch, **but** in practice Meta's
  `facebookexternalhit` and the Instagram / Twitter preview
  crawlers ignore `robots.txt` for Open Graph fetching, so social
  previews usually still work as long as the OG URL itself
  resolves
- Safe default while go-live SEO sign-off is outstanding

### Option 2 — Public crawler access, still noindex

- `robots.txt` emits `User-agent: *` / `Allow: /` plus
  `Disallow: /admin/`, `Disallow: /api/`, `Disallow: /_next/`
- Page-level `<meta name="robots" content="noindex,nofollow,nocache">`
  remains in place via `robotsForCurrentLaunch()`
- Social preview crawlers that honour `robots.txt` can now fetch
  the page; Google still respects the page-level `noindex` when
  it crawls and will not index the URL
- This is **not** SEO go-live. `launch.allowIndexing` stays
  `false`. Search Console submission stays deferred.
- Useful when (a) the apex DNS fix is still pending and (b)
  there's evidence that a robots-respecting crawler is blocking
  link previews. Today, the suspected blocker is the apex URL
  failing TLS, not robots, so this switch is on hold.

## Instagram / social link safety checklist

When Instagram, Facebook, WhatsApp, Threads, or LinkedIn shows a
"link not safe" / "güvenli değil" warning on a Tunera URL, walk
the checklist below. Each step is a manual browser-side check —
do **not** automate scoring from code, and do not call external
APIs.

1. **Confirm apex and www both resolve.** Open both
   `https://tunera.com.tr/` and `https://www.tunera.com.tr/` in a
   private window. Either both should load the site, or apex
   should 308 to www (after the registrar-side fix). A TLS error,
   a `ghs` 404, or a certificate warning is an automatic fail —
   see "Apex domain DNS fix" above.
2. **Confirm `og:url` matches `siteConfig.baseUrl`.** View the
   page source of the shared URL and confirm
   `<meta property="og:url" content="https://www.tunera.com.tr/...">`
   resolves over HTTPS without a redirect through an unknown
   domain.
3. **Confirm `og:image` returns 200.** `curl -I` the OG image:

   ```sh
   curl -sI https://www.tunera.com.tr/assets/brand/web/optimized/hero-marine-pair-1920w.jpg
   ```

   Expect `HTTP/2 200` and `content-type: image/jpeg`.

4. **Re-scrape via the Meta Sharing Debugger.**
   <https://developers.facebook.com/tools/debug/>. Paste the
   shared URL, click "Scrape Again", and confirm the preview card
   renders. Fix any reported warnings before re-testing on
   Instagram itself, because Meta caches preview metadata for
   24–48 h.
5. **Re-scrape via the LinkedIn Post Inspector** if LinkedIn was
   affected: <https://www.linkedin.com/post-inspector/>.
6. **Check Google Safe Browsing status.**
   <https://transparencyreport.google.com/safe-browsing/search>.
   Test `https://tunera.com.tr` and `https://www.tunera.com.tr`.
   A clean status here is necessary but not sufficient — Meta
   maintains its own reputation system.
7. **Confirm no `http://` links survive.** A single mixed-content
   URL in shared metadata can trip warnings:

   ```sh
   grep -rn "http://" src public next.config.* 2>/dev/null \
     | grep -vE 'localhost|generated/promo-captures'
   ```

   Expect zero matches outside of the dev-only Granfort
   localhost reference and the promo-capture screenshot tool.

8. **Confirm no redirect chain through unknown domains.** Trace
   the link with `curl -sIL` and confirm every hop is on a
   `*.tunera.com.tr` or trusted Vercel domain — no URL
   shorteners, no `bit.ly`, no analytics-tracking domains
   wrapping the URL.
9. **Wait for reputation refresh.** A newly-registered domain or
   one that recently failed to load can be flagged for several
   days even after every technical signal is correct. Do not
   spam re-tests or wrap the URL in a shortener; let the
   reputation cache decay.
