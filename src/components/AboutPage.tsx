import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { AboutScrollStory } from "@/components/AboutScrollStory";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * About — fully narrative.
 *
 * The corporate story, "new era" moment, four values, and four
 * working-structure roles all live inside `<AboutScrollStory>`. The
 * page itself is therefore deliberately short on the desktop sticky
 * branch: hero → narrative → CTA. Mobile / reduced-motion users see
 * the same content stacked in document order via the narrative's
 * always-rendered fallback, so screen-readers and search snapshots
 * still receive the full editorial detail.
 */
export function AboutPage({ locale }: Props) {
  const t = copy(locale);
  const a = t.aboutPage;
  return (
    <div lang={locale}>
      <Header locale={locale} current="about" />
      <main id="main">
        <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} />

        {/* FULL-BLEED EDITORIAL VISUAL — calm coastal scene. Carries
            the page emotionally before the narrative takes over. */}
        <PageVisualBleed
          image={a.pageVisual.image}
          imageAlt={a.pageVisual.imageAlt}
          kicker={a.pageVisual.kicker}
          caption={a.pageVisual.caption}
          panelSide="right"
          imagePosition="40% center"
        />

        {/* SCROLL NARRATIVE — Apple-style sticky stages on lg+, stacked
            on mobile / reduced-motion. Carries the full corporate
            story, new-era moment, values and working-structure roles
            in a single connected flow. */}
        <AboutScrollStory locale={locale} />

        {/* CTA — graphite anchor (footer pattern fades up across boundary) */}
        <div className="bg-tunera-graphite text-tunera-ivory">
          <Section eyebrow={a.cta.title} description={a.cta.body} tone="dark">
            <div className="flex flex-wrap gap-3">
              <Link
                href={a.cta.primaryHref}
                className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {a.cta.primaryLabel}
              </Link>
              <Link
                href={a.cta.secondaryHref}
                className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-6 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {a.cta.secondaryLabel}
              </Link>
            </div>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
