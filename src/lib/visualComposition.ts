/**
 * Image-aware visual composition helpers.
 *
 * Each editorial illustration on the site has its own subject focal
 * point (boats, lighthouse, lift, hangar, figures). The floating copy
 * panel must sit in the image's *safe zone* — the area that does not
 * compete with that subject — so a one-size-fits-all "panel-left"
 * placement is wrong.
 *
 * `PanelPlacement` enumerates the six placements we use across the
 * site, and `panelPlacementClasses()` returns the Tailwind utility
 * strings consumers need:
 *
 *   - `flexClass`     — applied to the lg+ flex container that wraps
 *                       the panel; chooses items-{start|center|end}
 *                       and justify-{start|end}.
 *   - `gradientClass` — applied to the lg+ side gradient overlay so
 *                       the dark fade always sits under the panel
 *                       and the imagery stays open on the opposite
 *                       side. Mobile keeps a separate bottom-up
 *                       overlay since panels stack to the bottom on
 *                       small surfaces regardless of placement.
 *
 * One source of truth keeps the Home hero, PageVisualBleed (About /
 * Brands / Contact), and ServicesStickyStory visually consistent.
 */

export type PanelPlacement =
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

/**
 * Per-placement readability gradient.
 *
 * The pure `left` / `right` placements anchor the panel mid-vertically,
 * so they need a full-column horizontal gradient — the panel covers the
 * full vertical band on its side. The four corner placements only sit
 * in one corner; their gradient is *diagonal*, anchored at the panel's
 * corner and fading out toward the opposite corner. That keeps the
 * sun / sky / distant horizon bright on the side opposite the panel
 * — important for these illustrations where the sunset and the boat
 * frequently sit on opposite halves.
 */
const GRADIENTS: Record<PanelPlacement, string> = {
  left: "bg-gradient-to-r from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0",
  right: "bg-gradient-to-l from-tunera-graphite/85 via-tunera-graphite/35 to-tunera-graphite/0",
  "top-left":
    "bg-gradient-to-br from-tunera-graphite/85 via-tunera-graphite/25 to-tunera-graphite/0",
  "top-right":
    "bg-gradient-to-bl from-tunera-graphite/85 via-tunera-graphite/25 to-tunera-graphite/0",
  "bottom-left":
    "bg-gradient-to-tr from-tunera-graphite/85 via-tunera-graphite/25 to-tunera-graphite/0",
  "bottom-right":
    "bg-gradient-to-tl from-tunera-graphite/85 via-tunera-graphite/25 to-tunera-graphite/0",
};

export function panelPlacementClasses(p: PanelPlacement): {
  flexClass: string;
  gradientClass: string;
} {
  const isRight = p.endsWith("right");
  const justify = isRight ? "lg:justify-end" : "lg:justify-start";

  const items = p.startsWith("top-")
    ? "lg:items-start"
    : p.startsWith("bottom-")
      ? "lg:items-end"
      : "lg:items-center";

  return {
    flexClass: `${items} ${justify}`,
    gradientClass: GRADIENTS[p],
  };
}
