import Link from "next/link";
import { copy, type Locale } from "@/content/site";
import { ScrollNarrativeClient, type NarrativePayload } from "@/components/ScrollNarrativeClient";

type Props = {
  locale: Locale;
};

/**
 * Server-side wrapper for the About variant of the scroll narrative.
 *
 * About is the only page where the narrative carries the *full*
 * editorial detail — the four values and the four working-structure
 * roles each render as titled tile clusters under the corresponding
 * stage, replacing the previously static Values / Team grids on the
 * page. This is what the brief calls "fully narrative About",
 * deliberately avoiding the half-static-half-animated split.
 */
export function AboutScrollStory({ locale }: Props) {
  const t = copy(locale);
  const a = t.aboutPage;

  const stages = a.scrollStory.stages.map((s) => ({
    id: s.id,
    kicker: s.kicker,
    title: s.title,
    body: s.body,
  }));

  const microContent: NarrativePayload["microContent"] = {
    "experience-vision": (
      <div className="max-w-xl border-l border-tunera-orange/30 pl-5">
        <p className="text-sm leading-relaxed text-tunera-ink/75 sm:text-[15px]">
          {a.story.paragraphs[1]}
        </p>
      </div>
    ),
    "new-era-name": (
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
        {a.newEra.closingLine}
      </p>
    ),
    values: (
      <ol role="list" className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {a.values.items.map((item, i) => (
          <li
            key={item.title}
            className="rounded-sm border border-tunera-stone/55 bg-white/60 p-4 backdrop-blur-[1px]"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold tracking-tightish text-tunera-ink">
                {item.title}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-tunera-ink/75">{item.body}</p>
          </li>
        ))}
      </ol>
    ),
    "working-structure": (
      <ol role="list" className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {a.team.items.map((item, i) => (
          <li
            key={item.title}
            className="rounded-sm border border-tunera-stone/55 bg-white/60 p-4 backdrop-blur-[1px]"
          >
            <div className="flex items-baseline gap-2">
              <span className="text-[11px] font-medium tabular-nums tracking-[0.18em] text-tunera-orange/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold tracking-tightish text-tunera-ink">
                {item.title}
              </span>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-tunera-ink/75">{item.body}</p>
          </li>
        ))}
      </ol>
    ),
    explore: (
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={a.cta.primaryHref}
          className="inline-flex items-center gap-2 rounded-sm bg-tunera-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E64500]"
        >
          {a.cta.primaryLabel}
        </Link>
        <Link
          href={a.cta.secondaryHref}
          className="inline-flex items-center gap-2 rounded-sm border border-tunera-ink/20 px-5 py-2.5 text-sm text-tunera-ink transition-colors hover:border-tunera-ink/50 hover:bg-tunera-sand/50"
        >
          {a.cta.secondaryLabel}
        </Link>
      </div>
    ),
  };

  const payload: NarrativePayload = {
    ariaLabel: a.scrollStory.ariaLabel,
    eyebrow: a.scrollStory.eyebrow,
    variant: "about",
    stages,
    microContent,
  };

  return <ScrollNarrativeClient payload={payload} />;
}
