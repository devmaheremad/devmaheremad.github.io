import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import { profile } from "@/content/site";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Inter_Tight({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://devmaheremad.github.io"),
  title: `${profile.name} — ${profile.role}`,
  description: profile.intro,
  authors: [{ name: profile.name }],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    type: "website",
    url: "/",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", creator: "@devmaheremad" },
};

export const viewport: Viewport = { themeColor: "#07070a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <Preloader />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
