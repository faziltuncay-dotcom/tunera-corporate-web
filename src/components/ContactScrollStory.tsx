import Link from "next/link";
import { contact, copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the Contact variant of the scroll narrative.
 *
 * The status stage echoes the pre-launch posture; the channels stage
 * surfaces the email/phone/address fields with placeholder treatment
 * matching ContactPage; the explore stage links onward to brands and
 * services so visitors are not left at a dead end.
 */
export function ContactScrollStory({ locale }: Props) {
  const t = copy(locale);
  const c = t.contactSection;
  const fallback = c.toBeAnnounced;
  const renderValue = (v: string | null) => v ?? fallback;
  const isPlaceholder = (v: string | null) => !v;

  const stages = c.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const fields: Array<{ label: string; value: string | null }> = [
    { label: c.fieldEmail, value: contact.email },
    { label: c.fieldPhone, value: contact.phone },
    { label: c.fieldAddress, value: contact.address },
  ];

  const exploreHref =
    locale === "en"
      ? { brands: "/en/brands", services: "/en/services" }
      : { brands: "/tr/markalar", services: "/tr/hizmetler" };
  const exploreLabels =
    locale === "en"
      ? { brands: "Brands", services: "Services" }
      : { brands: "Markalar", services: "Hizmetler" };

  const microContent: NarrativePayload["microContent"] = {
    status: (
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
        {c.detailsNote}
      </p>
    ),
    channels: (
      <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
              {f.label}
            </dt>
            <dd
              className={
                "mt-2 text-sm " +
                (isPlaceholder(f.value) ? "text-tunera-muted-ink" : "text-tunera-ink")
              }
            >
              {renderValue(f.value)}
            </dd>
          </div>
        ))}
      </dl>
    ),
    explore: (
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={exploreHref.brands}
          className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
        >
          {exploreLabels.brands}
        </Link>
        <Link
          href={exploreHref.services}
          className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-5 py-2.5 text-sm text-tunera-ink transition-colors hover:border-tunera-ink/50 hover:bg-tunera-sand/50"
        >
          {exploreLabels.services}
        </Link>
      </div>
    ),
  };

  const payload: NarrativePayload = {
    ariaLabel: c.scrollStory.ariaLabel,
    eyebrow: c.scrollStory.eyebrow,
    variant: "contact",
    stages,
    microContent,
  };

  return <ScrollNarrativeClient payload={payload} />;
}
