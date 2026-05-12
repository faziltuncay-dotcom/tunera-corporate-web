import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Caption } from "./components/Caption";
import { SceneFrame } from "./components/SceneFrame";
import { ClosingScene } from "./scenes/ClosingScene";
import { WebsiteRevealScene } from "./scenes/WebsiteRevealScene";

/**
 * Main 30-second Instagram Reels composition.
 *
 * Scene plan (durations in frames @ 30 FPS):
 *   1. 0–90    Hero            — hero-marine-pair illustration push-in
 *   2. 90–240  Identity        — about-coastal coastal drift
 *   3. 240–420 Brands          — brands-passing slow truck-in
 *   4. 420–630 Services        — service-representation, panel-side scrim
 *   5. 630–810 Website reveal  — phone mock + tilted desktop slab
 *   6. 810–900 Closing card    — logo, URL, micro line
 *
 * Total: 900 frames = 30.00 s.
 *
 * Every scene uses calm motion — slow ken-burns on the background
 * illustration plus a single fade-and-slide caption block. No
 * kinetic typography, no bouncing, no rotation gimmicks. The motion
 * grammar mirrors the website's narrative scroll story.
 */
export const MainReels: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Scene 1 — Hero */}
      <Sequence from={0} durationInFrames={90}>
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
      </Sequence>

      {/* Scene 2 — Identity */}
      <Sequence from={90} durationInFrames={150}>
        <SceneFrame
          imagePath="/assets/brand/web/optimized/about-coastal-2560w.jpg"
          durationInFrames={150}
          scrim={0.42}
          scaleFrom={1.03}
          scaleTo={1.11}
          panFrom={-1}
          panTo={2}
        />
        <Caption
          eyebrow="Kurumsal yaklaşım"
          headline="Satış. Temsil. Hizmet. Rehberlik."
          startFrame={8}
          endFrame={146}
          fadeIn={18}
          fadeOut={16}
          position="bottom"
        />
      </Sequence>

      {/* Scene 3 — Brands */}
      <Sequence from={240} durationInFrames={180}>
        <SceneFrame
          imagePath="/assets/brand/web/optimized/brands-passing-2560w.jpg"
          durationInFrames={180}
          scrim={0.42}
          scaleFrom={1.04}
          scaleTo={1.12}
          panFrom={1}
          panTo={-2}
        />
        <Caption
          eyebrow="Markalar"
          headline="Seçkin markalar için kurumsal merkez."
          subhead="Granfort · Ranieri — Türkiye"
          startFrame={10}
          endFrame={176}
          fadeIn={18}
          fadeOut={16}
          position="bottom"
        />
      </Sequence>

      {/* Scene 4 — Services */}
      <Sequence from={420} durationInFrames={210}>
        <SceneFrame
          imagePath="/assets/brand/web/optimized/service-representation-2560w.jpg"
          durationInFrames={210}
          scrim={0.45}
          scaleFrom={1.04}
          scaleTo={1.13}
          panFrom={-1}
          panTo={1.5}
        />
        <Caption
          eyebrow="Hizmetler"
          headline="Denizcilik süreçlerinde profesyonel yol arkadaşlığı."
          startFrame={12}
          endFrame={206}
          fadeIn={20}
          fadeOut={18}
          position="bottom"
        />
      </Sequence>

      {/* Scene 5 — Website reveal */}
      <Sequence from={630} durationInFrames={180}>
        <WebsiteRevealScene
          mobilePath="/generated/promo-captures/home-mobile.png"
          desktopPath="/generated/promo-captures/brands-desktop.png"
          durationInFrames={180}
        />
        <Caption
          eyebrow="Yayında"
          headline="Yeni kurumsal web sitemiz yayında."
          startFrame={18}
          endFrame={176}
          fadeIn={20}
          fadeOut={16}
          position="top"
        />
      </Sequence>

      {/* Scene 6 — Closing */}
      <Sequence from={810} durationInFrames={90}>
        <ClosingScene durationInFrames={90} />
      </Sequence>
    </AbsoluteFill>
  );
};
