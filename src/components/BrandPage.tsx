import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { SectionTransition } from "@/components/SectionTransition";
import { BrandCard } from "@/components/BrandCard";
import { Section } from "@/components/Section";
import { CtaTransition } from "@/components/CtaTransition";
import { SmoothAnchorNav } from "@/components/SmoothAnchorNav";
import { brands, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * Standalone Brand page for /tr/markalar and /en/brands.
 *
 * Replaces the previous homepage `#markalar` section. The earlier
 * version layered a PageHero + PageVisualBleed + a three-stage scroll
 * narrative whose first stage repeated the section description verbatim
 * (the "01 — Türkiye Temsilciliği" block). On a dedicated page the
 * scroll narrative would just re-state what the hero already says, so
 * it's gone — replaced with the editorial visual + a single clean
 * grid of the two brand cards (Granfort active, Ranieri planned).
 *
 *   PageHero        — eyebrow, page title, brand-area description
 *   PageVisualBleed — full-bleed brands-passing illustration with its
 *                     own kicker / caption (no overlay duplication)
 *   Section         — Granfort + Ranieri BrandCard grid; cards stack
 *                     to one column at sub-md
 *
 * The dedicated route also stops requiring the hero to scroll the user
 * back to a homepage anchor, so header / hero CTAs route here directly.
 */
export function BrandPage({ locale }: Props) {
  const t = copy(locale);
  const b = t.brandsSection;
  const granfort = brands.find((x) => x.id === "granfort")!;
  const ranieri = brands.find((x) => x.id === "ranieri")!;

  return (
    <div lang={locale}>
      <SmoothAnchorNav />
      <Header locale={locale} />
      <main id="main">
        <PageHero eyebrow={b.title} title={b.title} lead={b.description} headingLevel="h1" />
        <PageVisualBleed
          slug={b.pageVisual.slug}
          imageAlt={b.pageVisual.imageAlt}
          kicker={b.pageVisual.kicker}
          caption={b.pageVisual.caption}
          panelPlacement="top-right"
          imagePosition="center 60%"
          imagePositionMobile="60% 60%"
        />

        <SectionTransition />

        <Section tight>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
            <BrandCard
              locale={locale}
              id={granfort.id}
              name={granfort.name}
              status={granfort.status}
              href={granfort.href}
              external={granfort.external}
              isProduction={granfort.isProduction}
            />
            <BrandCard
              locale={locale}
              id={ranieri.id}
              name={ranieri.name}
              status={ranieri.status}
              href={ranieri.href}
              external={ranieri.external}
              isProduction={ranieri.isProduction}
            />
          </div>
        </Section>

        {/* Compact pre-footer routing bridge — single İletişim button.
            No maps, no addresses, no firma bilgileri (those live on the
            dedicated Contact page and in the footer respectively). */}
        <CtaTransition
          eyebrow={b.transitionCta.eyebrow}
          title={b.transitionCta.title}
          body={b.transitionCta.body}
          primary={{ label: b.transitionCta.primaryLabel, href: b.transitionCta.primaryHref }}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
