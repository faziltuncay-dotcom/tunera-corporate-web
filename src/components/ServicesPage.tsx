import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { ServiceStorySection, type ServicePanelSide } from "@/components/ServiceStorySection";
import { copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * Per-item layout intent for the immersive service sections.
 *
 * `panelSide` puts the floating copy card on the side opposite the
 * boat in each illustration so the visual subject and the text never
 * fight for the same area. `imagePosition` nudges the background
 * `object-position` so the boat / hangar / lift stays inside the
 * visible frame at common viewport ratios.
 *
 * Indexed in declaration order matching `t.servicesPage.items`:
 *   0  Marka Temsili / Brand Representation     — boat-on-water
 *   1  İkinci El / Pre-Owned Advisory           — boat-inspection
 *   2  Servis ve Bakım / Service & Maintenance  — boat-service
 *   3  Marin Römork / Marine Trailer            — boat-trailer
 *   4  Güvenli Depolama / Secure Storage        — boat-storage
 *   5  Çekek Sahası / Yard & Haul-Out           — boat-yard
 */
const SERVICE_LAYOUTS: ReadonlyArray<{
  panelSide: ServicePanelSide;
  imagePosition: string;
}> = [
  { panelSide: "left", imagePosition: "65% center" },
  { panelSide: "right", imagePosition: "30% center" },
  { panelSide: "right", imagePosition: "35% center" },
  { panelSide: "left", imagePosition: "60% center" },
  { panelSide: "left", imagePosition: "65% center" },
  { panelSide: "right", imagePosition: "30% center" },
];

export function ServicesPage({ locale }: Props) {
  const t = copy(locale);
  const s = t.servicesPage;
  const total = s.items.length;
  return (
    <div lang={locale}>
      <Header locale={locale} current="services" />
      <main id="main">
        <PageHero eyebrow={s.hero.eyebrow} title={s.hero.title} lead={s.hero.lead} />

        {/* Hero → service-model index brand seam */}
        <SectionTransition />

        {/* SERVICE MODEL STRIP — calm 6-item index. Acts as the
            page's "table of contents" before the immersive editorial
            sections below. */}
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

        {/* IMMERSIVE SERVICE STORIES — six full-bleed editorial
            sections. Each one is `min-h-[100svh]` with the matched
            illustration as a true background and a floating panel
            carrying kicker / 0N / title / lead / note. The intentional
            absence of `SectionTransition` between them keeps the
            cinematic flow uninterrupted. */}
        {s.items.map((item, i) => {
          const layout = SERVICE_LAYOUTS[i] ?? SERVICE_LAYOUTS[0];
          return (
            <ServiceStorySection
              key={item.title}
              index={i}
              total={total}
              kicker={s.modelStrip[i]}
              title={item.title}
              description={item.paragraphs[0]}
              note={item.note}
              image={item.illustration}
              imageAlt={item.illustrationAlt}
              panelSide={layout.panelSide}
              imagePosition={layout.imagePosition}
            />
          );
        })}

        {/* CTA — graphite anchor (footer pattern fades up across boundary) */}
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
