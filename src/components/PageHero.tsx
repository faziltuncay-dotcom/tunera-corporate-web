type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Anchor target for one-page navigation. Rendered on the outer section. */
  id?: string;
  /** Heading level for the title. The home hero owns the page's only h1
   *  (rendered inline), so section heros default to h2. */
  headingLevel?: "h1" | "h2";
  /**
   * When the hero is wrapped inside a shared container that already
   * paints the background (e.g. the Hizmetler intro that flows
   * directly into the model strip), pass `bare` to suppress this
   * section's own background colour so the parent's surface stays
   * continuous across both sub-sections.
   */
  bare?: boolean;
};

/**
 * Page / section intro block.
 *
 * Deliberately calm and pattern-free: plain warm-ivory surface, a
 * single thin orange accent line prefixing the eyebrow, a strong
 * understated heading, and a lead paragraph capped at a readable
 * column width. There is no decorative wave motif, no full-surface
 * texture, and no heavy shadow at the boundary with adjacent
 * sections — the visual rhythm comes from typography and
 * whitespace, not from layered atmospheric pattern.
 *
 * The wave motif is intentionally reserved for the pre-footer
 * `CtaTransition` bridge so it stays meaningful there. Section
 * boundaries with adjacent dark scenes (Hero, full-bleed image,
 * sticky scroll story) are absorbed on the *dark* side instead — see
 * `PageVisualBleed` `topAbsorb` / `bottomAbsorb` and the matching
 * fade at the top of `ServicesStickyStory` — so the dark scene rises
 * out of the ivory page without painting a dark band over the ivory
 * intro itself.
 */
export function PageHero({ eyebrow, title, lead, id, headingLevel = "h2", bare = false }: Props) {
  const Heading = headingLevel;
  const titleId = id ? `${id}-title` : undefined;
  const sectionClass = bare ? "relative" : "relative isolate bg-tunera-ivory";
  return (
    <section id={id} aria-labelledby={titleId} className={sectionClass}>
      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-16 md:py-20 lg:py-24">
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
