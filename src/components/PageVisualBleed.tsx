import Image from "next/image";
import { ImageReveal } from "@/components/ImageReveal";
import { panelPlacementClasses, type PanelPlacement } from "@/lib/visualComposition";

type Props = {
  image: string;
  imageAlt: string;
  /**
   * Image-aware panel placement at lg+. Defaults to "left" — but
   * each consumer should pick the placement that matches the safe
   * zone in its specific illustration so the panel never covers the
   * subject.
   */
  panelPlacement?: PanelPlacement;
  /** CSS object-position to keep the subject visible. */
  imagePosition?: string;
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
 * without duplicating the title/lead already in the hero. The panel
 * stays intentionally compact — small kicker + one caption line — so
 * the visual carries the section emotionally and the text never
 * fights the imagery.
 *
 * Placement is image-aware: each consumer picks the safe zone for
 * its specific illustration (see `lib/visualComposition.ts`). The
 * lg+ side gradient and panel anchor follow the placement; mobile
 * always stacks the panel to the bottom with a stronger bottom-up
 * gradient so reading stays comfortable on small surfaces.
 *
 * Motion sources:
 *
 *   - `<ImageReveal>` outer — `data-revealed` triggers the
 *     `tunera-service-image` scale-down on first viewport entry.
 *   - `tunera-image-wave-breathe` inner wrapper — continuous ±0.5%
 *     horizontal drift over 24 s so the painted waves feel alive
 *     after the reveal settles.
 *   - `tunera-service-panel` — soft lift and fade-in for the copy
 *     panel, slightly delayed behind the image settle.
 *
 * Reduced motion: every transform is removed; content stays visible.
 */
export function PageVisualBleed({
  image,
  imageAlt,
  panelPlacement = "left",
  imagePosition,
  kicker,
  caption,
  height = "tall",
}: Props) {
  const heightClass = height === "full" ? "min-h-[100svh]" : "min-h-[70svh] sm:min-h-[80svh]";

  const { flexClass, gradientClass } = panelPlacementClasses(panelPlacement);
  const showPanel = Boolean(kicker || caption);

  return (
    <ImageReveal className="tunera-service-story relative isolate block overflow-hidden bg-tunera-graphite text-tunera-ivory">
      <section
        aria-hidden={!showPanel}
        className={`relative isolate ${heightClass} w-full overflow-hidden`}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="tunera-image-wave-breathe absolute inset-0">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="tunera-service-image object-cover"
              style={{ objectPosition: imagePosition ?? "center" }}
            />
          </div>
          {showPanel ? (
            <>
              <div
                aria-hidden
                className={`pointer-events-none absolute inset-0 hidden lg:block ${gradientClass}`}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/80 via-tunera-graphite/10 to-transparent lg:hidden"
              />
            </>
          ) : (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/55 via-tunera-graphite/0 to-transparent"
            />
          )}
        </div>

        {showPanel ? (
          <div
            className={`relative z-10 mx-auto flex ${heightClass} max-w-6xl items-end px-6 py-16 sm:px-8 sm:py-20 ${flexClass}`}
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
