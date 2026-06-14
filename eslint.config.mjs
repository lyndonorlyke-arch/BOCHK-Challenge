import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: [".next/**", ".vercel/**", "outputs/**", "bochk-tradesafe-reference/**", "next-env.d.ts"]
  }
];

export default config;
