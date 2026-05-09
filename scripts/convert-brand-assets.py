#!/usr/bin/env python3
"""
Convert Tunera brand PDFs into web-safe PNGs.

This script is the source of truth for how brand assets in
`public/assets/brand/tunera/` were generated. Re-run it when the source
PDFs in `brand/source/tunera/` change. It is not part of the build
pipeline and has no runtime dependency on the Next.js app.

Pipeline:
  1. `qlmanage -t -s 3200` rasterizes each PDF page into a high-res PNG
     (macOS-native, no external deps).
  2. Pillow trims each image to its visual bounds (drops PDF-page
     whitespace).
  3. For black-on-white assets (logo, pattern, emblem) the white
     background is keyed out via inverted-luminance alpha; RGB is then
     zeroed so the PNG compresses well.
  4. The color logo (orange + pattern + wordmark) is preserved intact;
     only its margin whitespace is cropped.
  5. A white wordmark variant is derived from the black wordmark by
     keeping its alpha channel and replacing RGB with pure white.
  6. Pattern and emblem are downsized so the on-the-wire payload stays
     reasonable; both are used at low opacity in the UI.

Requirements (all macOS-native or already on the dev machine):
  - qlmanage   (system /usr/bin/qlmanage)
  - python3 + Pillow

Usage:
  python3 scripts/convert-brand-assets.py

Output:
  public/assets/brand/tunera/{tunera-logo-black,tunera-logo-white,
                              tunera-logo-color,tunera-pattern,
                              tunera-emblem}.png
"""
from __future__ import annotations

import os
import shutil
import subprocess
import tempfile
from PIL import Image, ImageChops, ImageOps

REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.join(REPO_ROOT, "brand/source/tunera")
DST = os.path.join(REPO_ROOT, "public/assets/brand/tunera")

JOBS = [
    # (pdf_basename, render_size, output_name, transparent_white_to_alpha?)
    ("tunera-logo.pdf",        3200, "tunera-logo-black.png", True),
    ("tunera-desen.pdf",       3200, "tunera-pattern.png",    True),
    ("tunera-amblem.pdf",      3200, "tunera-emblem.png",     True),
    ("tunera-renkli-logo.pdf", 3200, "tunera-logo-color.png", False),
]

DOWNSIZE = {
    "tunera-pattern.png": 1400,
    "tunera-emblem.png": 1600,
}


def render_pdf(pdf_path: str, size: int, out_dir: str) -> str:
    subprocess.run(
        ["qlmanage", "-t", "-s", str(size), "-o", out_dir, pdf_path],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    return os.path.join(out_dir, os.path.basename(pdf_path) + ".png")


def crop_to_artwork(im: Image.Image, threshold: int = 8, pad: int = 24) -> Image.Image:
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg).convert("L").point(
        lambda p: 255 if p > threshold else 0
    )
    bbox = diff.getbbox()
    if bbox is None:
        return im
    l, t, r, b = bbox
    l = max(0, l - pad)
    t = max(0, t - pad)
    r = min(im.size[0], r + pad)
    b = min(im.size[1], b + pad)
    return im.crop((l, t, r, b))


def black_on_white_to_transparent(im: Image.Image) -> Image.Image:
    rgba = im.convert("RGBA")
    alpha = ImageOps.invert(rgba.convert("L"))
    zero = Image.new("L", rgba.size, 0)
    return Image.merge("RGBA", (zero, zero, zero, alpha))


def derive_white_wordmark(black_path: str, out_path: str) -> None:
    im = Image.open(black_path).convert("RGBA")
    _, _, _, alpha = im.split()
    full = Image.new("L", im.size, 255)
    Image.merge("RGBA", (full, full, full, alpha)).save(
        out_path, format="PNG", optimize=True
    )


def downsize(path: str, max_edge: int) -> None:
    im = Image.open(path)
    w, h = im.size
    scale = max_edge / max(w, h)
    if scale >= 1:
        return
    im = im.resize((int(w * scale), int(h * scale)), Image.LANCZOS)
    im.save(path, format="PNG", optimize=True)


def main() -> None:
    os.makedirs(DST, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        for pdf_name, size, out_name, transparent in JOBS:
            pdf_path = os.path.join(SRC, pdf_name)
            if not os.path.exists(pdf_path):
                raise SystemExit(f"missing source PDF: {pdf_path}")
            rendered = render_pdf(pdf_path, size, tmp)
            im = Image.open(rendered)
            im = crop_to_artwork(im)
            if transparent:
                im = black_on_white_to_transparent(im)
            out_path = os.path.join(DST, out_name)
            im.save(out_path, format="PNG", optimize=True)
            print(f"{pdf_name} -> {out_name}: {im.size}")

    derive_white_wordmark(
        os.path.join(DST, "tunera-logo-black.png"),
        os.path.join(DST, "tunera-logo-white.png"),
    )

    for name, edge in DOWNSIZE.items():
        downsize(os.path.join(DST, name), edge)
        # Re-apply alpha-only optimization for monochrome assets after resize
        path = os.path.join(DST, name)
        im = Image.open(path).convert("RGBA")
        _, _, _, alpha = im.split()
        zero = Image.new("L", im.size, 0)
        Image.merge("RGBA", (zero, zero, zero, alpha)).save(
            path, format="PNG", optimize=True
        )

    print("\nFinal asset listing:")
    for fn in sorted(os.listdir(DST)):
        p = os.path.join(DST, fn)
        print(f"  {fn}: {os.path.getsize(p):>8} bytes")


if __name__ == "__main__":
    main()
