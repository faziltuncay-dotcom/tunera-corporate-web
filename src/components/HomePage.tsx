import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { AboutScrollStory } from "@/components/AboutScrollStory";
import { ServicesStickyStory, type ServiceStoryItem } from "@/components/ServicesStickyStory";
import { CtaTransition } from "@/components/CtaTransition";
import { ImageReveal } from "@/components/ImageReveal";
import { ResponsiveBrandImage } from "@/components/ResponsiveBrandImage";
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
  const s = t.servicesPage;
  const ids = anchors(locale);

  const serviceStoryItems: ServiceStoryItem[] = s.items.map((item, i) => {
    const comp = SERVICE_COMPOSITION[i] ?? SERVICE_COMPOSITION[0];
    return {
      kicker: s.modelStrip[i] ?? item.title,
      title: item.title,
      description: item.paragraphs[0],
      note: item.note,
      slug: item.slug,
      imageAlt: item.illustrationAlt,
      imagePosition: comp.imagePosition,
      imagePositionMobile: comp.imagePositionMobile,
      panelPlacement: comp.panelPlacement,
    };
  });

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
          aria-label={t.home.title}
          className="tunera-anchor relative overflow-hidden bg-tunera-graphite text-tunera-ivory"
        >
          {/* MOBILE / TABLET (< lg) — image strip on top, content block
              below. Same pattern as PageVisualBleed mobile so the hero
              never buries the marine art behind text. */}
          <div className="block lg:hidden">
            <ImageReveal className="tunera-service-story relative isolate block">
              <div className="relative h-[58svh] min-h-[420px] w-full overflow-hidden">
                <div className="tunera-image-wave-breathe absolute inset-0">
                  <ResponsiveBrandImage
                    slug="hero-marine-pair"
                    alt={t.home.heroIllustrationAlt}
                    sizes="100vw"
                    priority
                    fill
                    objectPosition="center 50%"
                    objectPositionMobile="32% 42%"
                    imgClassName="tunera-service-image"
                  />
                </div>
                {/* Soft bottom-fade only — boat / sun stay clear above. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tunera-graphite/55 to-transparent"
                />
              </div>
              <div className="relative isolate overflow-hidden bg-tunera-graphite px-5 pb-12 pt-9 sm:px-8 sm:pb-14 sm:pt-10">
                <div className="tunera-service-panel relative w-full max-w-xl">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="h-px w-8 bg-tunera-orange" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                      {t.home.eyebrow}
                    </span>
                  </div>
                  <h1
                    id="hero-title"
                    className="mt-4 max-w-[14ch] text-4xl font-semibold leading-[1.02] tracking-tighter2 text-tunera-ivory sm:text-5xl"
                  >
                    {t.home.title}
                  </h1>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-tunera-ivory/60 sm:text-[11px] sm:tracking-[0.24em] sm:text-tunera-ivory/65">
                    {contact.companyLegal}
                  </p>
                  <p className="mt-5 text-[15px] leading-relaxed text-tunera-ivory/85 sm:text-base">
                    {t.home.lead}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={t.home.ctaPrimaryHref}
                      className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
                    >
                      {t.home.ctaPrimary}
                    </Link>
                    <Link
                      href={t.home.ctaSecondaryHref}
                      className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-5 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
                    >
                      {t.home.ctaSecondary}
                    </Link>
                  </div>
                </div>
              </div>
            </ImageReveal>
          </div>

          {/* DESKTOP (lg+) — full-bleed editorial overlay. Card pulled
              tighter into the right edge (max-w-md + lg:pr-10) so the
              boat + water spray on the left half of the new Granfort
              artwork stay completely uncovered. */}
          <ImageReveal className="tunera-service-story relative isolate hidden lg:block">
            <div className="relative isolate min-h-[80svh] w-full overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="tunera-image-wave-breathe absolute inset-0">
                  <ResponsiveBrandImage
                    slug="hero-marine-pair"
                    alt=""
                    sizes="100vw"
                    priority
                    fill
                    objectPosition="center 50%"
                    imgClassName="tunera-service-image"
                  />
                </div>
                {/* Right-side scrim — broad image-level gradient that
                    darkens just enough of the right band so the floating
                    copy reads cleanly without ever needing a panel
                    behind it. The boat / water spray / sun side stays
                    completely clear. */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-l from-tunera-graphite/85 via-tunera-graphite/45 via-30% to-tunera-graphite/0 to-65%"
                />
              </div>
              <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-6xl items-end justify-end px-8 py-28 lg:pr-10 xl:pr-4">
                <div className="tunera-service-panel tunera-floating-copy w-full max-w-md">
                  <div className="flex items-center gap-3">
                    <span aria-hidden className="tunera-floating-rail" />
                    <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
                      {t.home.eyebrow}
                    </span>
                  </div>
                  <h1
                    id="hero-title-lg"
                    className="mt-5 max-w-[14ch] text-5xl font-semibold leading-[1.02] tracking-tighter2 text-tunera-ivory md:text-6xl xl:text-7xl"
                  >
                    {t.home.title}
                  </h1>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-tunera-ivory/70">
                    {contact.companyLegal}
                  </p>
                  <p className="mt-6 max-w-xl text-base leading-relaxed text-tunera-ivory/90 md:text-lg">
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

        {/* ABOUT — anchor target for "about" / "hakkimizda". The
            intro sits on a clean ivory surface with no decorative
            motif. */}
        <PageHero id={ids.about} eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} />
        {/* About visual: single boat lower-left + soft golden glow
            upper-right + decorative gold arc lines across upper-right.
            Safe zone is the top-left sky band, so the panel anchors
            top-left at lg+. Mobile crop shifts right of source center
            to keep the boat visible in portrait windows. No top/bottom
            absorbs — the image edges read as clean cuts per the user's
            "görsel üzerinde transition değişimi olmasın" direction. */}
        <PageVisualBleed
          slug={a.pageVisual.slug}
          imageAlt={a.pageVisual.imageAlt}
          kicker={a.pageVisual.kicker}
          caption={a.pageVisual.caption}
          panelPlacement="top-left"
          imagePosition="30% 50%"
          imagePositionMobile="30% 55%"
        />
        <AboutScrollStory locale={locale} />

        {/* SERVICES — anchor target for "services" / "hizmetler".
            The intro hero and the 6-item model index share ONE clean
            ivory wrapper. No decorative wave motif and no atmospheric
            gradient — the user explicitly asked for these intermediate
            sections to read as plain, calm, corporate surfaces, with
            the orange eyebrow rails + typography carrying all of the
            visual rhythm. The boundary into the dark sticky story
            below is absorbed on the dark side: `ServicesStickyStory`
            paints a thin ivory→transparent fade at the top of its
            first stage so the dark scene rises out of the ivory page
            without painting a dark band over the ivory intro. */}
        <div className="relative bg-tunera-ivory">
          <PageHero
            id={ids.services}
            eyebrow={s.hero.eyebrow}
            title={s.hero.title}
            lead={s.hero.lead}
            bare
          />
          <section aria-label={s.modelStripLabel} className="relative">
            <div className="mx-auto max-w-6xl px-6 pb-12 sm:pb-14 md:pb-16 lg:pb-20">
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
                      {String(i + 1)}
                    </span>
                    <span className="text-sm font-semibold tracking-tightish text-tunera-ink">
                      {label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
        <ServicesStickyStory ariaLabel={s.scrollStory.ariaLabel} items={serviceStoryItems} />

        {/* Direct image-to-CTA join. No gradient bridge, no shadow
            scrim, no fade strip between the ServicesStickyStory and
            the CtaTransition — the dark sticky scene ends, the ivory
            CTA begins, side by side. The user explicitly rejected an
            intermediate dark→ivory separator here ("absolutely no
            shadow, dark gradient, fade band, or intermediate
            separator area between the upper visual and the Markalar
            ve İletişim CTA area"). */}
        <CtaTransition
          eyebrow={t.home.transitionCta.eyebrow}
          title={t.home.transitionCta.title}
          body={t.home.transitionCta.body}
          primary={{
            label: t.home.transitionCta.primaryLabel,
            href: t.home.transitionCta.primaryHref,
          }}
          secondary={{
            label: t.home.transitionCta.secondaryLabel,
            href: t.home.transitionCta.secondaryHref,
          }}
        />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
