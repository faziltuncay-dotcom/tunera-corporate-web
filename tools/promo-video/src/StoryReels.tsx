import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Caption } from "./components/Caption";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingScene } from "./scenes/ClosingScene";
import { WebsiteRevealScene } from "./scenes/WebsiteRevealScene";

/**
 * Story / Reels short — 330 frames = 11.00 s @ 30 FPS.
 *
 * Three beats, sharing every primitive with the main composition so
 * the brand reads identically:
 *   1.   0–120 Hero            — "Denizcilikte yeni dönem."
 *   2. 120–240 Website reveal  — "Yeni kurumsal web sitemiz yayında."
 *   3. 240–330 Closing card    — tunera.com.tr
 *
 * No new motion vocabulary, no extra copy — purely a compressed
 * pass through the main story.
 */
export const StoryReels: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={120}>
        <SceneFrame
          imagePath="/assets/brand/web/optimized/hero-marine-pair-2560w.jpg"
          durationInFrames={120}
          scrim={0.5}
          scaleFrom={1.06}
          scaleTo={1.14}
        />
        <Caption
          eyebrow="Tunera Denizcilik"
          headline="Denizcilikte yeni dönem."
          startFrame={6}
          endFrame={116}
          fadeIn={18}
          fadeOut={16}
          position="bottom"
        />
      </Sequence>

      <Sequence from={120} durationInFrames={120}>
        <WebsiteRevealScene
          mobilePath="/generated/promo-captures/home-mobile.png"
          desktopPath="/generated/promo-captures/brands-desktop.png"
          durationInFrames={120}
        />
        <Caption
          eyebrow="Yayında"
          headline="Yeni kurumsal web sitemiz yayında."
          startFrame={14}
          endFrame={116}
          fadeIn={18}
          fadeOut={16}
          position="top"
        />
      </Sequence>

      <Sequence from={240} durationInFrames={90}>
        <ClosingScene durationInFrames={90} />
      </Sequence>
    </AbsoluteFill>
  );
};
