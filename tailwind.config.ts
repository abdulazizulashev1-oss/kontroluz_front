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
        industrial: {
          blue: {
            DEFAULT: "#004094",
            dark: "#002b68",
            light: "#8eb0ff",
            container: "#004094",
          },
          orange: {
            DEFAULT: "#FF6B00",
            dark: "#a04100",
            light: "#ffb693",
            container: "#fe6b00",
          },
          safety: {
            DEFAULT: "#009BDF",
            dark: "#00496c",
            light: "#4dbbff",
          },
          surface: {
            DEFAULT: "#F9F9FC",
            card: "#FFFFFF",
            dim: "#DADADC",
            low: "#F3F3F6",
            container: "#EEEEF0",
            high: "#E8E8EA",
            highest: "#E2E2E5",
          },
          text: {
            DEFAULT: "#1A1C1E",
            muted: "#434752",
            inverse: "#F0F0F3",
          },
          border: {
            DEFAULT: "#DEE2E6",
            subtle: "#C3C6D3",
            dark: "#737783",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        sm: "0.125rem", // 2px
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem", // 12px
      },
      maxWidth: {
        "7xl": "1280px",
      },
      boxShadow: {
        industrial: "0 4px 20px rgba(0, 64, 148, 0.06)",
        "industrial-lg": "0 8px 30px rgba(0, 64, 148, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
