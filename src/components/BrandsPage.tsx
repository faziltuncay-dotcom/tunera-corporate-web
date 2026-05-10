import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
        <PageVisualBleed
          image={t.brandsSection.pageVisual.image}
          imageAlt={t.brandsSection.pageVisual.imageAlt}
          kicker={t.brandsSection.pageVisual.kicker}
          caption={t.brandsSection.pageVisual.caption}
          panelSide="left"
          imagePosition="55% center"
        />

        {/* SCROLL NARRATIVE — Brand hub with per-brand stages. Each
            stage embeds the same BrandCard previously rendered in the
            grid; the reduced-motion / mobile branch surfaces the same
            cards as a stacked column. */}
        <BrandsScrollStory locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
