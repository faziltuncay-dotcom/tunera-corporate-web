# Pre-launch checklist

Items that must be reviewed and updated before the Tunera Corporate Web
site goes live. None of these are part of Phase 1C implementation —
this document exists so the deferred work is visible and traceable.

## Single source of truth

Most items below are gated on flags in `src/config/launch.ts`. Updating
that file should be the entry point for go-live. Search for `TODO(launch)`
in the codebase to find every spot that depends on a pre-launch flag.

## Brand assets

- [ ] Replace any placeholder typography with the final Tunera wordmark or
      logomark when artwork is delivered. (The current header uses the
      legal name as text; no logo file exists in the repo.)
- [ ] Confirm Granfort logo / typography is sourced from the Granfort web
      app rather than copied here.
- [ ] Confirm Ranieri brand assets do not appear before official approval.

## Contact channels (`src/config/launch.ts` → `contact`)

- [ ] Final corporate email
- [ ] Final corporate phone
- [ ] Final corporate address
- [ ] Set `contact.isFinalized = true`

While `contact.isFinalized` is `false`, the contact page renders a
polished "to be shared before launch" placeholder with a single
disclosure note at the bottom. Do **not** add a contact form or any
"send" affordance — those are explicitly out of scope.

## Brand URLs

### Granfort (`src/config/launch.ts` → `granfort`)

- [ ] Final production Granfort URL
- [ ] Set `granfort.isProduction = true`

While `granfort.isProduction` is `false`, the brand card displays a
"Development link" badge. Do not delete or hide this badge as long as
the URL points to a non-production host.

### Ranieri (`src/config/launch.ts` → `ranieri`)

- [ ] Decide whether Ranieri gets its own URL pre-launch or stays as
      "Coming soon" through go-live
- [ ] If it gets a URL, populate `ranieri.url` and update the brand card
      copy

## SEO go-live (`src/config/launch.ts` → `launch`)

- [ ] Stakeholder sign-off on go-live SEO
- [ ] Set `launch.isPreLaunch = false`
- [ ] Set `launch.allowIndexing = true`
- [ ] Verify `/robots.txt` switches from `Disallow: /` to `Allow: /`
- [ ] Verify the `<meta name="robots">` tag in the root layout switches
      from `noindex,nofollow` to `index,follow`
- [ ] Decide whether to add a sitemap. **Not in scope today.** If added,
      include it on this checklist with explicit approval.
- [ ] Decide whether to add analytics. **Not in scope today.**

## Copy and content review

- [ ] Turkish copy review by stakeholders
- [ ] English copy review by stakeholders
- [ ] Re-run the forbidden-phrase grep (see verification section)
- [ ] Confirm no unsupported claims about dealer counts, country counts,
      awards, certifications, official distributor status, warranty
      terms, delivery dates, stock, prices, response SLAs, quote IDs,
      CRM routing, Odoo sync, or email confirmations

## Legal / footer

- [ ] Decide whether KVKK / privacy / terms pages are needed pre-launch
- [ ] Confirm legal entity name in footer is final
- [ ] Confirm copyright year auto-renders correctly at launch

## Visual / responsive QA

- [ ] Mobile QA at common widths (≤400px, 600–768px)
- [ ] Tablet QA (768–1024px)
- [ ] Desktop QA (≥1280px)
- [ ] Keyboard navigation: Tab order, focus-visible ring, skip-to-content
      link works on every page
- [ ] Screen reader pass (VoiceOver / NVDA) — verify language switch and
      `<div lang="en">` wrapper correctly switch read-out language

## Optional structural improvements (deferred)

- [ ] Consider migrating from static `/tr` and `/en` folders to a
      `[locale]` dynamic segment so the root layout can set
      `<html lang>` per route. The current setup uses a per-page
      `<div lang>` wrapper which is HTML5-valid but not the canonical
      App Router pattern.
- [ ] Consider adding a unit/integration test framework. None exists
      today. Adding one will require dependency approval.

## Final verification before merging the launch commit

Run from the repo root:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
# Optional once tests exist:
# pnpm test
```

Then start the dev server and smoke-test every route in
`docs/route-inventory.md`. Every public route must return HTTP 200.

```sh
pnpm dev &
for r in / /tr /en /markalar /tr/markalar /en/brands /iletisim /tr/iletisim /en/contact; do
  echo "$r => $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3010$r)"
done
```

Final `git status --short` must be empty before the launch commit lands.

## Out of scope for the pre-launch commit

These are explicitly **not** part of go-live:

- CMS, database, backend, CRM, Odoo, email automation
- Contact form, fake form submission, fake success state
- Quote engine, pricing, stock/availability
- Customer portal, newsletter
- Analytics, payment/deposit
- Production sitemap submission, go-live SEO automation beyond the flag
- External imagery, scraped brand assets, downloaded logos
- New UI library or animation library
- Additional public routes beyond those in `route-inventory.md`
