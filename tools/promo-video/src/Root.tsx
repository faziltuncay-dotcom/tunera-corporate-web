import React from "react";
import { Composition } from "remotion";
import { Cover } from "./Cover";
import { MainReels } from "./MainReels";
import { StoryReels } from "./StoryReels";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920;

/**
 * Composition registry for the Tunera promo render pipeline.
 *
 * Three deliverables, all 9:16 1080×1920 at 30 FPS so they slot
 * directly into Instagram Reels / Story without re-encoding:
 *
 *   - ReelsMain   — 900 frames (30 s) main video
 *   - ReelsStory  — 330 frames (11 s) compressed cut
 *   - CoverStill  — single frame still used as the post cover
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelsMain"
        component={MainReels}
        durationInFrames={900}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="ReelsStory"
        component={StoryReels}
        durationInFrames={330}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="CoverStill"
        component={Cover}
        durationInFrames={90}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
