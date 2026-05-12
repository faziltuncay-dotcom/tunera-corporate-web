import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { EASE_OUT_EXPO, colors } from "../theme";

type Props = {
  /**
   * Path relative to the Tunera project's `public/` directory.
   * Resolved by Remotion through `staticFile()` because
   * `remotion.config.ts` points `publicDir` at `../../public`.
   */
  imagePath: string;
  /**
   * Length of THIS scene in frames. Used to drive the ken-burns
   * normalisation so every scene reaches the same end-state regardless
   * of duration.
   */
  durationInFrames: number;
  /**
   * Optional darkening overlay strength (0 → none, 1 → solid). The
   * hero scene uses a heavier scrim so the headline reads against the
   * marine illustration without a panel behind it.
   */
  scrim?: number;
  /**
   * Optional starting / ending scale for the ken-burns. Defaults to a
   * subtle 1.04 → 1.10 push-in.
   */
  scaleFrom?: number;
  scaleTo?: number;
  /**
   * Optional horizontal offset percentage at start / end so individual
   * scenes can drift the crop in different directions.
   */
  panFrom?: number;
  panTo?: number;
};

/**
 * Full-bleed image background with a slow ken-burns motion + optional
 * darkening scrim. The component is composition-agnostic — every
 * scene supplies the image path, the duration, and (optionally) the
 * camera move it wants.
 *
 * Why explicit easing instead of `spring()`:
 *   - the Tunera site is calm and editorial; bouncing scale curves
 *     would clash with the rest of the brand,
 *   - `interpolate(...)` lets us share the same Apple-leaning
 *     ease-out the website's scroll narrative uses
 *     (`EASE_OUT_EXPO`),
 *   - rendering is deterministic for the same frame count, so
 *     re-runs produce identical pixels.
 */
export const SceneFrame: React.FC<Props> = ({
  imagePath,
  durationInFrames,
  scrim = 0.45,
  scaleFrom = 1.04,
  scaleTo = 1.1,
  panFrom = 0,
  panTo = 0,
}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, durationInFrames], [scaleFrom, scaleTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => bezier(t, EASE_OUT_EXPO),
  });
  const pan = interpolate(frame, [0, durationInFrames], [panFrom, panTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => bezier(t, EASE_OUT_EXPO),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.graphite, overflow: "hidden" }}>
      <Img
        src={staticFile(imagePath)}
        style={{
          position: "absolute",
          width: "118%",
          height: "118%",
          left: `${-9 + pan}%`,
          top: "-9%",
          objectFit: "cover",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(21,18,18,${scrim * 0.55}) 0%, rgba(21,18,18,${scrim * 0.2}) 40%, rgba(21,18,18,${scrim}) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};

/**
 * Minimal cubic-bezier evaluator. Inline so we don't pull in a math
 * dependency; Remotion's `Easing` helper accepts a function and we
 * mirror the website's `cubic-bezier(0.22, 1, 0.36, 1)` here. The
 * approximation is Newton-Raphson with a small fixed iteration count
 * which is plenty accurate for animation easing.
 */
function bezier(t: number, [p1x, p1y, p2x, p2y]: [number, number, number, number]): number {
  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  let x = t;
  for (let i = 0; i < 6; i += 1) {
    const xValue = ((ax * x + bx) * x + cx) * x;
    const derivative = (3 * ax * x + 2 * bx) * x + cx;
    if (derivative === 0) break;
    x -= (xValue - t) / derivative;
  }
  return ((ay * x + by) * x + cy) * x;
}
