import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { PageVisualBleed } from "@/components/PageVisualBleed";
import { SectionTransition } from "@/components/SectionTransition";
import { Section } from "@/components/Section";
import { ContactMaps } from "@/components/ContactMaps";
import { SmoothAnchorNav } from "@/components/SmoothAnchorNav";
import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * Standalone Contact page for /tr/iletisim and /en/contact.
 *
 * Replaces the previous homepage `#iletisim` section. The earlier
 * version showed the same physical addresses both inside the
 * "İletişim Bilgileri" detail card AND inside the maps block, which
 * read as duplicated. On a dedicated page the structure is split so
 * each piece of information lives in exactly one place:
 *
 *   PageHero               — page title + lead
 *   PageVisualBleed        — calm contact-horizon illustration
 *   "İletişim Bilgileri"   — communication channels only (email today;
 *                            no addresses, no firma bilgileri)
 *   "Konumlar"             — Google Maps cards for both offices, each
 *                            card carries its own address line + an
 *                            outbound "Google Haritalar'da Aç" link
 *
 * Company / legal / firma bilgileri stay only in the global Footer —
 * not duplicated in the contact body. Lazy-loaded iframes; no API
 * key, no backend.
 */
export function ContactPage({ locale }: Props) {
  const t = copy(locale);
  const c = t.contactSection;

  return (
    <div lang={locale}>
      <SmoothAnchorNav />
      <Header locale={locale} />
      <main id="main">
        <PageHero eyebrow={c.title} title={c.title} lead={c.body} headingLevel="h1" />
        {/* `topAbsorb` / `bottomAbsorb` paint short ivory→transparent
            bands at the top and bottom of the dark image so it rises
            out of the ivory PageHero above and sinks back into the
            ivory SectionTransition / Section below without horizontal
            cuts. */}
        <PageVisualBleed
          slug={c.pageVisual.slug}
          imageAlt={c.pageVisual.imageAlt}
          kicker={c.pageVisual.kicker}
          caption={c.pageVisual.caption}
          panelPlacement="top-right"
          imagePosition="30% 55%"
          imagePositionMobile="30% 60%"
          topAbsorb
          bottomAbsorb
        />

        <SectionTransition />

        <Section tight>
          {/* Contact channels — email only. Physical addresses live
              under Konumlar below; firma bilgileri live in the footer. */}
          <div className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9">
            <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
            <h2 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
              {c.detailsTitle}
            </h2>
            <dl className="mt-7">
              <div>
                <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                  {c.fieldEmail}
                </dt>
                <dd className="mt-2 text-base">
                  <a
                    href={`mailto:${contact.email}`}
                    className="-mx-1 inline-block rounded-sm px-1 py-1.5 text-tunera-ink underline-offset-4 transition-colors hover:text-tunera-orange hover:underline"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <ContactMaps locale={locale} />
          </div>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
