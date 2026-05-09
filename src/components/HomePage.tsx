import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { HomeScrollStory } from "@/components/HomeScrollStory";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function HomePage({ locale }: Props) {
  const t = copy(locale);
  return (
    <div lang={locale}>
      <Header locale={locale} current="home" />
      <main id="main">
        {/* HERO ----------------------------------------------------- */}
        <section aria-labelledby="hero-title" className="relative overflow-hidden bg-tunera-ivory">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 md:py-28 lg:py-32">
            <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-16">
              <div className="lg:col-span-7">
                <div className="mb-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                    {t.home.eyebrow}
                  </span>
                </div>
                <h1
                  id="hero-title"
                  className="max-w-[14ch] text-5xl font-semibold leading-[0.95] tracking-tighter2 text-tunera-ink sm:text-6xl md:text-7xl"
                >
                  {t.home.title}
                </h1>
                <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-tunera-muted-ink">
                  {contact.companyLegal}
                </p>
                <p className="mt-7 max-w-xl text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
                  {t.home.lead}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <Link
                    href={t.home.ctaPrimaryHref}
                    className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
                  >
                    {t.home.ctaPrimary}
                  </Link>
                  <Link
                    href={t.home.ctaSecondaryHref}
                    className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-6 py-3 text-sm text-tunera-ink transition-colors hover:border-tunera-ink/50 hover:bg-tunera-sand/50"
                  >
                    {t.home.ctaSecondary}
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-tunera-orange md:aspect-[5/6]">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.18] mix-blend-multiply"
                  />
                  <div className="absolute inset-0 flex items-center justify-center p-10">
                    <Image
                      src="/assets/brand/tunera/tunera-logo-white.png"
                      alt=""
                      width={1482}
                      height={343}
                      className="h-auto w-3/4 max-w-[320px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCROLL STORY — sticky narrative on lg+, stacked on mobile.
            Replaces the previous story preview, brands, services, and
            team-strip sections; the dedicated /hakkimizda, /markalar,
            /hizmetler pages still carry the full content. */}
        <HomeScrollStory locale={locale} />

        {/* CONTACT CTA — graphite anchor; pattern atmosphere lives in
            the footer below and softly fades upward across this seam. */}
        <div className="bg-tunera-graphite text-tunera-ivory">
          <Section
            id="contact"
            eyebrow={t.contactSection.title}
            title={t.contactSection.title}
            description={t.contactSection.body}
            tone="dark"
          >
            <Link
              href={t.contactSection.ctaHref}
              className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
            >
              {t.contactSection.cta}
            </Link>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
