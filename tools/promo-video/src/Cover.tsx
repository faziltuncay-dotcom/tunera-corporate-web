import React from "react";
import { AbsoluteFill } from "remotion";
import { Caption } from "./components/Caption";
import { SceneFrame } from "./components/SceneFrame";

/**
 * Single-frame still used as the Reels cover. Mirrors the opening
 * frame of `MainReels` so the cover and the start of the video read
 * as the same picture, just frozen.
 *
 * Rendered with `remotion still ... --frame=45`, i.e. 1.5 s into the
 * hero scene — the camera has pushed in slightly and the headline
 * has finished its fade-in, so the cover already shows the headline
 * cleanly aligned with the marine illustration behind it.
 */
export const Cover: React.FC = () => {
  return (
    <AbsoluteFill>
      <SceneFrame
        imagePath="/assets/brand/web/optimized/hero-marine-pair-2560w.jpg"
        durationInFrames={90}
        scrim={0.5}
        scaleFrom={1.06}
        scaleTo={1.14}
      />
      <Caption
        eyebrow="Tunera Denizcilik"
        headline="Denizcilikte yeni dönem."
        startFrame={6}
        endFrame={86}
        fadeIn={18}
        fadeOut={14}
        position="bottom"
      />
    </AbsoluteFill>
  );
};
