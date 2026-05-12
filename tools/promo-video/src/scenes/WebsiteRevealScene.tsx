import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { colors } from "../theme";

type Props = {
  /**
   * Path to the mobile screenshot (relative to the Tunera public/
   * folder). Rendered inside the floating phone mock.
   */
  mobilePath: string;
  /**
   * Path to the desktop screenshot. Rendered as a slightly tilted
   * laptop-ish slab behind and to the right of the phone so the eye
   * reads "the new website" rather than a single device.
   */
  desktopPath: string;
  /**
   * Total length of this scene in frames. Used to normalise the
   * device entry animation. The component reads `useCurrentFrame`
   * directly — the surrounding `<Sequence>` already shifts the frame
   * counter so the local timeline starts at 0.
   */
  durationInFrames: number;
};

/**
 * Website reveal scene — Scene 5 of the main reels.
 *
 * Composition stays calm on purpose: a graphite stage with a soft
 * vignette, the freshly captured mobile screenshot inside a
 * rounded-corner "phone" frame floating at slight tilt, and the
 * desktop screenshot sliding in behind it from the right. Both
 * surfaces animate with the same Apple-leaning ease-out used by the
 * rest of the composition.
 *
 * Why no real 3D mockup chrome:
 *   - we don't ship a phone-bezel PNG in the repo, and downloading
 *     one would violate the project discipline ("no random image
 *     downloads"),
 *   - the brand language is understated; a heavy 3D phone would
 *     fight that.
 */
export const WebsiteRevealScene: React.FC<Props> = ({
  mobilePath,
  desktopPath,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const t = Math.max(0, Math.min(1, frame / durationInFrames));

  const phoneEnter = interpolate(t, [0, 0.25], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneOpacity = interpolate(t, [0, 0.18, 0.85, 1], [0, 1, 1, 0.95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const desktopEnter = interpolate(t, [0.08, 0.4], [200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const desktopOpacity = interpolate(t, [0.08, 0.32, 0.85, 1], [0, 0.85, 0.85, 0.85], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.graphite, overflow: "hidden" }}>
      {/* Tunera wave pattern faded in the back so this scene reads as
          part of the brand surface, not a generic mockup template. */}
      <Img
        src={staticFile("/assets/brand/tunera/tunera-pattern.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.06,
          filter: "invert(1)",
        }}
      />
      {/* Soft radial vignette so the device sits on a calm centre. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(21,18,18,0) 0%, rgba(21,18,18,0.55) 70%, rgba(21,18,18,0.85) 100%)",
        }}
      />

      {/* Desktop slab — tilted, partly cropped by the phone in front */}
      <div
        style={{
          position: "absolute",
          right: -120,
          top: 540,
          width: 980,
          height: 612,
          opacity: desktopOpacity,
          transform: `translateX(${desktopEnter}px) rotate(-3deg)`,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
          border: `1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <Img
          src={staticFile(desktopPath)}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>

      {/* Phone — rounded slab with a tiny notch hint. */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 380,
          width: 520,
          height: 1120,
          transform: `translate(-50%, ${phoneEnter}px) rotate(-1.2deg)`,
          opacity: phoneOpacity,
          padding: 14,
          borderRadius: 56,
          background: "linear-gradient(180deg, #2a2627 0%, #14110f 100%)",
          boxShadow:
            "0 60px 110px -28px rgba(0,0,0,0.75), 0 12px 24px -6px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: 44,
            overflow: "hidden",
            backgroundColor: colors.ivory,
          }}
        >
          <Img
            src={staticFile(mobilePath)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
          {/* Subtle notch hint */}
          <div
            style={{
              position: "absolute",
              top: 14,
              left: "50%",
              transform: "translateX(-50%)",
              width: 120,
              height: 28,
              borderRadius: 14,
              backgroundColor: "rgba(20,17,15,0.92)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
