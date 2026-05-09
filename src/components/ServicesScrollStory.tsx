import Link from "next/link";
import { copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the Services variant of the scroll narrative.
 *
 * The first stage shows the full six-area service-model index; the
 * remaining stages spotlight progressively narrower groups (sales,
 * service, trailer/storage/yard) and conclude with branded next-step
 * links. All micro-content is sourced from existing site.ts copy.
 */
export function ServicesScrollStory({ locale }: Props) {
  const t = copy(locale);
  const s = t.servicesPage;

  const stages = s.scrollStory.stages.map((stage) => ({
    id: stage.id,
    kicker: stage.kicker,
    title: stage.title,
    body: stage.body,
  }));

  const ModelChips = ({ from, to }: { from: number; to: number }) => (
    <ol role="list" className="flex flex-wrap items-baseline gap-x-6 gap-y-3">
      {s.modelStrip.slice(from, to).map((label, i) => (
        <li key={label} className="flex items-baseline gap-2">
          <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/70">
            {String(from + i + 1).padStart(2, "0")}
          </span>
          <span className="text-sm font-semibold tracking-tightish text-tunera-ink">{label}</span>
        </li>
      ))}
    </ol>
  );

  const microContent: NarrativePayload["microContent"] = {
    "operating-model": <ModelChips from={0} to={6} />,
    "sales-and-brand": <ModelChips from={0} to={2} />,
    "service-and-maintenance": <ModelChips from={2} to={3} />,
    "trailer-storage-yard": <ModelChips from={3} to={6} />,
    explore: (
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={s.cta.primaryHref}
          className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
        >
          {s.cta.primaryLabel}
        </Link>
        <Link
          href={s.cta.secondaryHref}
          className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-5 py-2.5 text-sm text-tunera-ink transition-colors hover:border-tunera-ink/50 hover:bg-tunera-sand/50"
        >
          {s.cta.secondaryLabel}
        </Link>
      </div>
    ),
  };

  const payload: NarrativePayload = {
    ariaLabel: s.scrollStory.ariaLabel,
    eyebrow: s.scrollStory.eyebrow,
    variant: "services",
    stages,
    microContent,
  };

  return <ScrollNarrativeClient payload={payload} />;
}
