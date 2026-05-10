import Link from "next/link";
import { contact, copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the Contact variant of the scroll narrative.
 *
 * The status stage frames Tunera as a direct point of contact for
 * brand / sales / service enquiries; the channels stage surfaces the
 * real email link plus the two operating addresses (Yönetim Ofisi in
 * Kartal, Operasyon Tesisi in Tuzla); the explore stage routes onward
 * to the brands and services anchors so visitors are not left at a
 * dead end. No phone number is published — none was provided.
 */
export function ContactScrollStory({ locale }: Props) {
  const t = copy(locale);
  const c = t.contactSection;

  const stages = c.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const offices = [
    { label: c.fieldOfficeManagement, ...contact.offices.management },
    { label: c.fieldOfficeOperations, ...contact.offices.operations },
  ];

  const exploreHref =
    locale === "en"
      ? { brands: "/en#brands", services: "/en#services" }
      : { brands: "/tr#markalar", services: "/tr#hizmetler" };
  const exploreLabels =
    locale === "en"
      ? { brands: "Brands", services: "Services" }
      : { brands: "Markalar", services: "Hizmetler" };

  const microContent: NarrativePayload["microContent"] = {
    status: (
      <a
        href={`mailto:${contact.email}`}
        className="inline-flex items-center gap-2 rounded-sm border border-tunera-orange/30 bg-tunera-orange/5 px-4 py-2 text-sm font-medium text-tunera-ink transition-colors hover:border-tunera-orange hover:text-tunera-orange"
      >
        <span aria-hidden className="text-tunera-orange">
          @
        </span>
        {contact.email}
      </a>
    ),
    channels: (
      <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
            {c.fieldEmail}
          </dt>
          <dd className="mt-2 text-sm">
            <a
              href={`mailto:${contact.email}`}
              className="text-tunera-ink underline-offset-4 transition-colors hover:text-tunera-orange hover:underline"
            >
              {contact.email}
            </a>
          </dd>
        </div>
        {offices.map((o) => (
          <div key={o.label}>
            <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-tunera-orange">
              {o.label}
            </dt>
            <dd className="mt-2 text-sm text-tunera-ink">
              <span className="block">{o.line1}</span>
              <span className="mt-1 block text-tunera-muted-ink">{o.line2}</span>
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
