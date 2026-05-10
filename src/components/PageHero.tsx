type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Anchor target for one-page navigation. Rendered on the outer section. */
  id?: string;
  /** Heading level for the title. The home hero owns the page's only h1
   *  (rendered inline), so section heros default to h2. */
  headingLevel?: "h1" | "h2";
};

export function PageHero({ eyebrow, title, lead, id, headingLevel = "h2" }: Props) {
  const Heading = headingLevel;
  const titleId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="relative isolate overflow-hidden border-b border-tunera-stone/40 bg-tunera-ivory"
    >
      {/* Shared Tunera wave motif — see `.tunera-wave-motif` in globals.css.
          Top-right fade, 5% opacity, brand-thread continuity across all
          ivory section openings. */}
      <div aria-hidden className="tunera-wave-motif" />
      <div className="relative mx-auto max-w-6xl px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="mb-6 flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-tunera-orange" />
          <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-tunera-orange">
            {eyebrow}
          </span>
        </div>
        <Heading
          id={titleId}
          className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-tighter2 text-tunera-ink sm:text-5xl md:text-6xl"
        >
          {title}
        </Heading>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-tunera-muted-ink sm:text-lg">
          {lead}
        </p>
      </div>
    </section>
  );
}
