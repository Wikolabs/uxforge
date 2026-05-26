import type { Metadata } from "next";
import { Paytone_One, Quicksand } from "next/font/google";
import "./globals.css";

const paytoneOne = Paytone_One({ subsets: ["latin"], weight: "400", variable: "--font-display", display: "swap" });
const quicksand = Quicksand({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "UXForge — Analysez 1 000 retours utilisateurs en 10 minutes",
  description: "Analyse IA de feedback UX multi-source. Détection automatique des friction points. Recommandations actionnables priorisées.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${paytoneOne.variable} ${quicksand.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#fdf4ff" }}>{children}</body>
    </html>
  );
}
