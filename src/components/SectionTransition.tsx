type Props = {
  /** Surface tone of the seam itself. Defaults to ivory. */
  surface?: "ivory" | "sand";
};

/**
 * Brand seam used at narrative pivots between same-tone sections.
 *
 * A small band carrying:
 *   - a faint Tunera wave-pattern wash (~3.5% opacity), so the seam
 *     reads as part of the brand rather than a generic divider
 *   - a centered hairline in tunera-orange/55 — the recurring micro-rule
 *     that runs through the design system (also used as the eyebrow
 *     rule and on card top edges)
 *
 * The band is decorative; it carries `aria-hidden` and no interactive
 * content. Pages should use this where adjacent sections share a tone
 * and would otherwise blur into one block (e.g. ivory → ivory).
 */
export function SectionTransition({ surface = "ivory" }: Props) {
  const bg = surface === "sand" ? "bg-tunera-sand/45" : "bg-tunera-ivory";
  return (
    <div aria-hidden className={`relative isolate overflow-hidden ${bg}`}>
      <div className="pointer-events-none absolute inset-0 bg-tunera-pattern bg-cover bg-center opacity-[0.035]" />
      <div className="relative flex justify-center py-7 sm:py-8">
        <span className="h-px w-14 bg-tunera-orange/55" />
      </div>
    </div>
  );
}
