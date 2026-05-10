import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { SectionTransition } from "@/components/SectionTransition";
import { AboutScrollStory } from "@/components/AboutScrollStory";
import { BrandsScrollStory } from "@/components/BrandsScrollStory";
import { ContactScrollStory } from "@/components/ContactScrollStory";
import { ServicesStickyStory, type ServiceStoryItem } from "@/components/ServicesStickyStory";
import { ImageReveal } from "@/components/ImageReveal";
import { anchors, contact, copy, type Locale } from "@/content/site";
import type { PanelPlacement } from "@/lib/visualComposition";

type Props = {
  locale: Locale;
};

/**
 * Per-service composition metadata, lifted from the previous standalone
 * ServicesPage so each illustration's subject stays clear of the panel.
 */
const SERVICE_COMPOSITION: ReadonlyArray<{
  panelPlacement: PanelPlacement;
  imagePosition: string;
}> = [
  { panelPlacement: "top-left", imagePosition: "center center" },
  { panelPlacement: "bottom-right", imagePosition: "40% center" },
  { panelPlacement: "left", imagePosition: "60% center" },
  { panelPlacement: "top-right", imagePosition: "center center" },
  { panelPlacement: "left", imagePosition: "60% center" },
  { panelPlacement: "right", imagePosition: "30% center" },
];

export function HomePage({ locale }: Props) {
  const t = copy(locale);
  const a = t.aboutPage;
  const b = t.brandsSection;
  const s = t.servicesPage;
  const c = t.contactSection;
  const ids = anchors(locale);

  const serviceStoryItems: ServiceStoryItem[] = s.items.map((item, i) => {
    const comp = SERVICE_COMPOSITION[i] ?? SERVICE_COMPOSITION[0];
    return {
      kicker: s.modelStrip[i] ?? item.title,
      title: item.title,
      description: item.paragraphs[0],
      note: item.note,
      image: item.illustration,
      imageAlt: item.illustrationAlt,
      imagePosition: comp.imagePosition,
      panelPlacement: comp.panelPlacement,
    };
  });

  const contactFields: Array<{ label: string; value: string | null; full?: boolean }> = [
    { label: c.fieldEmail, value: contact.email },
    { label: c.fieldPhone, value: contact.phone },
    { label: c.fieldAddress, value: contact.address, full: true },
  ];
  const renderContactValue = (v: string | null) => v ?? c.toBeAnnounced;
  const isContactPlaceholder = (v: string | null) => !v;

  return (
    <div lang={locale}>
      <Header locale={locale} />
      <main id="main">
        {/* HERO — anchor target for "home" / "anasayfa". Full-bleed
            graphite scene with the editorial two-boats illustration and
            a tinted panel anchored to the bottom-left over the wave
            foreground so the boats stay unobstructed. */}
        <section
          id={ids.home}
          aria-labelledby="hero-title"
          className="tunera-anchor relative overflow-hidden bg-tunera-graphite text-tunera-ivory"
        >
          <ImageReveal className="tunera-service-story relative isolate block">
            <div className="relative isolate min-h-[80svh] w-full overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
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

        <SectionTransition />

        {/* ABOUT — anchor target for "about" / "hakkimizda". Section
            hero (h2) + full-bleed coastal visual + sticky scroll story
            carrying the corporate detail. */}
        <PageHero id={ids.about} eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} />
        <PageVisualBleed
          image={a.pageVisual.image}
          imageAlt={a.pageVisual.imageAlt}
          kicker={a.pageVisual.kicker}
          caption={a.pageVisual.caption}
          panelPlacement="left"
          imagePosition="center center"
        />
        <AboutScrollStory locale={locale} />

        <SectionTransition />

        {/* BRANDS — anchor target for "brands" / "markalar". Hub layout
            with the two-yachts visual then per-brand sticky stages
            (Granfort active, Ranieri planned). */}
        <PageHero id={ids.brands} eyebrow={b.title} title={b.title} lead={b.description} />
        <PageVisualBleed
          image={b.pageVisual.image}
          imageAlt={b.pageVisual.imageAlt}
          kicker={b.pageVisual.kicker}
          caption={b.pageVisual.caption}
          panelPlacement="bottom-right"
          imagePosition="center center"
        />
        <BrandsScrollStory locale={locale} />

        <SectionTransition />

        {/* SERVICES — anchor target for "services" / "hizmetler".
            Section hero, calm 6-item model index, then the sticky
            cross-fade story across all six service illustrations. */}
        <PageHero
          id={ids.services}
          eyebrow={s.hero.eyebrow}
          title={s.hero.title}
          lead={s.hero.lead}
        />
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
        <ServicesStickyStory ariaLabel={s.scrollStory.ariaLabel} items={serviceStoryItems} />

        <SectionTransition />

        {/* CONTACT — anchor target for "contact" / "iletisim". The
            calmest scene on the site (single boat at sunset) seats the
            pre-launch posture, the channels stage carries placeholder
            email/phone/address, and the closing card mirrors the same
            fields without inventing a submission flow. */}
        <PageHero id={ids.contact} eyebrow={c.title} title={c.title} lead={c.body} />
        <PageVisualBleed
          image={c.pageVisual.image}
          imageAlt={c.pageVisual.imageAlt}
          kicker={c.pageVisual.kicker}
          caption={c.pageVisual.caption}
          panelPlacement="left"
          imagePosition="60% center"
        />
        <ContactScrollStory locale={locale} />

        <SectionTransition />

        <Section tight>
          <div className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
            <h3 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {c.detailsTitle}
            </h3>
            <dl className="mt-7 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              {contactFields.map((f) => (
                <div key={f.label} className={f.full ? "md:col-span-2" : undefined}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {f.label}
                  </dt>
                  <dd
                    className={
                      "mt-2 text-base " +
                      (isContactPlaceholder(f.value) ? "text-tunera-muted-ink" : "text-tunera-ink")
                    }
                  >
                    {renderContactValue(f.value)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm text-tunera-muted-ink">{c.detailsNote}</p>
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
