import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { ServicesStickyStory, type ServiceStoryItem } from "@/components/ServicesStickyStory";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * Per-item `object-position` hints. Set so each illustration's main
 * subject (boat, hangar, lift) sits inside the visible frame at
 * common viewport ratios. Indexed against `t.servicesPage.items`:
 *   0 Brand Representation     — boat slightly left of center
 *   1 Pre-Owned Advisory       — figures slightly right
 *   2 Service & Maintenance    — boat on lift slightly right
 *   3 Marine Trailer           — slightly left
 *   4 Secure Storage           — hangar at right
 *   5 Yard & Haul-Out          — lift at left
 */
const SERVICE_OBJECT_POSITIONS = [
  "65% center",
  "30% center",
  "35% center",
  "60% center",
  "65% center",
  "30% center",
] as const;

export function ServicesPage({ locale }: Props) {
  const t = copy(locale);
  const s = t.servicesPage;

  const storyItems: ServiceStoryItem[] = s.items.map((item, i) => ({
    kicker: s.modelStrip[i] ?? item.title,
    title: item.title,
    description: item.paragraphs[0],
    note: item.note,
    image: item.illustration,
    imageAlt: item.illustrationAlt,
    imagePosition: SERVICE_OBJECT_POSITIONS[i] ?? "center",
  }));

  return (
    <div lang={locale}>
      <Header locale={locale} current="services" />
      <main id="main">
        <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} lead={s.hero.lead} />

        {/* Hero → service-model index brand seam */}
        <SectionTransition />

        {/* SERVICE MODEL STRIP — calm 6-item index. Acts as the
            page's "table of contents" before the sticky story. */}
        <section aria-label={s.modelStripLabel} className="bg-tunera-ivory">
          <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
            <div className="mb-4 flex items-center gap-3">
              <span aria-hidden className="h-px w-8 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
                {s.modelStripLabel}
              </span>
            </div>
            <ol role="list" className="flex flex-wrap items-baseline gap-x-7 gap-y-3">
              {s.modelStrip.map((label, i) => (
                <li key={label} className="flex items-baseline gap-2">
                  <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold tracking-tightish text-tunera-ink">
                    {label}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* STICKY SCROLL STORY — single sticky scene where each
            service stage's image and floating panel cross-fade as the
            user scrolls. Replaces the previous six stacked 100svh
            sections that hard-cut between unrelated illustrations. */}
        <ServicesStickyStory
          ariaLabel={s.scrollStory.ariaLabel}
          eyebrow={s.scrollStory.eyebrow}
          items={storyItems}
        />

        {/* CTA — graphite anchor (footer pattern fades up across boundary) */}
        <div className="bg-tunera-graphite text-tunera-ivory">
          <Section eyebrow={s.cta.title} description={s.cta.body} tone="dark">
            <div className="flex flex-wrap gap-3">
              <Link
                href={s.cta.primaryHref}
                className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {s.cta.primaryLabel}
              </Link>
              <Link
                href={s.cta.secondaryHref}
                className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-6 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {s.cta.secondaryLabel}
              </Link>
            </div>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
