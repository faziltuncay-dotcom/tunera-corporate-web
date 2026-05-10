import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { BrandsScrollStory } from "@/components/BrandsScrollStory";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function BrandsPage({ locale }: Props) {
  const t = copy(locale);
  return (
    <div lang={locale}>
      <Header locale={locale} current="brands" />
      <main id="main">
        <PageHero
          eyebrow={t.brandsSection.title}
          title={t.brandsSection.title}
          lead={t.brandsSection.description}
        />

        {/* FULL-BLEED EDITORIAL VISUAL — two motoryachts passing,
            symbolising the brand-hub idea before the per-brand
            narrative below. */}
        {/*
          Image-aware placement: brands-passing has two boats in the
          horizontal mid-band, sun upper-right, decorative wave
          foreground bottom-left. Both boats are subjects, so the
          safest anchor is the bottom-right corner where the gradient
          and panel sit over calmer water rather than over the
          subject vessels.
        */}
        <PageVisualBleed
          image={t.brandsSection.pageVisual.image}
          imageAlt={t.brandsSection.pageVisual.imageAlt}
          kicker={t.brandsSection.pageVisual.kicker}
          caption={t.brandsSection.pageVisual.caption}
          panelPlacement="bottom-right"
          imagePosition="center center"
        />

        {/* SCROLL NARRATIVE — Brand hub with per-brand stages. Each
            stage embeds the same BrandCard previously rendered in the
            grid; the reduced-motion / mobile branch surfaces the same
            cards as a stacked column. */}
        <BrandsScrollStory locale={locale} />

        {/* CLOSING CTA — graphite anchor matching the page-end rhythm
            on Home/About/Services so the Brands route does not feel
            visibly shorter than the rest of the site. */}
        <div className="bg-tunera-graphite text-tunera-ivory">
          <Section
            eyebrow={t.brandsSection.endCta.title}
            description={t.brandsSection.endCta.body}
            tone="dark"
          >
            <div className="flex flex-wrap gap-3">
              <Link
                href={t.brandsSection.endCta.primaryHref}
                className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {t.brandsSection.endCta.primaryLabel}
              </Link>
              <Link
                href={t.brandsSection.endCta.secondaryHref}
                className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-6 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {t.brandsSection.endCta.secondaryLabel}
              </Link>
            </div>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
