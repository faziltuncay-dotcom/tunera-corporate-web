import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
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

        <Section>
          <ol role="list" className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2">
            {s.items.map((item, i) => (
              <li
                key={item.title}
                className="flex flex-col rounded-md border border-tunera-stone/60 bg-white p-7 transition-colors hover:border-tunera-ink/20 sm:p-9"
              >
                <div className="mb-5 flex items-center gap-2">
                  <span aria-hidden className="h-1 w-5 bg-tunera-orange" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="text-xl font-semibold tracking-tighter2 text-tunera-ink sm:text-2xl">
                  {item.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-tunera-muted-ink sm:text-[15px]">
                  {item.body}
                </p>
                {item.note ? (
                  <p className="mt-5 border-t border-tunera-stone/50 pt-4 text-xs leading-relaxed text-tunera-muted-ink/90">
                    {item.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>
        </Section>

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
