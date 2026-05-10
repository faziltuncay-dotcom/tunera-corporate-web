import { BrandCard } from "@/components/BrandCard";
import { brands, copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the Brands variant of the scroll narrative.
 *
 * The hub stage shows two compact status pills (Granfort / Ranieri);
 * the per-brand stages render the existing BrandCard so visitors can
 * jump straight into the active brand or read the coming-soon note.
 */
export function BrandsScrollStory({ locale }: Props) {
  const t = copy(locale);
  const b = t.brandsSection;
  const granfort = brands.find((x) => x.id === "granfort")!;
  const ranieri = brands.find((x) => x.id === "ranieri")!;

  const stages = b.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const microContent: NarrativePayload["microContent"] = {
    "brand-hub": (
      <ul role="list" className="flex flex-wrap gap-3 text-sm">
        <li className="inline-flex items-center gap-2 rounded-full border border-tunera-orange/30 bg-tunera-orange/5 px-3 py-1.5 text-tunera-ink">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-tunera-orange" />
          <span className="font-semibold tracking-tightish">Granfort</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-tunera-orange">
            {b.statusActive}
          </span>
        </li>
        <li className="inline-flex items-center gap-2 rounded-full border border-tunera-ink/15 px-3 py-1.5 text-tunera-muted-ink">
          <span className="font-semibold tracking-tightish">Ranieri</span>
          <span className="text-[10px] uppercase tracking-[0.18em]">{b.statusComingSoon}</span>
        </li>
      </ul>
    ),
    granfort: (
      <BrandCard
        locale={locale}
        id={granfort.id}
        name={granfort.name}
        status={granfort.status}
        href={granfort.href}
        external={granfort.external}
        isProduction={granfort.isProduction}
      />
    ),
    ranieri: (
      <BrandCard
        locale={locale}
        id={ranieri.id}
        name={ranieri.name}
        status={ranieri.status}
        href={ranieri.href}
        external={ranieri.external}
        isProduction={ranieri.isProduction}
      />
    ),
  };

  const payload: NarrativePayload = {
    ariaLabel: b.scrollStory.ariaLabel,
    eyebrow: b.scrollStory.eyebrow,
    variant: "brands",
    stages,
    microContent,
  };

  return <ScrollNarrativeClient payload={payload} />;
}
