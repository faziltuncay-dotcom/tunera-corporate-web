# Brand integration notes (Phase 1E)

A single-pass log of how Phase 1E moved the corporate hub from a
generic premium marine shell to a Tunera-led identity.

## Source-of-truth files

The four required source PDFs were placed in `brand-input/` (a local
drop zone that is git-ignored) and then copied into the version-
controlled `brand/source/tunera/` folder with normalized filenames:

| Drop zone (ignored)      | Repo path (committed)                        |
| ------------------------ | -------------------------------------------- |
| `Tunera Renkli Logo.pdf` | `brand/source/tunera/tunera-renkli-logo.pdf` |
| `Tunera Logo.pdf`        | `brand/source/tunera/tunera-logo.pdf`        |
| `Tunera Desen.pdf`       | `brand/source/tunera/tunera-desen.pdf`       |
| `Tunera Amblem.pdf`      | `brand/source/tunera/tunera-amblem.pdf`      |

Source PDFs were copied byte-for-byte; they were not modified.

## Conversion method

Tool survey at the start of the phase:

| Tool             | Available?         | Used?                        |
| ---------------- | ------------------ | ---------------------------- |
| `qlmanage`       | Yes (macOS native) | **Yes** for raster           |
| Pillow (Python)  | Yes (11.3.0)       | **Yes** for crop / alpha key |
| `sips`           | Yes                | No                           |
| `pdftocairo`     | No                 | —                            |
| `pdftoppm`       | No                 | —                            |
| ImageMagick      | No                 | —                            |
| Inkscape         | No                 | —                            |
| `rsvg-convert`   | No                 | —                            |
| PyMuPDF (`fitz`) | No                 | —                            |

With no vector-PDF-to-SVG tool present (Inkscape, rsvg-convert, fitz
all missing), clean SVG extraction was not possible. The phase rule
allows high-resolution PNG as a fallback, so the pipeline is:

1. **Rasterize** each PDF with `qlmanage -t -s 3200 -o <tmp> <pdf>`.
   This is macOS-native, requires no install, and produces an opaque
   white-backgrounded RGBA PNG covering the entire PDF page.
2. **Crop to artwork bounds** with Pillow: diff against pure white,
   threshold the diff, take the bbox, crop with 24px padding.
3. **Alpha-key the white background** for the three black-on-white
   assets (logo, pattern, emblem) by feeding the inverted luminance
   into the alpha channel. RGB is then zeroed so the PNG compresses
   well. The color logo is **not** alpha-keyed — its orange field is
   the artwork.
4. **Derive a white wordmark variant** by replacing the RGB of the
   black wordmark with `(255,255,255)` while keeping its alpha mask.
   This preserves anti-aliased letterform edges.
5. **Downsize** the pattern (max edge 1400px) and emblem (max edge
   1600px) since both ship at low opacity. Logo wordmarks stay at
   1482×343 for retina-sharp rendering.
6. **Re-optimize** alpha-only PNGs by zeroing RGB after resize so
   compression stays good.

Final asset listing:

```
tunera-emblem.png:        201 KB   1600×812
tunera-logo-black.png:     22 KB   1482×343
tunera-logo-color.png:    306 KB   3094×771
tunera-logo-white.png:     22 KB   1482×343
tunera-pattern.png:       769 KB   1400×1216
```

Total brand payload: ~1.3 MB.

The pipeline lives in `scripts/convert-brand-assets.py` and is **not**
a build step. Re-run it manually after replacing source PDFs.

## What changed in the app

| Area             | Before (Phase 1D)                            | After (Phase 1E)                                                                                   |
| ---------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Background       | navy-950 (`#06121f`)                         | tunera-ivory (`#FFF7F0`)                                                                           |
| Body text        | ink-50 on dark                               | tunera-ink on light                                                                                |
| Accent           | sunset-500 (`#e8804a`)                       | tunera-orange (`#FF4D00`)                                                                          |
| Header logo      | text "Tunera Denizcilik"                     | actual `tunera-logo-black.png` wordmark                                                            |
| Hero             | single column with subtle radial gradient    | 7/5 asymmetric split with orange brand panel using pattern + white wordmark                        |
| Brand cards      | dark glass cards                             | white cards with orange top rule on active                                                         |
| Service cards    | dark glass cards                             | white cards with orange index marker                                                               |
| Contact CTA      | dark band (already)                          | graphite band with subtle inverted emblem watermark                                                |
| Footer           | navy with quick links                        | graphite with white wordmark, quick links, inverted emblem watermark                               |
| Service title #4 | "Customer communication / Müşteri İletişimi" | "Customer Guidance & Process Coordination / Müşteri Yönlendirme ve Süreç Koordinasyonu" (per spec) |

Tailwind config palette was fully replaced. `navy.*` and `sunset.*`
no longer exist as tokens; every component now uses `tunera.*`.

## Constraints honored

- No new runtime dependencies. Pillow already exists on the dev
  machine; `qlmanage` is system-native; both are conversion-only and
  do not appear in `package.json`.
- No online conversion services were used.
- No external imagery, scraped assets, or invented brand artwork.
- Logo proportions and colors are preserved exactly from the source
  PDFs; no manual tracing was performed.
- The color logo (`tunera-logo-color.png`) is included in the asset
  bundle but held in reserve — see `tunera-brand-system.md` for
  rationale.
- Pre-launch noindex/nofollow and `/robots.txt` Disallow are
  unchanged.
