import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
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
import { SmoothAnchorNav } from "@/components/SmoothAnchorNav";
import { anchors, contact, copy, type Locale } from "@/content/site";
import type { PanelPlacement } from "@/lib/visualComposition";

type Props = {
  locale: Locale;
};

/**
 * Per-service composition metadata so each illustration's subject
 * (boat, lighthouse, lift, hangar, truck) stays clear of the panel
 * that floats above it inside ServicesStickyStory. Each entry encodes
 * the safe overlay zone for one image plus a desktop and mobile
 * `object-position` so the subject stays inside the visible window
 * at both 16:9-ish desktop and portrait mobile crops.
 *
 *   0  Brand Representation  — boat at modern villa dock, sun right    → panel top-left over sky+palm
 *   1  Pre-Owned Advisory    — multiple boats at marina hub             → panel top-left over sky above hangar
 *   2  Service & Maintenance — boat in hangar, technicians L+R          → panel top-left over dark hangar interior
 *   3  Marine Trailer        — pickup towing trailer, sun right edge    → panel top-left over open sky
 *   4  Secure Storage        — racks left, lit hangar right             → panel top-left over morning sky
 *   5  Yard & Haul-Out       — travel-lift center, lighthouse far left  → panel top-left over sky+lighthouse
 */
const SERVICE_COMPOSITION: ReadonlyArray<{
  panelPlacement: PanelPlacement;
  imagePosition: string;
  imagePositionMobile: string;
}> = [
  { panelPlacement: "top-left", imagePosition: "40% 60%", imagePositionMobile: "40% 60%" },
  { panelPlacement: "top-left", imagePosition: "center 60%", imagePositionMobile: "center 60%" },
  { panelPlacement: "top-left", imagePosition: "center 60%", imagePositionMobile: "center 65%" },
  { panelPlacement: "top-left", imagePosition: "30% 50%", imagePositionMobile: "35% 50%" },
  { panelPlacement: "top-left", imagePosition: "60% 50%", imagePositionMobile: "65% 55%" },
  { panelPlacement: "top-left", imagePosition: "center 60%", imagePositionMobile: "center 60%" },
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
      imagePositionMobile: comp.imagePositionMobile,
      panelPlacement: comp.panelPlacement,
    };
  });

  const officeBlocks = [
    { label: c.fieldOfficeManagement, ...contact.offices.management },
    { label: c.fieldOfficeOperations, ...contact.offices.operations },
  ];
  const companyRows = [
    { label: c.fieldCompanyLegalName, value: contact.companyLegalFull },
    {
      label: c.fieldCompanyAddress,
      value: `${contact.offices.management.line1}, ${contact.offices.management.line2}`,
    },
    { label: c.fieldTaxOffice, value: contact.taxOffice },
    { label: c.fieldTaxNumber, value: contact.taxNumber },
    { label: c.fieldMersisNo, value: contact.mersisNo },
    { label: c.fieldTicaretSicilNo, value: contact.ticaretSicilNo },
  ];

  return (
    <div lang={locale}>
      <SmoothAnchorNav />
      <Header locale={locale} />
      <main id="main">
        {/* HERO — anchor target for "home" / "anasayfa". Full-bleed
            graphite scene with the cinematic single-boat sunset
            illustration. Composition: boat sits in the lower-left
            third, sun glow on the right edge mid-vertical. Panel is
            anchored to the bottom-right (lg+) over the calm water
            zone so it covers neither the boat nor the sun, and the
            side gradient darkens the right side under the panel
            without ever sitting on top of the sun (which is
            mid-vertical, while the panel is bottom). Mobile keeps
            its bottom-stack default with a softer bottom-up gradient.
            `imagePositionMobile` shifts the crop right of center on
            portrait viewports so the boat (lower-left of source)
            stays inside the visible window. */}
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
                    className="tunera-service-image object-cover [object-position:var(--obj-m)] sm:[object-position:var(--obj-d)]"
                    style={
                      {
                        ["--obj-d"]: "center 50%",
                        ["--obj-m"]: "20% 50%",
                      } as CSSProperties
                    }
                  />
                </div>
                {/* Corner-direction gradient (toward top-left) so only the
                    bottom-right area under the panel is darkened. The
                    upper-right — where the sun glow sits in this hero — stays
                    clear. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 hidden bg-gradient-to-tl from-tunera-graphite/85 via-tunera-graphite/30 to-tunera-graphite/0 lg:block"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-tunera-graphite/85 via-tunera-graphite/15 to-transparent lg:hidden"
                />
              </div>
              <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-6xl items-end px-6 py-20 sm:px-8 sm:py-24 lg:items-end lg:justify-end lg:py-28">
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
        {/* About visual: single boat lower-left + soft golden glow upper-right
            + decorative gold arc lines across upper-right. Safe zone is the
            top-left sky band, so the panel anchors top-left at lg+.
            Mobile crop shifts right of source center to keep the boat visible
            in portrait windows. */}
        <PageVisualBleed
          image={a.pageVisual.image}
          imageAlt={a.pageVisual.imageAlt}
          kicker={a.pageVisual.kicker}
          caption={a.pageVisual.caption}
          panelPlacement="top-left"
          imagePosition="30% 50%"
          imagePositionMobile="30% 55%"
        />
        <AboutScrollStory locale={locale} />

        <SectionTransition />

        {/* BRANDS — anchor target for "brands" / "markalar". Hub layout
            with the two-yachts visual then per-brand sticky stages
            (Granfort active, Ranieri planned). */}
        <PageHero id={ids.brands} eyebrow={b.title} title={b.title} lead={b.description} />
        {/* Brands visual: TWO motoryachts side-by-side passing each other in the
            lower-center band, soft sun behind upper-right, cliffs+villa+palms
            upper-left. Safe zone is the top-right sky band so the panel anchors
            top-right at lg+ — never sits over either boat and clears the soft
            sun haze. Mobile crop moves the focal centre slightly right so both
            boats stay in frame on portrait. */}
        <PageVisualBleed
          image={b.pageVisual.image}
          imageAlt={b.pageVisual.imageAlt}
          kicker={b.pageVisual.kicker}
          caption={b.pageVisual.caption}
          panelPlacement="top-right"
          imagePosition="center 60%"
          imagePositionMobile="60% 60%"
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
                  <span
                    aria-hidden
                    className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/70"
                  >
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
        {/* Contact visual: boat moored at private dock center-left with villa
            and dock lights, distant calm sunset on the right horizon. Safe
            zone is the top-right sky band — the panel anchors top-right at
            lg+, never covers the boat / dock / villa and never sits on the
            sunset (which is mid-vertical, while the panel is top). Mobile
            crop favours the dock+boat side to keep the subject visible. */}
        <PageVisualBleed
          image={c.pageVisual.image}
          imageAlt={c.pageVisual.imageAlt}
          kicker={c.pageVisual.kicker}
          caption={c.pageVisual.caption}
          panelPlacement="top-right"
          imagePosition="30% 55%"
          imagePositionMobile="30% 60%"
        />
        <ContactScrollStory locale={locale} />

        <SectionTransition />

        <Section tight>
          {/* Two-card stack: the top card carries the real, day-to-day
              channels (email + the two offices); the bottom card carries
              the formal company information (legal name, tax office,
              tax/MERSİS/trade-registry numbers). Splitting the two keeps
              the everyday channels prominent while the formal record is
              still available for visitors who need it. */}
          <div className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
            <h3 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {c.detailsTitle}
            </h3>
            <dl className="mt-7 grid grid-cols-1 gap-x-12 gap-y-7 md:grid-cols-3">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                  {c.fieldEmail}
                </dt>
                <dd className="mt-2 text-base">
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-tunera-ink underline-offset-4 transition-colors hover:text-tunera-orange hover:underline"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
              {officeBlocks.map((o) => (
                <div key={o.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {o.label}
                  </dt>
                  <dd className="mt-2 text-base text-tunera-ink">
                    <span className="block">{o.line1}</span>
                    <span className="mt-1 block text-tunera-muted-ink">{o.line2}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-6 relative overflow-hidden rounded-md border border-tunera-stone/60 bg-tunera-ivory p-7 sm:p-9">
            <h3 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {c.companyInfoTitle}
            </h3>
            <dl className="mt-7 grid grid-cols-1 gap-x-12 gap-y-5 md:grid-cols-2">
              {companyRows.map((row) => (
                <div key={row.label}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {row.label}
                  </dt>
                  <dd className="mt-2 text-sm text-tunera-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
