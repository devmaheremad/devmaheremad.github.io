import type { Metadata } from "next";
import { localePath, type Lang } from "./i18n";

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
  alt: "ماهر المشهراوي (Maher Almashharawi)، مهندس برمجيات أول · Senior Frontend Engineer. React وNext.js وTypeScript. devmaheremad.com",
};

// Every spelling people search for: the Arabic name, the handle, and the hyphenated forms.
export const NAME_VARIANTS = ["ماهر المشهراوي", "devmaheremad", "Maher Al-Mashharawi", "Maher Al Mashharawi"];

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image,
  lang = "en",
}: {
  title: string;
  description: string;
  /** The English path; the Arabic page lives at /ar + path. */
  path: string;
  type?: "website" | "article";
  image?: typeof OG_DEFAULT;
  lang?: Lang;
}): Metadata {
  const ar = lang === "ar";
  const url = localePath(path, lang);
  const img = image ?? (ar ? OG_AR : OG_DEFAULT);
  const full = `${title} — ${ar ? "ماهر المشهراوي" : "Maher Almashharawi"}`;
  return {
    // The root layout's title template adds the English name; Arabic pages carry the Arabic one instead.
    title: ar ? { absolute: full } : title,
    description,
    alternates: { canonical: url, languages: { en: path, ar: localePath(path, "ar"), "x-default": path } },
    openGraph: {
      title: full,
      description,
      url,
      type,
      siteName: ar ? "Maher Almashharawi · ماهر المشهراوي" : "Maher Almashharawi",
      locale: ar ? "ar_AR" : "en_US",
      alternateLocale: [ar ? "en_US" : "ar_AR"],
      images: [img],
    },
    twitter: { card: "summary_large_image", title: full, description, creator: "@devmaheremad", images: [img] },
  };
}

export function breadcrumbs(items: { name: string; path: string }[], lang: Lang = "en") {
  const home = { name: lang === "ar" ? "الرئيسية" : "Home", path: "/" };
  return {
    "@type": "BreadcrumbList",
    itemListElement: [home, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${localePath(it.path, lang)}`,
    })),
  };
}

export function article({
  headline,
  description,
  path,
  about,
  lang = "en",
}: {
  headline: string;
  description: string;
  path: string;
  about?: string;
  lang?: Lang;
}) {
  const url = `${SITE}${localePath(path, lang)}`;
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    url,
    mainEntityOfPage: url,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    inLanguage: lang,
    ...(about ? { about: { "@type": "Organization", name: about } } : {}),
  };
}

export function collection({ name, description, path, lang = "en" }: { name: string; description: string; path: string; lang?: Lang }) {
  const url = `${SITE}${localePath(path, lang)}`;
  return {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    name,
    description,
    url,
    inLanguage: lang,
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
