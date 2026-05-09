import Image from "next/image";
import { ImageReveal } from "@/components/ImageReveal";

export type ServicePanelSide = "left" | "right";

type Props = {
  /** Zero-based position; rendered as 01..0N. */
  index: number;
  /** Total sections — used to render "0N / 0M" in the kicker. */
  total: number;
  /** Short brand-index label (e.g. "Temsil", "Service"). */
  kicker: string;
  title: string;
  description: string;
  note: string | null;
  image: string;
  imageAlt: string;
  /** Which side the floating copy panel sits on at lg+. */
  panelSide: ServicePanelSide;
  /** Optional CSS object-position to keep the subject visible. */
  imagePosition?: string;
};

/**
 * Immersive, full-bleed editorial service section.
 *
 * Each section is `min-h-[100svh]` and uses the matched illustration
 * as a true full-width background. A graphite gradient fades from the
 * panel side toward the opposite side so the floating copy stays
 * legible without darkening the whole image. The panel itself is a
 * tinted graphite card with a thin orange ring; on mobile it stacks
 * to the bottom of the section regardless of `panelSide`, with a
 * stronger bottom-up gradient to keep contrast.
 *
 * Motion is wholly CSS-driven and gated on `data-revealed="true"` set
 * by `<ImageReveal>` once the section enters the viewport — the
 * background eases from `scale(1.04) → 1` and the panel lifts and
 * fades in. Reduced-motion settles everything immediately.
 */
export function ServiceStorySection({
  index,
  total,
  kicker,
  title,
  description,
  note,
  image,
  imageAlt,
  panelSide,
  imagePosition,
}: Props) {
  const indexLabel = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  const panelJustify = panelSide === "right" ? "lg:justify-end" : "lg:justify-start";

  // Gradient direction depends on which side the panel anchors to so
  // the dark fade always sits under the panel and the imagery stays
  // open on the opposite side. Mobile relies on the bottom-up overlay
  // since the panel always stacks to the bottom on small screens.
  const sideGradient =
    panelSide === "right"
      ? "bg-gradient-to-l from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0"
      : "bg-gradient-to-r from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0";

  return (
    <ImageReveal className="tunera-service-story relative isolate block overflow-hidden bg-tunera-graphite text-tunera-ivory">
      <section
        aria-label={title}
        className="relative isolate min-h-[100svh] w-full overflow-hidden"
      >
        {/* Full-bleed illustration. `fill` keeps the grid honest at all
            viewport heights; `priority` is intentionally off so the
            browser lazy-loads each section as the user scrolls. */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="tunera-service-image object-cover"
            style={{ objectPosition: imagePosition ?? "center" }}
          />
          {/* Side gradient — only visible at lg+, where the panel
              anchors to one side. */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 hidden lg:block ${sideGradient}`}
          />
          {/* Bottom-up gradient — used on mobile/tablet where the panel
              stacks to the bottom of the section. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/85 via-tunera-graphite/15 to-transparent lg:hidden"
          />
        </div>

        {/* Floating copy panel. Stacks to the bottom on mobile, anchors
            to the configured side at lg+, vertically centered. */}
        <div
          className={`relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-end px-6 py-20 sm:px-8 sm:py-24 lg:items-center ${panelJustify}`}
        >
          <div className="tunera-service-panel w-full max-w-md rounded-md border border-tunera-orange/30 bg-tunera-graphite/82 p-7 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.55)] backdrop-blur-md sm:p-9">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                {kicker}
              </span>
            </div>
            <div className="mt-4 text-[11px] font-medium tabular-nums tracking-[0.22em] text-tunera-orange/80">
              {indexLabel}
              <span className="text-tunera-ivory/40"> / {totalLabel}</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.1] tracking-tighter2 text-tunera-ivory sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-tunera-ivory/85 sm:text-[15px] sm:leading-[1.7]">
              {description}
            </p>
            {note ? (
              <p className="mt-6 border-t border-tunera-ivory/15 pt-4 text-xs leading-relaxed text-tunera-ivory/65">
                {note}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </ImageReveal>
  );
}
