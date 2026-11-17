import type { Metadata } from "next";

export const SITE = "https://devmaheremad.com";
export const PERSON_ID = `${SITE}/#person`;

// A page that sets its own openGraph replaces the parent's, image included, so every page names its image here.
export const OG_DEFAULT = { url: "/opengraph-image.png", width: 1200, height: 630, alt: 'Maher Almashharawi, Senior Frontend Engineer. React, Next.js, TypeScript. devmaheremad.com' };
export const OG_CASE_STUDIES = {
  url: "/og/case-studies.png",
  width: 1200,
  height: 630,
  alt: "Case studies by Maher Almashharawi: from about 55% to 95%+ on Lighthouse, FIFA World Cup Qatar 2022 ticket booking, choosing Next.js for a multi-store SaaS",
};

export const OG_AR = {
  url: "/og/ar.png",
  width: 1200,
  height: 630,
  alt: "ماهر المشهراوي (Maher Almashharawi)، مهندس واجهات أمامية أول. React وNext.js وTypeScript. devmaheremad.com",
};

// Every spelling people search for: the Arabic name, the handle, and the hyphenated forms.
export const NAME_VARIANTS = ["ماهر المشهراوي", "devmaheremad", "Maher Al-Mashharawi", "Maher Al Mashharawi"];

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = OG_DEFAULT,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: typeof OG_DEFAULT;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — Maher Almashharawi`, description, url: path, type, siteName: "Maher Almashharawi", images: [image] },
    twitter: { card: "summary_large_image", title: `${title} — Maher Almashharawi`, description, creator: "@devmaheremad", images: [image] },
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}

export function article({ headline, description, path, about }: { headline: string; description: string; path: string; about?: string }) {
  return {
    "@type": "Article",
    "@id": `${SITE}${path}#article`,
    headline,
    description,
    url: `${SITE}${path}`,
    mainEntityOfPage: `${SITE}${path}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: "en",
    ...(about ? { about: { "@type": "Organization", name: about } } : {}),
  };
}

export function collection({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE}${path}#page`,
    name,
    description,
    url: `${SITE}${path}`,
    author: { "@id": PERSON_ID },
    isPartOf: { "@id": `${SITE}/#website` },
  };
}

export function JsonLd({ graph }: { graph: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}
