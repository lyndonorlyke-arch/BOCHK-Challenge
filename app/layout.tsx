import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeSafe Credit Co-pilot | BOCHK Challenge 2026",
  description: "AI-powered, auditable trade finance risk assistant for cross-border SMEs."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
