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

        <Section eyebrow={a.profile.eyebrow}>
          <p className="max-w-3xl text-base leading-relaxed text-tunera-ink/80 md:text-lg">
            {a.profile.body}
          </p>
        </Section>

        <div className="border-y border-tunera-stone/40 bg-tunera-sand/60">
          <Section eyebrow={a.principles.eyebrow} title={a.principles.title}>
            <RoleGrid items={a.principles.items} cols={2} />
          </Section>
        </div>

        <Section
          id="team"
          eyebrow={a.team.eyebrow}
          title={a.team.title}
          description={a.team.description}
        >
          <RoleGrid items={a.team.items} cols={2} />
        </Section>

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
