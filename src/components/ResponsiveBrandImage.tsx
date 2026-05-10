import type { CSSProperties } from "react";

/**
 * Brand visual slug — one of the 10 marine illustrations under
 * `public/assets/brand/web/optimized/`. The 4K PNG masters next to
 * that folder are kept as a single source of truth for re-encoding;
 * production HTML never links them directly. See the README at
 * `public/assets/brand/web/optimized/README.md`.
 */
export type BrandImageSlug =
  | "hero-marine-pair"
  | "about-coastal"
  | "brands-passing"
  | "contact-horizon"
  | "service-advisory"
  | "service-maintenance"
  | "service-representation"
  | "service-storage"
  | "service-trailer"
  | "service-yard";

const OPTIMIZED_BASE = "/assets/brand/web/optimized";
const WIDTHS = [640, 1280, 1920, 2560, 3840] as const;
const FALLBACK_WIDTH = 1920 as const;

/**
 * Cache-bust token for slugs whose master + variants were re-rendered
 * in place. Filenames stay the same (no broken references), but the
 * URL gains a `?v=…` query so CDN / browser caches don't serve the
 * stale bytes. Only the slugs in `REFRESHED_SLUGS` carry the token;
 * the untouched seven slugs keep their original URLs (no needless
 * cache miss). Bump the token whenever the same artwork is replaced
 * again.
 */
const CACHE_BUST_TOKEN = "2026-05-10";
const REFRESHED_SLUGS: ReadonlySet<BrandImageSlug> = new Set([
  "hero-marine-pair",
  "about-coastal",
  "service-yard",
]);

const versionSuffix = (slug: BrandImageSlug) =>
  REFRESHED_SLUGS.has(slug) ? `?v=${CACHE_BUST_TOKEN}` : "";

const buildSrcSet = (slug: BrandImageSlug, ext: "avif" | "webp" | "jpg") => {
  const v = versionSuffix(slug);
  return WIDTHS.map((w) => `${OPTIMIZED_BASE}/${slug}-${w}w.${ext}${v} ${w}w`).join(", ");
};

type Props = {
  /** Brand visual slug. Must match a file family in `optimized/`. */
  slug: BrandImageSlug;
  /** Meaningful alt text. Required. Pass empty string only for purely decorative duplicates. */
  alt: string;
  /** `sizes` attribute matching the actual layout (e.g. `"100vw"`, `"(min-width: 1024px) 50vw, 100vw"`). */
  sizes: string;
  /**
   * Above-the-fold marker. When true, sets `loading="eager"`,
   * `fetchPriority="high"` and `decoding="async"`. Use for the LCP
   * image only — not every below-fold image.
   */
  priority?: boolean;
  /**
   * When true, the picture absolutely fills its positioned parent
   * (`position: absolute; inset: 0`) and the inner img stretches
   * with `object-cover`. The parent must be `position: relative`
   * (or `absolute` / `fixed`) for this to work.
   */
  fill?: boolean;
  /**
   * Desktop / tablet `object-position`. Each illustration has its
   * own focal point (boat, sun, dock); pick the value that keeps
   * the subject visible at the cinematic 16:9-ish desktop crop.
   */
  objectPosition?: string;
  /**
   * Mobile `object-position` (applied below the `sm` breakpoint).
   * Falls back to `objectPosition` if omitted. The portrait mobile
   * container crops a centred desktop position aggressively, so this
   * is where each image's mobile crop is tuned to keep the subject
   * inside the visible window.
   */
  objectPositionMobile?: string;
  /** Extra className appended to the inner `<img>`. */
  imgClassName?: string;
  /** Extra className appended to the outer `<picture>`. */
  pictureClassName?: string;
};

/**
 * Responsive brand visual.
 *
 * Emits a `<picture>` with three `<source>` candidates — AVIF (smallest,
 * preferred), WebP (universal modern fallback), JPG (last-resort
 * fallback) — pointing at the prebuilt files under
 * `/assets/brand/web/optimized/`. The browser picks the best format
 * its decoder supports and the smallest variant that satisfies the
 * `sizes` hint, so a 4K monitor pulls the 3840w AVIF (≈ 128 KB) while
 * a 320 px phone pulls the 640w AVIF (≈ 12 KB) — without Next.js
 * re-encoding anything.
 *
 * Width and height attributes are explicitly set to the master
 * dimensions (3840 × 2160, 16:9) so the browser reserves the layout
 * box before any byte arrives, eliminating CLS on every page that
 * uses this component.
 *
 * Responsive `object-position` is supported via two CSS variables
 * (`--obj-d`, `--obj-m`) plus Tailwind arbitrary-property syntax
 * `[object-position:var(--obj-m)] sm:[object-position:var(--obj-d)]`.
 *
 * Reduced-motion users see the same static picture; the component
 * itself ships no animation.
 */
export function ResponsiveBrandImage({
  slug,
  alt,
  sizes,
  priority = false,
  fill = false,
  objectPosition,
  objectPositionMobile,
  imgClassName,
  pictureClassName,
}: Props) {
  const objPosDesktop = objectPosition ?? "center";
  const objPosMobile = objectPositionMobile ?? objPosDesktop;

  const objPosVars = {
    ["--obj-d"]: objPosDesktop,
    ["--obj-m"]: objPosMobile,
  } as CSSProperties;

  const pictureClasses = ["block", fill ? "absolute inset-0" : null, pictureClassName ?? null]
    .filter(Boolean)
    .join(" ");

  const imgClasses = [
    fill
      ? "h-full w-full object-cover [object-position:var(--obj-m)] sm:[object-position:var(--obj-d)]"
      : "h-auto w-full object-cover [object-position:var(--obj-m)] sm:[object-position:var(--obj-d)]",
    imgClassName ?? null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <picture className={pictureClasses}>
      <source type="image/avif" srcSet={buildSrcSet(slug, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={buildSrcSet(slug, "webp")} sizes={sizes} />
      <img
        src={`${OPTIMIZED_BASE}/${slug}-${FALLBACK_WIDTH}w.jpg${versionSuffix(slug)}`}
        srcSet={buildSrcSet(slug, "jpg")}
        sizes={sizes}
        width={3840}
        height={2160}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        alt={alt}
        className={imgClasses}
        style={objPosVars}
      />
    </picture>
  );
}
