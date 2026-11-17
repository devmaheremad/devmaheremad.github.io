import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import { profile } from "@/content/site";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Inter_Tight({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const SITE = "https://devmaheremad.com";
const HANDLE = "devmaheremad";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${profile.name} (${HANDLE}) — ${profile.role}`, template: `%s — ${profile.name}` },
  description: "Maher Almashharawi (devmaheremad), Senior Frontend Engineer: fast, accessible React and Next.js frontends for SaaS, e-commerce and booking. 5+ years, remote.",
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  keywords: [profile.name, HANDLE, profile.role, "React", "Next.js", "TypeScript", "Frontend Engineer", "Web Performance"],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.intro,
    type: "profile",
    firstName: profile.first,
    lastName: profile.last,
    username: HANDLE,
    url: "/",
    siteName: profile.name,
  },
  twitter: { card: "summary_large_image", creator: `@${HANDLE}` },
};

// Schema.org data so search engines know that "devmaheremad", this site and the profiles below are one person.
// Every fact here is already on the site and in the CV.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE}/#person`,
      name: profile.name,
      givenName: profile.first,
      familyName: profile.last,
      alternateName: HANDLE,
      jobTitle: profile.role,
      description: profile.intro,
      url: SITE,
      image: `https://github.com/${HANDLE}.png`,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressCountry: "PS" },
      knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Frontend architecture", "Web performance", "Core Web Vitals", "Accessibility", "Design systems"],
      sameAs: profile.links.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: profile.name,
      alternateName: HANDLE,
      url: SITE,
      publisher: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/#profilepage`,
      url: SITE,
      name: `${profile.name} — ${profile.role}`,
      mainEntity: { "@id": `${SITE}/#person` },
      isPartOf: { "@id": `${SITE}/#website` },
    },
  ],
};

export const viewport: Viewport = { themeColor: "#07070a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {profile.links.map((l) => (
          <link key={l.href} rel="me" href={l.href} />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Preloader />
        <Cursor />
        <Nav />
        <PageTransition />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
