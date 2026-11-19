import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Storefronts from "@/components/Storefronts";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import GoDeeper from "@/components/GoDeeper";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import { ar } from "@/content/ar";
import { homeContent } from "@/content/home";
import { profile } from "@/content/site";
import { JsonLd, OG_AR, PERSON_ID, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: ar.title },
  description: ar.description,
  alternates: { canonical: "/ar/", languages: { en: "/", ar: "/ar/", "x-default": "/" } },
  openGraph: {
    title: ar.title,
    description: ar.description,
    url: "/ar/",
    type: "profile",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    siteName: `${profile.name} · ${ar.name}`,
    images: [OG_AR],
  },
  twitter: { card: "summary_large_image", title: ar.title, description: ar.description, creator: "@devmaheremad", images: [OG_AR] },
};

// The Arabic homepage: the same sections as the English one (src/app/page.tsx), in the same order, in Arabic.
// Right to left and in Arabic fonts (src/app/ar/layout.tsx); Arabic text is never split into letters.
export default function ArabicHome() {
  const c = homeContent("ar");
  return (
    <div className="ar-sub">
      <meta httpEquiv="content-language" content="ar" />
      <JsonLd
        graph={[
          {
            "@type": "ProfilePage",
            "@id": `${SITE}/ar/#profilepage`,
            url: `${SITE}/ar/`,
            name: ar.title,
            description: ar.description,
            inLanguage: "ar",
            mainEntity: { "@id": PERSON_ID },
            isPartOf: { "@id": `${SITE}/#website` },
          },
        ]}
      />
      <main>
        <Hero lang="ar" intro={c.intro} />
        <Manifesto lang="ar" text={c.manifesto} />
        <Stats items={c.stats} />
        <Storefronts lang="ar" />
        <Work lang="ar" groups={c.workGroups} />
        <CaseStudies lang="ar" items={c.caseStudies} />
        <Experience lang="ar" items={c.experience} />
        <GoDeeper lang="ar" />
        <Marquee />
      </main>
      <Contact index="07" lang="ar" />
    </div>
  );
}
