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
   * When the hero is wrapped inside a shared atmospheric container that
   * already paints the ivory surface and wave motif (e.g. the Hizmetler
   * intro that flows directly into the model strip), pass `bare` to
   * suppress this component's own background, motif, and bottom border
   * so the parent's surface stays continuous across both sub-sections.
   */
  bare?: boolean;
  /**
   * Top edge dark→ivory absorb. Use when the previous section is a
   * dark surface (Hero, full-bleed image scene, sticky scroll story).
   * Paints a short graphite→ivory gradient at the section's top edge
   * so the dark scene above flows into this ivory intro instead of
   * presenting a hard horizontal cut. Same treatment as the top of
   * `CtaTransition` so every dark→ivory boundary on the site reads
   * the same.
   */
  topAbsorb?: boolean;
  /**
   * Bottom edge ivory→dark absorb. Use when the next section is a
   * dark surface (full-bleed image scene). Paints a short
   * sand→graphite gradient at the section's bottom edge — same
   * treatment as the bottom of `CtaTransition` flowing into the
   * Footer.
   */
  bottomAbsorb?: boolean;
};

/**
 * Page / section intro block.
 *
 * Visual language is shared with `CtaTransition` (the
 * "Markalar ve İletişim" pre-footer bridge) so every intermediate
 * surface on the site reads as part of one calm corporate system:
 *
 *   - warm ivory→sand vertical gradient surface
 *   - `.tunera-wave-motif--seam` shared brand-thread motif
 *   - orange eyebrow rail prefixing an uppercase spaced label
 *   - generous editorial padding
 *   - optional top/bottom dark-edge absorb bands so adjacent dark
 *     sections (Hero, PageVisualBleed, ServicesStickyStory) flow
 *     into / out of the ivory surface without horizontal cuts
 *
 * Unlike the centered CtaTransition, the intro block stays
 * **left-aligned** because it leads page or section reading flow.
 * The eyebrow uses a single left rail (not the centered dual rails),
 * the heading aligns left at all breakpoints, and the lead paragraph
 * caps at `max-w-2xl` so editorial line length stays readable.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  id,
  headingLevel = "h2",
  bare = false,
  topAbsorb = false,
  bottomAbsorb = false,
}: Props) {
  const Heading = headingLevel;
  const titleId = id ? `${id}-title` : undefined;
  const sectionClass = bare
    ? "relative"
    : "relative isolate overflow-hidden bg-gradient-to-b from-tunera-ivory to-tunera-sand/55";
  return (
    <section id={id} aria-labelledby={titleId} className={sectionClass}>
      {bare ? null : (
        // Shared Tunera wave motif — see `.tunera-wave-motif--seam` in
        // globals.css. Same coords and opacity as CtaTransition / other
        // intermediate sections, so the wave crests read as one
        // continuous thread across every ivory surface on the site.
        <div aria-hidden className="tunera-wave-motif--seam" />
      )}
      {!bare && topAbsorb ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tunera-graphite/35 via-tunera-graphite/10 to-tunera-ivory/0"
        />
      ) : null}
      {!bare && bottomAbsorb ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-tunera-sand/0 via-tunera-graphite/15 to-tunera-graphite/55"
        />
      ) : null}
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
