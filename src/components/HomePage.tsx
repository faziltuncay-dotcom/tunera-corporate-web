import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { BrandCard } from "@/components/BrandCard";
import { ServiceList } from "@/components/ServiceList";
import { brands, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function HomePage({ locale }: Props) {
  const t = copy(locale);
  return (
    <>
      <Header locale={locale} />
      <main>
        <section className="relative overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(232,128,74,0.12),_transparent_60%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-28 md:py-36">
            <div className="text-xs uppercase tracking-[0.32em] text-sunset-400">
              {t.home.eyebrow}
            </div>
            <h1 className="max-w-3xl text-4xl font-light tracking-tightish text-ink-50 md:text-6xl">
              {t.home.title}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-ink-200">{t.home.lead}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link
                href={t.home.ctaPrimaryHref}
                className="inline-flex items-center gap-2 rounded-full bg-sunset-500 px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-sunset-400"
              >
                {t.home.ctaPrimary}
              </Link>
              <Link
                href={t.home.ctaSecondaryHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-ink-50 transition-colors hover:border-sunset-400 hover:text-sunset-400"
              >
                {t.home.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>

        <Section id="about" eyebrow={t.about.title}>
          <p className="max-w-3xl text-base leading-relaxed text-ink-200">{t.about.body}</p>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-200">{t.home.intro}</p>
        </Section>

        <div className="border-t border-white/5 bg-navy-900/30">
          <Section
            id="brands"
            eyebrow={t.brandsSection.title}
            title={t.brandsSection.title}
            description={t.brandsSection.description}
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {brands.map((b) => (
                <BrandCard
                  key={b.id}
                  locale={locale}
                  id={b.id}
                  name={b.name}
                  status={b.status}
                  href={b.href}
                  external={b.external}
                />
              ))}
            </div>
          </Section>
        </div>

        <Section id="services" eyebrow={t.services.title} title={t.services.title}>
          <ServiceList locale={locale} />
        </Section>

        <div className="border-t border-white/5 bg-navy-900/30">
          <Section
            id="contact"
            eyebrow={t.contactSection.title}
            title={t.contactSection.title}
            description={t.contactSection.body}
          >
            <Link
              href={t.contactSection.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-sunset-500 px-6 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-sunset-400"
            >
              {t.contactSection.cta}
            </Link>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
