type Props = {
  /**
   * Top edge dark→ivory absorb. Use when the previous section is a
   * dark surface (full-bleed image, sticky scroll story). Paints a
   * short graphite→ivory gradient at the section's top edge so the
   * boundary reads as smooth flow instead of a horizontal cut. Same
   * treatment as `PageHero` and `CtaTransition` so every dark→ivory
   * boundary on the site uses one shared technique.
   */
  topAbsorb?: boolean;
  /**
   * Bottom edge ivory→dark absorb. Mirrors `topAbsorb` for sections
   * that lead into a dark surface below. Rarely used — most
   * ivory→dark boundaries on the site are handled by the dark
   * section painting an ivory-to-transparent fade at its own top.
   */
  bottomAbsorb?: boolean;
};

/**
 * Atmospheric bridge band between two surfaces.
 *
 * Visual language is shared with `PageHero` and `CtaTransition` (the
 * "Markalar ve İletişim" pre-footer bridge), so every intermediate
 * surface on the site reads as part of one calm corporate system:
 *
 *   - warm ivory→sand vertical gradient surface
 *   - `.tunera-wave-motif--seam` shared brand-thread motif
 *   - optional top/bottom dark-edge absorbs that smooth the join with
 *     a dark neighbour
 *
 * No content; this is a purely atmospheric band used between two
 * already-titled content sections. Decorative — `aria-hidden`,
 * `pointer-events-none`. Reduced motion is handled in globals.css.
 */
export function SectionTransition({ topAbsorb = false, bottomAbsorb = false }: Props) {
  return (
    <div
      aria-hidden
      className="relative isolate overflow-hidden bg-gradient-to-b from-tunera-ivory to-tunera-sand/55"
    >
      <div className="tunera-section-veil tunera-wave-motif--seam" />
      {topAbsorb ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tunera-graphite/35 via-tunera-graphite/10 to-tunera-ivory/0" />
      ) : null}
      {bottomAbsorb ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-tunera-sand/0 via-tunera-graphite/15 to-tunera-graphite/55" />
      ) : null}
      <div className="h-16 sm:h-20 md:h-24" />
    </div>
  );
}
