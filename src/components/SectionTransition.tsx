/**
 * Calm ivory spacer band between two content sections.
 *
 * Deliberately plain: no decorative wave motif, no atmospheric drift,
 * no dark gradient absorb. Just an ivory surface and breathing room.
 * Dark↔ivory boundaries are absorbed on the dark side (see
 * `PageVisualBleed` `topAbsorb` / `bottomAbsorb`), so this band only
 * sits between two ivory neighbours and provides editorial whitespace.
 */
export function SectionTransition() {
  return (
    <div aria-hidden className="relative bg-tunera-ivory">
      <div className="h-12 sm:h-16 md:h-20" />
    </div>
  );
}
