import type { Config } from "tailwindcss";

// Design tokens (Phase 5) exposed as Tailwind theme — single source of truth.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./features/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gft: {
          black: "#14120F", charcoal: "#2A2724", cream: "#F6F1E7", white: "#FFFFFF",
          red: "#9E1B1B", "red-dark": "#7A1414", gold: "#B08D4F",
          gray100: "#F5F5F4", gray300: "#D6D3CF", gray500: "#8C877E",
          gray700: "#4A463F", gray900: "#1C1B1A",
          success: "#2F6B3A", warning: "#B4741A", error: "#B4291A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: { sm: "4px", lg: "16px" },
    },
  },
  plugins: [],
};
export default config;
