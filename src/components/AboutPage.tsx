import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { RoleGrid } from "@/components/RoleGrid";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function AboutPage({ locale }: Props) {
  const t = copy(locale);
  const a = t.aboutPage;
  return (
    <div lang={locale}>
      <Header locale={locale} current="about" />
      <main id="main">
        <PageHero eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} />

        {/* CORPORATE STORY ----------------------------------------- */}
        <Section eyebrow={a.story.eyebrow}>
          <div className="max-w-3xl space-y-6 text-base leading-relaxed text-tunera-ink/80 md:text-lg md:leading-[1.7]">
            {a.story.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Section>

        {/* NEW ERA — centered editorial pull-quote on ivory */}
        <section
          aria-labelledby="new-era-title"
          className="border-y border-tunera-stone/40 bg-tunera-ivory"
        >
          <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-24 md:py-28 lg:py-32">
            <div className="mb-7 flex items-center justify-center gap-3">
              <span aria-hidden className="h-px w-10 bg-tunera-orange" />
              <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                {a.newEra.eyebrow}
              </span>
              <span aria-hidden className="h-px w-10 bg-tunera-orange" />
            </div>
            <p
              id="new-era-title"
              className="text-2xl font-semibold leading-[1.2] tracking-tighter2 text-tunera-ink sm:text-3xl md:text-4xl"
            >
              {a.newEra.body}
            </p>
            <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
              {a.newEra.closingLine}
            </p>
          </div>
        </section>

        {/* VALUES --------------------------------------------------- */}
        <div className="border-b border-tunera-stone/40 bg-tunera-sand/60">
          <Section
            id="values"
            eyebrow={a.values.eyebrow}
            title={a.values.title}
            description={a.values.description}
          >
            <RoleGrid items={a.values.items} cols={2} />
          </Section>
        </div>

        {/* TEAM / WORKING STRUCTURE -------------------------------- */}
        <Section
          id="team"
          eyebrow={a.team.eyebrow}
          title={a.team.title}
          description={a.team.description}
        >
          <RoleGrid items={a.team.items} cols={2} />
        </Section>

        {/* CTA — graphite anchor, footer pattern fades up */}
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
