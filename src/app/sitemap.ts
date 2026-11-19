import type { MetadataRoute } from "next";
import { caseStudiesLong, companies } from "@/content/stories";

export const dynamic = "force-static";

const SITE = "https://devmaheremad.com";

// Every page in English and in Arabic (/ar/...), each pointing at its twin so search engines show the right language.
export default function sitemap(): MetadataRoute.Sitemap {
  // lastModified = build time, so crawlers see that the pages changed after each deploy.
  const lastModified = new Date();
  const pages: [string, number][] = [
    ["/", 1],
    ["/work/", 0.9],
    ...companies.map((c): [string, number] => [`/work/${c.slug}/`, 0.9]),
    ["/case-studies/", 0.9],
    ...caseStudiesLong.map((c): [string, number] => [`/case-studies/${c.slug}/`, 0.9]),
    ["/strengths/", 0.8],
    ["/decisions/", 0.8],
    ["/stories/", 0.8],
  ];
  const ar = (path: string) => (path === "/" ? "/ar/" : `/ar${path}`);
  return pages.flatMap(([path, priority]) => {
    const languages = { en: `${SITE}${path}`, ar: `${SITE}${ar(path)}` };
    const entry = (url: string) => ({ url, lastModified, changeFrequency: "monthly" as const, priority, alternates: { languages } });
    return [entry(languages.en), entry(languages.ar)];
  });
}
