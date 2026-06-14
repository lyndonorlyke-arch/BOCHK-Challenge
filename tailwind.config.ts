import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bank: {
          navy: "#0B234A",
          blue: "#123B6D",
          red: "#A61E2D",
          darkRed: "#8F1725",
          bg: "#F8F9FB",
          ink: "#1F2937",
          muted: "#6B7280",
          line: "#E5E7EB"
        }
      },
      boxShadow: {
        panel: "0 18px 45px rgba(11, 31, 58, 0.10)",
        subtle: "0 8px 20px rgba(11, 31, 58, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
