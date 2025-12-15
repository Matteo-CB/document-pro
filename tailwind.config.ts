import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#059669",
        primaryLight: "#34d399",
        secondary: "#111827",
        accent: "#4f46e5",
        background: "#f8fafc",
        surface: "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        neon: "0 0 20px rgba(5, 150, 105, 0.2)",
        card: "0 10px 30px -10px rgba(0,0,0,0.1)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        spin: "spin 2s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translate3d(0, 30px, 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
