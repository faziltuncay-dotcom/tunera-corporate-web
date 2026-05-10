# Claude Code prompt — wire the new responsive marine assets into the site

Paste the block below into Claude Code (`claude` in the project root) when you
want it to integrate the new image set across the site.

---

```
You are working in the Tunera corporate website repo.

A new responsive image set has been generated under
`public/assets/brand/web/optimized/`. The 4K PNG masters live one level up at
`public/assets/brand/web/<slug>.png` and must NOT be referenced from
production HTML — they exist only as a re-encoding source.

Naming convention for variants:
  {slug}-{width}w.{avif|webp|jpg}
Widths: 640, 1280, 1920, 2560, 3840 (16:9, 1.778:1)
Formats (preferred order): AVIF -> WebP -> JPG fallback

Slug -> intended placement:
  hero-marine-pair        : homepage hero (above the fold)
  about-coastal           : /about hero or feature image
  brands-passing          : /brands or brands strip section
  contact-horizon         : /contact hero
  service-advisory        : /services/advisory card + hero
  service-maintenance     : /services/maintenance card + hero
  service-representation  : /services/representation card + hero
  service-storage         : /services/storage card + hero
  service-trailer         : /services/trailer card + hero
  service-yard            : /services/yard card + hero

Tasks, in order:

1. Audit. Locate every <img>, background-image, Next.js <Image>, Astro
   <Picture>, or component that currently points at any file under
   `public/assets/brand/web/`. Report the list before editing.

2. Refactor each occurrence to use a <picture> element (or the framework
   equivalent) with three <source>/srcset blocks: AVIF, WebP, JPG fallback.
   Always include explicit width=3840 height=2160 to lock aspect ratio and
   prevent CLS. Use `sizes` that reflects the actual layout — full-bleed hero
   = "100vw", half-width card = "(min-width: 1024px) 50vw, 100vw", 3-column
   service grid = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw".

3. Loading hints:
   - Above-the-fold hero (`hero-marine-pair`, page-level hero images):
       loading="eager" fetchpriority="high" decoding="async"
   - Everything below the fold:
       loading="lazy" decoding="async"

4. If the project uses Next.js, prefer `next/image` with the local loader and
   pass the JPG variant as `src` plus `placeholder="blur"` when feasible. Do
   NOT regenerate variants — use the prebuilt files as static assets via a
   custom loader or by setting `unoptimized` on these images so Next does not
   re-encode them.
   If the project uses Astro, use `<Picture>` from `astro:assets` with the
   prebuilt files, again without re-encoding.
   If the project is plain HTML/Vite/React without an image pipeline, output
   raw <picture> markup as shown in the README.

5. Replace any old PNG/JPG paths that are no longer used, but keep the
   4K PNG masters in `public/assets/brand/web/` untouched.

6. Add or update `alt` attributes with concise, descriptive Turkish text that
   reflects the scene (e.g. "Gün batımında kıyıda seyir halinde Tunera
   tekneleri"). If existing alts are good, keep them.

7. Lighthouse-friendliness pass: ensure no hero image is `lazy`, every <img>
   has width/height, and CSS `object-fit: cover; object-position: center;` is
   applied where the container aspect ratio differs from 16:9.

8. After editing, run the project's existing typecheck/lint/build command and
   fix anything that breaks. Show me a short diff summary at the end and a
   list of pages that now consume the new assets.

Reference the file `public/assets/brand/web/optimized/README.md` for the full
sample <picture> markup and encoding details. Do not regenerate the optimized
files — they are already present.
```

---

## Quick spot-check after Claude Code finishes

```bash
# every reference to a master PNG should now be either gone or only inside
# build scripts / docs — never in components or HTML
git grep -nE "brand/web/[^/]+\.png" -- ':!public/assets/brand/web' \
  ':!**/optimized/**'

# every consumer should be inside a <picture> or framework equivalent
git grep -nE "brand/web/optimized/" | head -40
```
