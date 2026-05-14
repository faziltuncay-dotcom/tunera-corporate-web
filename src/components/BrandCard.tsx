import Image from "next/image";
import { copy, type Locale } from "@/content/site";
import { TrackedLink } from "@/components/analytics/TrackedLink";

type Props = {
  locale: Locale;
  id: string;
  name: string;
  status: "active" | "coming-soon";
  href: string | null;
  external: boolean;
  /**
   * Whether the brand's dedicated site is in production. When `false`
   * (current state for both Granfort and Ranieri), the card never
   * renders an outbound link — it shows the "Marka web sitesi yakında"
   * inactive pill instead, regardless of the brand's `status`.
   */
  isProduction: boolean;
};

/**
 * Brand asset map for the brand cards.
 *
 * Files live in `public/assets/brand/{id}/`. Both entries point at
 * the colour PNG masters — the Granfort SVG variants in the same
 * folder carry an explicit `PLACEHOLDER — NOT the official
 * Granfort logo` header in their XML, so we use the colour PNG
 * which is the actual owner-provided master. A future asset pass
 * with real Granfort SVGs (or a Ranieri SVG) only needs to update
 * the path here; the call site does not change.
 *
 * Intrinsic widths and heights mirror the source files exactly so
 * Next/Image can reserve the box without layout shift on hydration.
 */
const BRAND_LOGOS: Record<
  string,
  { src: string; width: number; height: number; sizes: string } | undefined
> = {
  granfort: {
    src: "/assets/brand/granfort/granfort-logo-color.png",
    width: 2767,
    height: 771,
    sizes: "(min-width: 640px) 200px, 170px",
  },
  ranieri: {
    src: "/assets/brand/ranieri/ranieri-logo-color.png",
    width: 2560,
    height: 776,
    sizes: "(min-width: 640px) 200px, 170px",
  },
};

export function BrandCard({ locale, id, name, status, href, external, isProduction }: Props) {
  const t = copy(locale);
  const isActive = status === "active";
  const note = id === "granfort" ? t.brandsSection.granfortNote : t.brandsSection.ranieriNote;
  const statusLabel = isActive ? t.brandsSection.statusActive : t.brandsSection.statusComingSoon;
  const siteLive = isActive && !!href && isProduction;
  const logo = BRAND_LOGOS[id];

  return (
    <article
      aria-labelledby={`brand-${id}-title`}
      className="group relative flex h-full flex-col overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 transition-all hover:border-tunera-ink/30 hover:shadow-[0_8px_28px_-12px_rgba(35,31,32,0.18)] sm:p-9"
    >
      {isActive ? (
        <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
      ) : null}
      <div className="flex items-start justify-between gap-4">
        {logo ? (
          // Logo replaces the wordmark heading visually. The H3 is
          // kept in the DOM (sr-only) so the existing
          // `aria-labelledby` reference stays valid for screen
          // readers and the visual hierarchy upgrades from text to
          // brand mark for sighted users without an a11y regression.
          <>
            <Image
              src={logo.src}
              alt={`${name} logosu`}
              width={logo.width}
              height={logo.height}
              sizes={logo.sizes}
              className="h-9 w-auto sm:h-10"
            />
            <h3 id={`brand-${id}-title`} className="sr-only">
              {name}
            </h3>
          </>
        ) : (
          <h3
            id={`brand-${id}-title`}
            className="text-2xl font-semibold tracking-tighter2 text-tunera-ink sm:text-3xl"
          >
            {name}
          </h3>
        )}
        <span
          className={
            "inline-flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] " +
            (isActive
              ? "border-tunera-orange/30 bg-tunera-orange/5 text-tunera-orange"
              : "border-tunera-ink/15 text-tunera-muted-ink")
          }
        >
          {isActive ? (
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-tunera-orange" />
          ) : null}
          {statusLabel}
        </span>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-tunera-muted-ink sm:text-[15px]">{note}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        {siteLive ? (
          <TrackedLink
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            className="-mx-1 inline-flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-medium text-tunera-ink transition-colors hover:text-tunera-orange"
            trackEvent={external ? "brand_redirect_click" : "brand_card_click"}
            trackMetadata={{ brand: id, external }}
          >
            <span>{t.brandsSection.visit}</span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </TrackedLink>
        ) : (
          <span
            aria-disabled="true"
            className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/15 bg-tunera-sand/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-tunera-muted-ink"
          >
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-tunera-muted-ink/55"
            />
            {t.brandsSection.siteComingSoon}
          </span>
        )}
      </div>
    </article>
  );
}
