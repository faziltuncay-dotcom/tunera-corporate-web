type Props = {
  /**
   * Surface treatment of the seam itself.
   *
   * - `ivory` (default) — solid ivory band. Use between two ivory
   *   sections; the seam disappears against its neighbours and only
   *   the masked, drifting wave-pattern reads as connective brand
   *   atmosphere.
   *
   * - `to-sand` — vertical gradient from ivory at the top to
   *   `tunera-sand/60` at the bottom. Use at boundaries where the
   *   section above is ivory and the section below is a sand band, so
   *   the surface morphs smoothly instead of presenting a hard
   *   colour-change edge.
   */
  surface?: "ivory" | "to-sand";
};

/**
 * Section-flow veil at narrative pivots.
 *
 * Replaces the previous "pattern band + centered orange line"
 * separator. The new treatment is a soft brand-flow dissolve:
 *
 *   - the wrapper either matches the surrounding tone or smoothly
 *     morphs surface colour, so its top and bottom edges never read
 *     as a hard band
 *   - a single decorative pattern layer carries `.tunera-section-veil`
 *     (vertical mask-gradient that fades the pattern in and out at
 *     top/bottom + slow horizontal drift on a 36s loop, transform-only)
 *
 * Decorative; `aria-hidden`, `pointer-events-none`. No interactive
 * content. Reduced motion is handled in `globals.css`.
 */
export function SectionTransition({ surface = "ivory" }: Props) {
  const bg =
    surface === "to-sand"
      ? "bg-gradient-to-b from-tunera-ivory to-tunera-sand/60"
      : "bg-tunera-ivory";
  return (
    <div aria-hidden className={`relative isolate overflow-hidden ${bg}`}>
      <div className="tunera-section-veil pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.028]" />
      <div className="h-20 sm:h-28 md:h-32" />
    </div>
  );
}
