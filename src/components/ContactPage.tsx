import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { SectionTransition } from "@/components/SectionTransition";
import { PageHero } from "@/components/PageHero";
import { ContactScrollStory } from "@/components/ContactScrollStory";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

export function ContactPage({ locale }: Props) {
  const t = copy(locale);
  const fallback = t.contactSection.toBeAnnounced;
  const renderValue = (v: string | null) => v ?? fallback;
  const isPlaceholder = (v: string | null) => !v;

  const fields: Array<{ label: string; value: string | null; full?: boolean }> = [
    { label: t.contactSection.fieldEmail, value: contact.email },
    { label: t.contactSection.fieldPhone, value: contact.phone },
    { label: t.contactSection.fieldAddress, value: contact.address, full: true },
  ];

  return (
    <div lang={locale}>
      <Header locale={locale} current="contact" />
      <main id="main">
        <PageHero
          eyebrow={t.contactSection.title}
          title={t.contactSection.title}
          lead={t.contactSection.body}
        />

        {/* FULL-BLEED EDITORIAL VISUAL — calmest scene on the site,
            single boat heading toward an orange sunset. Connects the
            pre-launch contact posture to the closing footer. */}
        {/*
          Image-aware placement: contact-horizon has a single boat
          and the orange sunset on the right side. A left-anchored
          panel keeps the subject and horizon clear; pushing
          object-position right ensures the sunset stays inside the
          visible frame at common viewport ratios.
        */}
        <PageVisualBleed
          image={t.contactSection.pageVisual.image}
          imageAlt={t.contactSection.pageVisual.imageAlt}
          kicker={t.contactSection.pageVisual.kicker}
          caption={t.contactSection.pageVisual.caption}
          panelPlacement="left"
          imagePosition="60% center"
        />

        {/* SCROLL NARRATIVE — Apple-style sticky stages on lg+, stacked
            on mobile / reduced-motion. Carries the pre-launch posture
            and forward links into a single calm flow before the
            detailed contact card below. */}
        <ContactScrollStory locale={locale} />

        {/* Narrative → contact card brand seam */}
        <SectionTransition />

        <Section tight>
          <div className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
            <h2 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {t.contactSection.detailsTitle}
            </h2>
            <dl className="mt-7 grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              {fields.map((f) => (
                <div key={f.label} className={f.full ? "md:col-span-2" : undefined}>
                  <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                    {f.label}
                  </dt>
                  <dd
                    className={
                      "mt-2 text-base " +
                      (isPlaceholder(f.value) ? "text-tunera-muted-ink" : "text-tunera-ink")
                    }
                  >
                    {renderValue(f.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* CLOSING CTA — graphite anchor matching the page-end rhythm
            on Home/About/Services so the Contact route does not feel
            visibly shorter than the rest of the site. */}
        <div className="bg-tunera-graphite text-tunera-ivory">
          <Section
            eyebrow={t.contactSection.endCta.title}
            description={t.contactSection.endCta.body}
            tone="dark"
          >
            <div className="flex flex-wrap gap-3">
              <Link
                href={t.contactSection.endCta.primaryHref}
                className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
              >
                {t.contactSection.endCta.primaryLabel}
              </Link>
              <Link
                href={t.contactSection.endCta.secondaryHref}
                className="inline-flex items-center gap-2 rounded-sm border border-tunera-ivory/30 px-6 py-3 text-sm text-tunera-ivory transition-colors hover:border-tunera-orange hover:text-tunera-orange"
              >
                {t.contactSection.endCta.secondaryLabel}
              </Link>
            </div>
          </Section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
