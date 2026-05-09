import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#06121f",
          900: "#0a1a2e",
          800: "#0f2440",
          700: "#143257",
          600: "#1c4476",
        },
        sunset: {
          500: "#e8804a",
          400: "#f0a26b",
          300: "#f5c298",
        },
        ink: {
          50: "#f4f7fb",
          200: "#c3cfdd",
          400: "#7d8fa6",
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
      },
    },
  },
  plugins: [],
};

export default config;
