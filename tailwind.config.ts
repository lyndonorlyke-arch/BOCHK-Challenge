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
          navy: "#0B1F3A",
          blue: "#123B6D",
          red: "#C8102E",
          darkRed: "#B5121B",
          bg: "#F6F8FB",
          ink: "#1F2937",
          muted: "#6B7280",
          line: "#DDE4EE"
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
