import type { Metadata } from "next";

export const SITE = "https://devmaheremad.com";
export const PERSON_ID = `${SITE}/#person`;

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} — Maher Almashharawi`, description, url: path, type, siteName: "Maher Almashharawi" },
    twitter: { card: "summary_large_image", title: `${title} — Maher Almashharawi`, description, creator: "@devmaheremad" },
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
