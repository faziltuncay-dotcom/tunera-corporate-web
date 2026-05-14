import Image from "next/image";
import Link from "next/link";
import { anchors, contact, copy, type Locale } from "@/content/site";
import { FooterReveal } from "@/components/FooterReveal";
import { TrackedAnchor } from "@/components/analytics/TrackedLink";

type Props = {
  locale: Locale;
};

/**
 * Site footer.
 *
 * Layout (lg+): four columns —
 *   1. Brand column — logo, legal name, short tagline-style line.
 *   2. Sections column — anchor links to the four other sections.
 *   3. Contact column — email link + the two operating addresses
 *      (Yönetim Ofisi in Kartal, Operasyon Tesisi in Tuzla). No phone
 *      is published; none was provided.
 *   4. Company column — formal record (legal name, tax office, tax /
 *      MERSİS / trade-registry numbers).
 *
 * On smaller viewports the four columns collapse into a single stack
 * with the same order. The footer is intentionally tall (`pt-28
 * md:pt-32` and `pb-12`) so the page-to-footer transition reads as a
 * proper closing section instead of a cramped strip. The copyright
 * bottom strip stays unchanged at the very bottom.
 */
export function Footer({ locale }: Props) {
  const t = copy(locale);
  const year = new Date().getFullYear();
  const base = `/${locale}`;
  const ids = anchors(locale);
  // Brands and Contact are dedicated routes; About and Services are
  // anchored sections on the homepage flow.
  const brandsHref = locale === "en" ? "/en/brands" : "/tr/markalar";
  const contactHref = locale === "en" ? "/en/contact" : "/tr/iletisim";
  const quickLinks = [
    { href: `${base}#${ids.about}`, label: t.nav.about },
    { href: `${base}#${ids.services}`, label: t.nav.services },
    { href: brandsHref, label: t.nav.brands },
    { href: contactHref, label: t.nav.contact },
  ];

  const offices = [
    { label: t.contactSection.fieldOfficeManagement, ...contact.offices.management },
    { label: t.contactSection.fieldOfficeOperations, ...contact.offices.operations },
  ];

  const companyRows: Array<{ label: string; value: string }> = [
    { label: t.contactSection.fieldTaxOffice, value: contact.taxOffice },
    { label: t.contactSection.fieldTaxNumber, value: contact.taxNumber },
    { label: t.contactSection.fieldMersisNo, value: contact.mersisNo },
    { label: t.contactSection.fieldTicaretSicilNo, value: contact.ticaretSicilNo },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-tunera-graphite text-tunera-ivory">
      {/*
        Top seam: softened from the previous `via-graphite/60 h-32`
        band — together with the CtaTransition's old bottom-edge
        scrim it created the heavy grey strip the user called out
        ("transition daha yumuşak olsun. gölge azalsın"). The
        gradient now eases through a single, low-opacity midpoint so
        the page-to-footer transition feels like one atmospheric
        flow without a visible dark band stacked under the CTA.
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tunera-graphite/0 via-tunera-graphite/25 to-tunera-graphite"
      />
      {/* Layer A — broad pattern atmosphere, masked to fade in from the top */}
      <div
        aria-hidden
        className="tunera-footer-pattern-a pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.06]"
        style={{ filter: "invert(1)" }}
      />
      {/* Layer B — second layer offset for depth, fades in slightly later */}
      <div
        aria-hidden
        className="tunera-footer-pattern-b pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/assets/brand/tunera/tunera-pattern.png')",
          backgroundSize: "150%",
          backgroundPosition: "70% 30%",
          backgroundRepeat: "no-repeat",
          filter: "invert(1)",
        }}
      />
      <FooterReveal>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 md:pt-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-12 lg:gap-10">
            {/* Brand column — spans 4 of 12 on lg+ */}
            <div className="lg:col-span-4">
              <Image
                src="/assets/brand/tunera/tunera-logo-white.png"
                alt="Tunera Denizcilik"
                width={1482}
                height={343}
                sizes="132px"
                className="h-7 w-auto"
              />
              <div className="mt-6 text-xs uppercase tracking-[0.22em] text-tunera-stone/85">
                {contact.companyLegal}
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-tunera-stone/65">
                {t.brandsSection.description}
              </p>
            </div>

            {/* Sections column */}
            <nav aria-label={t.nav.primaryAria} className="lg:col-span-2">
              <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
                {t.footer.sectionsLabel}
              </div>
              <ul className="mt-3 text-sm text-tunera-stone">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="-mx-1 inline-block rounded-sm px-1 py-2 transition-colors hover:text-tunera-orange"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Contact column — email + two offices */}
            <div className="lg:col-span-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
                {t.footer.contactLabel}
              </div>
              <dl className="mt-5 space-y-5 text-sm text-tunera-stone">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.22em] text-tunera-stone/55">
                    {t.contactSection.fieldEmail}
                  </dt>
                  <dd className="mt-1.5">
                    <TrackedAnchor
                      href={`mailto:${contact.email}`}
                      className="-mx-1 inline-block rounded-sm px-1 py-1.5 text-tunera-ivory underline-offset-4 transition-colors hover:text-tunera-orange hover:underline"
                      trackEvent="contact_email_click"
                      trackMetadata={{ surface: "footer" }}
                    >
                      {contact.email}
                    </TrackedAnchor>
                  </dd>
                </div>
                {offices.map((o) => (
                  <div key={o.label}>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-tunera-stone/55">
                      {o.label}
                    </dt>
                    <dd className="mt-1.5 leading-relaxed">
                      <span className="block">{o.line1}</span>
                      <span className="mt-0.5 block text-tunera-stone/60">{o.line2}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Company column — legal record */}
            <div className="lg:col-span-3">
              <div className="text-[11px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
                {t.footer.companyLabel}
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-tunera-stone/70">
                {contact.companyLegalFull}
              </div>
              <dl className="mt-5 space-y-3 text-sm text-tunera-stone">
                {companyRows.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-t border-tunera-stone/10 pt-3 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-tunera-stone/55">
                      {row.label}
                    </dt>
                    <dd className="text-sm tabular-nums text-tunera-stone">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/*
            Represented brands strip.
            Compact row immediately above the copyright line. Each
            badge is a non-linked light chip — the brand sites are
            not in production today, so the footer mark only
            communicates the representation, never advertises a live
            outbound URL. The chip background is `bg-white/95` so the
            colour-PNG marks read cleanly against the graphite
            footer atmosphere without per-brand white/colour
            inconsistency.
          */}
          <div className="mt-14 border-t border-tunera-stone/15 pt-6">
            <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-tunera-orange">
              {t.brandsSection.title}
            </div>
            <ul
              className="mt-3 flex flex-wrap items-center gap-3"
              aria-label={t.brandsSection.title}
            >
              <li>
                <span
                  className="inline-flex items-center rounded-sm bg-white/95 px-3 py-2"
                  aria-label="Granfort"
                >
                  <Image
                    src="/assets/brand/granfort/granfort-logo-color.png"
                    alt="Granfort"
                    width={2767}
                    height={771}
                    sizes="120px"
                    className="h-6 w-auto"
                  />
                </span>
              </li>
              <li>
                <span
                  className="inline-flex items-center rounded-sm bg-white/95 px-3 py-2"
                  aria-label="Ranieri"
                >
                  <Image
                    src="/assets/brand/ranieri/ranieri-logo-color.png"
                    alt="Ranieri"
                    width={2560}
                    height={776}
                    sizes="120px"
                    className="h-6 w-auto"
                  />
                </span>
              </li>
            </ul>
          </div>

          {/* Copyright bottom strip — unchanged closing line. */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-tunera-stone/15 pt-6 text-xs text-tunera-stone/55">
            <div>
              © {year} {contact.companyShort}. {t.footer.rights}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-tunera-stone/40">
              {contact.companyLegalFull}
            </div>
          </div>
        </div>
      </FooterReveal>
    </footer>
  );
}
