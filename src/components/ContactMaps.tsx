import { contact, copy, type Locale } from "@/content/site";

type Props = {
  locale: Locale;
};

/**
 * Two-card maps panel for the contact section.
 *
 * Renders one premium framed card per confirmed Tunera office
 * (Management — Kartal, Operations — Tuzla). Each card carries:
 *
 *   - the office label (eyebrow in brand orange),
 *   - the two address lines that are already authoritative in
 *     `config/launch.ts` (no invented data),
 *   - a Google Maps **iframe embed** keyed on the same address
 *     string — no API key, no backend, just the public
 *     `maps.google.com/maps?q=…&output=embed` URL pattern,
 *   - a "Google Haritalar'da Aç" outbound link to the same address
 *     query for users who want the full Google Maps app.
 *
 * The iframe is `loading="lazy"` so the maps don't block the rest of
 * the contact section; an accessible `title` is set per office. The
 * frame itself sits inside a rounded ivory card matching the rest of
 * the contact area, with an orange top stripe to thread it into the
 * existing contact-detail card visual language.
 */
export function ContactMaps({ locale }: Props) {
  const c = copy(locale).contactSection;
  const offices = [
    {
      label: c.fieldOfficeManagement,
      ...contact.offices.management,
    },
    {
      label: c.fieldOfficeOperations,
      ...contact.offices.operations,
    },
  ];

  const queryFor = (line1: string, line2: string) => encodeURIComponent(`${line1}, ${line2}`);

  return (
    <section
      aria-label={c.mapsTitle}
      className="relative overflow-hidden rounded-md border border-tunera-stone/60 bg-white p-7 sm:p-9"
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-tunera-orange" />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold tracking-tightish text-tunera-ink sm:text-lg">
          {c.mapsTitle}
        </h3>
        <p className="text-sm leading-relaxed text-tunera-muted-ink">{c.mapsDescription}</p>
      </div>
      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
        {offices.map((o) => {
          const q = queryFor(o.line1, o.line2);
          const embedSrc = `https://maps.google.com/maps?q=${q}&hl=${locale}&z=15&output=embed`;
          const openUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
          return (
            <article
              key={o.label}
              className="flex flex-col overflow-hidden rounded-md border border-tunera-stone/60 bg-tunera-ivory"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-tunera-stone/20 sm:aspect-[5/3]">
                <iframe
                  src={embedSrc}
                  title={`${o.label} — ${o.line1}, ${o.line2}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
              <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-6">
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
                  {o.label}
                </div>
                <div className="text-sm leading-relaxed text-tunera-ink">
                  <span className="block">{o.line1}</span>
                  <span className="mt-0.5 block text-tunera-muted-ink">{o.line2}</span>
                </div>
                <a
                  href={openUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="-mx-1 inline-flex items-center gap-2 rounded-sm px-1 py-2 text-sm font-medium text-tunera-ink transition-colors hover:text-tunera-orange"
                >
                  <span>{c.mapsOpenInGoogle}</span>
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
