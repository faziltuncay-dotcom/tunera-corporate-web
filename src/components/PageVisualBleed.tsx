import { ImageReveal } from "@/components/ImageReveal";
import { ResponsiveBrandImage, type BrandImageSlug } from "@/components/ResponsiveBrandImage";
import { panelPlacementClasses, type PanelPlacement } from "@/lib/visualComposition";

type Props = {
  /** Brand image slug — picked up from `optimized/{slug}-{w}w.{avif|webp|jpg}`. */
  slug: BrandImageSlug;
  imageAlt: string;
  /**
   * Image-aware panel placement at lg+. Defaults to "left" — but
   * each consumer should pick the placement that matches the safe
   * zone in its specific illustration so the panel never covers the
   * subject.
   */
  panelPlacement?: PanelPlacement;
  /**
   * Desktop / tablet (sm+) `object-position`. Each image has its own
   * focal point (boat, sun, dock); pick the value that keeps that
   * subject visible at the cinematic 16:9-ish desktop crop.
   */
  imagePosition?: string;
  /**
   * Mobile (sub-sm) `object-position`. The mobile container is
   * portrait-oriented so a centered desktop crop will often slide the
   * subject off-screen. Pick a value that keeps the boat / sun visible
   * at narrow viewports. Falls back to `imagePosition` if omitted.
   */
  imagePositionMobile?: string;
  /** Small uppercase label above the caption. */
  kicker?: string;
  /** Single short caption line that floats over the image. */
  caption?: string;
  /**
   * Section height. About / Brands / Contact use `tall` (≈70svh) so
   * the visual feels cinematic without dominating these calmer pages;
   * Services keeps its own 100svh treatment via ServicesStickyStory.
   */
  height?: "tall" | "full";
};

/**
 * Calm full-bleed editorial visual block.
 *
 * Used between `<PageHero>` and the page narrative on About, Brands,
 * and Contact so each route gets a strong full-page visual moment
 * without duplicating the title/lead already in the hero.
 *
 * Composition split by breakpoint:
 *
 *   - **lg+** — original full-bleed editorial: image fills the
 *     section, the kicker + caption panel floats over a safe zone via
 *     `panelPlacement` and a side gradient. The 4K marine illustration
 *     carries the page emotionally.
 *
 *   - **sub-lg** — image and caption are intentionally separated. The
 *     image gets its own clean cinematic strip (no overlay, no panel,
 *     soft bottom-fade only), then a short caption block sits in
 *     ivory underneath with a subtle Tunera wave motif. This stops
 *     burying the marine art under text on portrait-oriented mobile
 *     viewports while keeping the editorial / brand language premium.
 *
 * Image delivery is handled by `<ResponsiveBrandImage>`, which emits
 * a `<picture>` with AVIF / WebP / JPG sources pointing at the
 * prebuilt variants under `/assets/brand/web/optimized/`.
 *
 * Motion sources:
 *
 *   - `<ImageReveal>` outer — `data-revealed` triggers the
 *     `tunera-service-image` scale-down on first viewport entry.
 *   - `tunera-image-wave-breathe` inner wrapper — continuous ±0.5%
 *     horizontal drift over 24 s so the painted waves feel alive.
 *   - `tunera-service-panel` — soft lift and fade-in for the desktop
 *     overlay panel only.
 *
 * Reduced motion: every transform is removed; content stays visible.
 */
export function PageVisualBleed({
  slug,
  imageAlt,
  panelPlacement = "left",
  imagePosition,
  imagePositionMobile,
  kicker,
  caption,
  height = "tall",
}: Props) {
  const mobileImageHeight =
    height === "full" ? "h-[60svh] min-h-[420px]" : "h-[52svh] min-h-[360px]";
  const desktopHeightClass = height === "full" ? "lg:min-h-[100svh]" : "lg:min-h-[80svh]";

  const { flexClass, gradientClass } = panelPlacementClasses(panelPlacement);
  const showPanel = Boolean(kicker || caption);

  return (
    <ImageReveal className="tunera-service-story relative isolate block bg-tunera-graphite text-tunera-ivory">
      {/* MOBILE / TABLET (< lg) — image on top, caption block below. */}
      <div className="block lg:hidden">
        <section
          aria-hidden={!showPanel}
          className={`relative w-full overflow-hidden ${mobileImageHeight}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="tunera-image-wave-breathe absolute inset-0">
              <ResponsiveBrandImage
                slug={slug}
                alt={imageAlt}
                sizes="100vw"
                fill
                objectPosition={imagePosition}
                objectPositionMobile={imagePositionMobile}
                imgClassName="tunera-service-image"
              />
            </div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tunera-graphite/55 to-transparent"
            />
          </div>
        </section>
        {showPanel ? (
          <section
            aria-label={kicker || caption}
            className="relative isolate overflow-hidden bg-tunera-ivory text-tunera-ink"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.05]"
            />
            <div className="relative mx-auto max-w-2xl px-6 py-10 sm:py-12">
              {kicker ? (
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                    {kicker}
                  </span>
                </div>
              ) : null}
              {caption ? (
                <p
                  className={`${kicker ? "mt-4" : ""} text-base leading-relaxed text-tunera-ink/85 sm:text-[17px] sm:leading-[1.55]`}
                >
                  {caption}
                </p>
              ) : null}
            </div>
          </section>
        ) : null}
      </div>

      {/* DESKTOP (lg+) — full-bleed editorial overlay. */}
      <section
        aria-hidden={!showPanel}
        className={`relative isolate hidden w-full overflow-hidden lg:block ${desktopHeightClass}`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="tunera-image-wave-breathe absolute inset-0">
            <ResponsiveBrandImage
              slug={slug}
              alt=""
              sizes="100vw"
              fill
              objectPosition={imagePosition}
              objectPositionMobile={imagePositionMobile}
              imgClassName="tunera-service-image"
            />
          </div>
          {showPanel ? (
            <div aria-hidden className={`pointer-events-none absolute inset-0 ${gradientClass}`} />
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/55 via-tunera-graphite/0 to-transparent"
            />
          )}
        </div>

        {showPanel ? (
          <div
            className={`relative z-10 mx-auto flex ${desktopHeightClass} max-w-6xl items-end px-6 py-16 sm:px-8 sm:py-20 ${flexClass}`}
          >
            <div className="tunera-service-panel w-full max-w-md rounded-md border border-tunera-orange/30 bg-tunera-graphite/88 p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-8">
              {kicker ? (
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                    {kicker}
                  </span>
                </div>
              ) : null}
              {caption ? (
                <p
                  className={`${kicker ? "mt-4" : ""} text-base leading-relaxed text-tunera-ivory/90 sm:text-lg sm:leading-[1.55]`}
                >
                  {caption}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}
      </section>
    </ImageReveal>
  );
}
