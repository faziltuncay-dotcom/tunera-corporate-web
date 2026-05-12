import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { FONT_STACK, colors } from "../theme";

type Props = {
  /**
   * Total length of this scene in frames. The component reads
   * `useCurrentFrame` directly — the surrounding `<Sequence>` shifts
   * the frame counter so the local timeline starts at 0.
   */
  durationInFrames: number;
};

/**
 * Final scene — calm graphite stage with the Tunera logomark, the
 * site URL, and the small contact-and-explore line. Acts as the
 * "card" the viewer is left with after the scroll storytelling
 * resolves.
 *
 * No marketing claims, no awards, no SLAs — only what the project
 * discipline whitelists ("tunera.com.tr", "Markaları keşfet.
 * İletişime geç.") and a softly drifting pattern in the back.
 */
export const ClosingScene: React.FC<Props> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, Math.min(1, frame / durationInFrames));

  const logoOpacity = interpolate(t, [0, 0.2, 0.95, 1], [0, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlOpacity = interpolate(t, [0.15, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const microOpacity = interpolate(t, [0.4, 0.7], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.graphite,
        fontFamily: FONT_STACK,
        overflow: "hidden",
      }}
    >
      <Img
        src={staticFile("/assets/brand/tunera/tunera-pattern.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.05,
          filter: "invert(1)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,77,0,0.06) 0%, rgba(21,18,18,0) 60%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 56,
          paddingInline: 80,
          textAlign: "center",
        }}
      >
        <Img
          src={staticFile("/assets/brand/tunera/tunera-logo-white.png")}
          style={{
            width: 640,
            height: "auto",
            opacity: logoOpacity,
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.4))",
          }}
        />

        <div
          style={{
            opacity: urlOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: colors.orange,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                display: "inline-block",
                height: 2,
                width: 56,
                backgroundColor: colors.orange,
                borderRadius: 1,
              }}
            />
            <span>Yeni Dönem</span>
            <span
              style={{
                display: "inline-block",
                height: 2,
                width: 56,
                backgroundColor: colors.orange,
                borderRadius: 1,
              }}
            />
          </div>
          <div
            style={{
              fontSize: 80,
              letterSpacing: "-0.02em",
              fontWeight: 600,
              color: colors.ivory,
            }}
          >
            tunera.com.tr
          </div>
        </div>

        <p
          style={{
            opacity: microOpacity,
            margin: 0,
            fontSize: 30,
            color: "rgba(255,247,240,0.8)",
            letterSpacing: "-0.005em",
          }}
        >
          Markaları keşfet. İletişime geç.
        </p>
      </div>
    </AbsoluteFill>
  );
};
