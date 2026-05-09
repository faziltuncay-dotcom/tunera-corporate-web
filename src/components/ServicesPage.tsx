import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { ServicesScrollStory } from "@/components/ServicesScrollStory";
import { ImageReveal } from "@/components/ImageReveal";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ServicesPage({ locale }: Props) {
  const t = copy(locale);
  const s = t.servicesPage;
  return (
    <div lang={locale}>
      <Header locale={locale} current="services" />
      <main id="main">
        <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} lead={s.hero.lead} />

        {/* Hero → service model brand seam */}
        <SectionTransition />

        {/* SERVICE MODEL STRIP — editorial brand-index, not a stepper */}
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

        {/* SCROLL NARRATIVE — Apple-style sticky stages on lg+, stacked
            on mobile / reduced-motion. Provides a calm overview of the
            service model before the detailed editorial cards below. */}
        <ServicesScrollStory locale={locale} />

        {/* Narrative → detailed services brand seam */}
        <SectionTransition />

        {/* DETAILED SERVICES — editorial 4/8 split with intentional dividers */}
        <Section tight>
          <ol role="list" className="space-y-12 md:space-y-16">
            {s.items.map((item, i) => (
              <li
                key={item.title}
                className="border-t border-tunera-stone/40 pt-10 first:border-t-0 first:pt-0 md:pt-12"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    {/* Per-service editorial illustration. The same
                        illustration appears with `priority` only on the
                        first item; subsequent items lazy-load and softly
                        reveal as they enter the viewport. */}
                    <ImageReveal className="mb-6 block">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-tunera-ivory ring-1 ring-tunera-stone/50 shadow-[0_18px_40px_-28px_rgba(35,31,32,0.18)]">
                        <Image
                          src={item.illustration}
                          alt={item.illustrationAlt}
                          width={1448}
                          height={1086}
                          sizes="(min-width: 1024px) 360px, (min-width: 640px) 60vw, 100vw"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </ImageReveal>
                    <div className="mb-3 flex items-center gap-2">
                      <span aria-hidden className="h-1 w-5 bg-tunera-orange" />
                      <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold leading-[1.15] tracking-tighter2 text-tunera-ink sm:text-3xl">
                      {item.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-8 lg:border-l lg:border-tunera-stone/40 lg:pl-12">
                    <div className="space-y-4 text-base leading-relaxed text-tunera-ink/80 sm:text-[17px] sm:leading-[1.7]">
                      {item.paragraphs.map((p, pi) => (
                        <p key={pi}>{p}</p>
                      ))}
                    </div>
                    {item.note ? (
                      <p className="mt-6 border-t border-tunera-stone/50 pt-4 text-xs leading-relaxed text-tunera-muted-ink">
                        {item.note}
                      </p>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* CTA — graphite anchor */}
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
