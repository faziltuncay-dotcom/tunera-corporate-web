import type { Config } from "tailwindcss";

/**
 * Tunera brand color tokens.
 *
 * Primary palette comes from the official brand materials in
 * `brand/source/tunera/`. Derived UI support tones are documented in
 * `docs/tunera-brand-system.md`.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        tunera: {
          orange: "#FF4D00",
          ink: "#231F20",
          black: "#000000",
          white: "#FFFFFF",
          ivory: "#FFF7F0",
          sand: "#F2E7DE",
          stone: "#D8CDC4",
          graphite: "#151212",
          "muted-ink": "#5F5652",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightish: "-0.01em",
        tighter2: "-0.02em",
        tighter3: "-0.03em",
      },
      backgroundImage: {
        "tunera-pattern": "url('/assets/brand/tunera/tunera-pattern.png')",
        "tunera-emblem": "url('/assets/brand/tunera/tunera-emblem.png')",
      },
    },
  },
  plugins: [],
};

export default config;
