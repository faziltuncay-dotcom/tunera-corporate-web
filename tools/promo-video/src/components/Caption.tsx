import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_STACK, SAFE_BOTTOM, SAFE_TOP, colors } from "../theme";

type Props = {
  /** Heading line — the load-bearing piece of copy for the scene. */
  headline: string;
  /** Smaller line under (or above) the headline. Optional. */
  subhead?: string;
  /** Tiny uppercase eyebrow rendered in tunera-orange. Optional. */
  eyebrow?: string;
  /** Where the block sits vertically: top safe area or bottom safe area. */
  position?: "top" | "bottom" | "center";
  /** Frame at which the caption begins fading in. */
  startFrame: number;
  /** Frame at which the caption begins fading out. */
  endFrame: number;
  /** Frames the fade-in / fade-out take. Defaults match the scene FX. */
  fadeIn?: number;
  fadeOut?: number;
  /** Text colour — defaults to ivory; switch to ink for ivory backgrounds. */
  tone?: "light" | "dark";
};

/**
 * Caption block used across every scene. Drops the headline + a
 * smaller subhead inside Instagram's vertical safe area so the
 * platform's overlays (sender chip on top, profile/CTA chips on
 * bottom) don't cover important text.
 *
 * Motion vocabulary is intentionally calm:
 *   - opacity fade tied to `startFrame` / `endFrame` with separate
 *     `fadeIn` / `fadeOut` ramps,
 *   - a 24 px upward slide that resolves on entry only,
 *   - an orange hairline rule above the eyebrow that grows from 0 to
 *     56 px width during the fade-in so the headline lands on a
 *     visible mark rather than appearing mid-air.
 *
 * No kinetic typography, no character-by-character reveals, no
 * bouncing. The website's narrative animation grammar maps directly
 * onto this.
 */
export const Caption: React.FC<Props> = ({
  headline,
  subhead,
  eyebrow,
  position = "bottom",
  startFrame,
  endFrame,
  fadeIn = 14,
  fadeOut = 14,
  tone = "light",
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [startFrame, startFrame + fadeIn, endFrame - fadeOut, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const translate = interpolate(frame, [startFrame, startFrame + fadeIn], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const railWidth = interpolate(frame, [startFrame, startFrame + fadeIn], [0, 56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const headlineColor = tone === "light" ? colors.ivory : colors.ink;
  const subheadColor = tone === "light" ? "rgba(255,247,240,0.78)" : colors.mutedInk;

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: 88,
    right: 88,
    opacity,
    transform: `translateY(${translate}px)`,
    fontFamily: FONT_STACK,
  };

  if (position === "top") containerStyle.top = SAFE_TOP;
  else if (position === "bottom") containerStyle.bottom = SAFE_BOTTOM;
  else {
    containerStyle.top = "50%";
    containerStyle.transform = `translate(0, calc(-50% + ${translate}px))`;
  }

  return (
    <div style={containerStyle}>
      {eyebrow ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              display: "inline-block",
              height: 2,
              width: railWidth,
              backgroundColor: colors.orange,
              borderRadius: 1,
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: colors.orange,
            }}
          >
            {eyebrow}
          </span>
        </div>
      ) : null}
      <h1
        style={{
          margin: 0,
          fontSize: 84,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
          fontWeight: 600,
          color: headlineColor,
          textShadow: tone === "light" ? "0 6px 28px rgba(0,0,0,0.35)" : "none",
        }}
      >
        {headline}
      </h1>
      {subhead ? (
        <p
          style={{
            marginTop: 30,
            fontSize: 32,
            lineHeight: 1.4,
            color: subheadColor,
            fontWeight: 400,
            letterSpacing: "-0.005em",
            textShadow: tone === "light" ? "0 4px 18px rgba(0,0,0,0.35)" : "none",
            maxWidth: 720,
          }}
        >
          {subhead}
        </p>
      ) : null}
    </div>
  );
};
