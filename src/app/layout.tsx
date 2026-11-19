import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Syne } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import PageTransition from "@/components/PageTransition";
import LangSync from "@/components/LangSync";
import { profile } from "@/content/site";
import { NAME_VARIANTS } from "@/lib/seo";

const display = Syne({ variable: "--font-display", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = Inter_Tight({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

const SITE = "https://devmaheremad.com";
const HANDLE = "devmaheremad";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: `${profile.name} (${HANDLE}) — ${profile.role}`, template: `%s — ${profile.name}` },
  description: "Senior Frontend Engineer with 5+ years building fast, accessible React and Next.js products for SaaS, e-commerce and booking. Remote, hybrid or on-site.",
  applicationName: profile.name,
  authors: [{ name: profile.name, url: SITE }],
  creator: profile.name,
  keywords: [profile.name, ...NAME_VARIANTS, profile.role, "React", "Next.js", "TypeScript", "Frontend Engineer", "Web Performance"],
  // The home page has an Arabic twin; child pages set their own alternates (canonical only), which replaces this.
  alternates: { canonical: "/", languages: { en: "/", ar: "/ar/", "x-default": "/" } },
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
      alternateName: NAME_VARIANTS,
      jobTitle: profile.role,
      description: profile.intro,
      url: SITE,
      image: `https://github.com/${HANDLE}.png`,
      email: `mailto:${profile.email}`,
      address: { "@type": "PostalAddress", addressCountry: "PS" },
      knowsLanguage: ["ar", "en", "de"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Islamic University of Gaza", alternateName: "الجامعة الإسلامية بغزة" },
      subjectOf: { "@id": `${SITE}/ar/#profilepage` },
      // The names recruiters and AI assistants search for, in English and Arabic. Every one is the CV's title or field.
      hasOccupation: {
        "@type": "Occupation",
        name: profile.role,
        alternateName: [
          "Frontend Engineer",
          "Frontend Developer",
          "Senior Frontend Developer",
          "React Developer",
          "Next.js Developer",
          "TypeScript Developer",
          "مهندس برمجيات أول",
          "مطوّر واجهات أمامية",
          "مطوّر Frontend",
          "مطوّر React",
          "مطوّر Next.js",
        ],
        occupationalCategory: "15-1254.00 Web Developers",
        skills: "React, Next.js, TypeScript, JavaScript, Material UI, Tailwind CSS, Redux Toolkit, Zustand, REST APIs, Core Web Vitals, Lighthouse, accessibility (WCAG), SEO, React Testing Library",
      },
      knowsAbout: [
        "React", "Next.js", "TypeScript", "JavaScript", "Frontend architecture", "Web performance", "Core Web Vitals", "Accessibility",
        "Design systems", "SaaS platforms", "Multi-store e-commerce", "E-commerce storefronts", "Booking systems", "Ticket booking",
        "Dashboards", "REST API integration", "State management", "Frontend testing", "SEO",
        "منصات SaaS", "المتاجر الإلكترونية", "أنظمة الحجز", "تطوير الواجهات الأمامية",
      ],
      sameAs: profile.links.map((l) => l.href),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      name: profile.name,
      alternateName: NAME_VARIANTS,
      url: SITE,
      inLanguage: ["en", "ar"],
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
    // The Arabic page's static HTML gets lang="ar" dir="rtl" after the build (scripts/flatten-segments.mjs); LangSync keeps it right on client navigation.
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {profile.links.map((l) => (
          <link key={l.href} rel="me" href={l.href} />
        ))}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Preloader />
        <Cursor />
        <Nav />
        <PageTransition />
        <LangSync />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
