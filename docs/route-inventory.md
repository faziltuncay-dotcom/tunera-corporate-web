# Route inventory

This document is the authoritative list of public routes for the Tunera
Corporate Web pre-launch site. All routes listed below are part of the
smoke-test contract — every entry must return HTTP 200 before any commit.

## Locale strategy

The site uses a **static** App Router structure (no `[locale]` dynamic
segment). Each locale has its own folder under `src/app/`. Turkish is the
default landing language; the site root and the legacy un-prefixed
Turkish routes both render the Turkish page.

| Locale | Prefix                | Notes                    |
| ------ | --------------------- | ------------------------ |
| TR     | `/tr` and `/` (alias) | Default landing language |
| EN     | `/en`                 | Mirrored sub-tree        |

> Note on `<html lang>`: the root layout hardcodes `lang="tr"` because
> per-route override of `<html lang>` is not directly available without
> restructuring under a `[locale]` dynamic segment. EN pages compensate
> by wrapping their content in `<div lang="en">`, which is HTML5-valid
> and respected by assistive technology. Switching to a `[locale]`
> segment is on the pre-launch checklist.

## Public routes

| Route            | Locale | Page     | Purpose                                | Smoke required |
| ---------------- | ------ | -------- | -------------------------------------- | -------------- |
| `/`              | TR     | Home     | Default landing page                   | Yes            |
| `/tr`            | TR     | Home     | Explicit TR landing                    | Yes            |
| `/en`            | EN     | Home     | EN landing                             | Yes            |
| `/hakkimizda`    | TR     | About    | Corporate profile (alias of `/tr/...`) | Yes            |
| `/tr/hakkimizda` | TR     | About    | Corporate profile                      | Yes            |
| `/en/about`      | EN     | About    | Corporate profile                      | Yes            |
| `/markalar`      | TR     | Brands   | Brand list (alias of `/tr/markalar`)   | Yes            |
| `/tr/markalar`   | TR     | Brands   | Brand list                             | Yes            |
| `/en/brands`     | EN     | Brands   | Brand list                             | Yes            |
| `/hizmetler`     | TR     | Services | Service detail (alias of `/tr/...`)    | Yes            |
| `/tr/hizmetler`  | TR     | Services | Service detail                         | Yes            |
| `/en/services`   | EN     | Services | Service detail                         | Yes            |
| `/iletisim`      | TR     | Contact  | Contact details (alias of `/tr/...`)   | Yes            |
| `/tr/iletisim`   | TR     | Contact  | Contact details                        | Yes            |
| `/en/contact`    | EN     | Contact  | Contact details                        | Yes            |

## TR-facing aliases

Five route pairs render the same Turkish page:

- `/` and `/tr`
- `/hakkimizda` and `/tr/hakkimizda`
- `/markalar` and `/tr/markalar`
- `/hizmetler` and `/tr/hizmetler`
- `/iletisim` and `/tr/iletisim`

Both members of each pair must respond with HTTP 200. They render the
same component with `locale="tr"`.

## Generated / non-public routes

The Next.js build may emit additional internal routes that are **not**
part of the public smoke-test contract:

- `/_not-found` — auto-generated 404 handler.
- `/robots.txt` — pre-launch policy emitted by `src/app/robots.ts`. Not
  a page, but is part of smoke verification: must return 200 with a
  `Disallow: /` body while `launch.allowIndexing` is `false`.

## Smoke-test command

Start the dev server on port 3010 (matches `package.json` `dev` script)
and curl each route. Every public route in the table above must return
HTTP 200. Stop the server after smoke is complete.

```sh
pnpm dev &
# wait for ready
for r in / /tr /en \
         /hakkimizda /tr/hakkimizda /en/about \
         /markalar /tr/markalar /en/brands \
         /hizmetler /tr/hizmetler /en/services \
         /iletisim /tr/iletisim /en/contact; do
  echo "$r => $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3010$r)"
done
echo "/robots.txt => $(curl -s -o /dev/null -w '%{http_code}' http://localhost:3010/robots.txt)"
```

## Adding a new public route

1. Add the route to this table with locale, purpose, and smoke flag.
2. Add a metadata page-key to `src/content/metadata.ts` if the title
   needs a localized page-segment prefix.
3. Add metadata via `pageMetadata(locale, key)` from `@/content/metadata`.
4. Smoke test the new route alongside the existing fifteen.
5. Update `docs/pre-launch-checklist.md` if the route depends on a
   pre-launch decision.
