import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { HomeScrollStory } from "@/components/HomeScrollStory";
import { ImageReveal } from "@/components/ImageReveal";
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
        {/*
          Cinematic hero. The previous 7/5 grid (text on the left,
          framed illustration on the right) is replaced with a single
          full-bleed editorial scene: the new two-boats illustration
          fills the surface and the eyebrow/h1/legal/lead/CTA cluster
          floats above it inside a tinted graphite panel anchored to
          the left. The same `tunera-service-*` motion classes drive
          a calm scale-down on the image and a soft lift on the panel
          via `<ImageReveal>`. min-h-[80svh] keeps the hero cinematic
          without dominating the rest of the home page.
        */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-tunera-graphite text-tunera-ivory"
        >
          <ImageReveal className="tunera-service-story relative isolate block">
            <div className="relative isolate min-h-[80svh] w-full overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                {/* Wave-breathing wrapper drifts the hero illustration
                    horizontally by ±0.5% on a 24s loop so the painted
                    waves and the boats feel gently alive. The inner
                    Image keeps its scale-down reveal motion. */}
                <div className="tunera-image-wave-breathe absolute inset-0">
                  <Image
                    src="/assets/brand/web/hero-marine-pair.png"
                    alt={t.home.heroIllustrationAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="tunera-service-image object-cover"
                    style={{ objectPosition: "center" }}
                  />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0 lg:block"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/85 via-tunera-graphite/15 to-transparent lg:hidden"
                />
              </div>
              {/*
                Image-aware panel placement: hero-marine-pair has the
                two boats centered horizontally with a decorative
                orange/ink wave foreground occupying the lower-left.
                Anchoring the panel to bottom-left (lg+) puts it over
                the wave area while leaving the boats above unblocked.
                Mobile keeps `items-end` so the panel stacks at the
                bottom regardless.
              */}
              <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-6xl items-end px-6 py-20 sm:px-8 sm:py-24 lg:items-end lg:justify-start lg:py-28">
                <div className="tunera-service-panel w-full max-w-xl rounded-md border border-tunera-orange/30 bg-tunera-graphite/88 p-7 shadow-[0_28px_70px_-30px_rgba(0,0,0,0.6)] backdrop-blur-md sm:p-9">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                      {t.home.eyebrow}
                    </span>
                  </div>
                  <h1
                    id="hero-title"
                    className="mt-5 max-w-[14ch] text-5xl font-semibold leading-[1.0] tracking-tighter2 text-tunera-ivory sm:text-6xl md:text-7xl"
                  >
                    {t.home.title}
                  </h1>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-tunera-ivory/65">
                    {contact.companyLegal}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-tunera-ivory/85 sm:text-lg">
                    {t.home.lead}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link
                      href={t.home.ctaPrimaryHref}
                      className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
                    >
                      {t.home.ctaPrimary}
                    </Link>
                    <Link
                      href={t.home.ctaSecondaryHref}
                      className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-6 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
                    >
                      {t.home.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ImageReveal>
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
