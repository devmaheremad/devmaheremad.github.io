import type { MetadataRoute } from "next";
import { caseStudiesLong, companies } from "@/content/stories";

export const dynamic = "force-static";

const SITE = "https://devmaheremad.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({ url: `${SITE}${path}`, changeFrequency: "monthly" as const, priority });
  return [
    page("/", 1),
    page("/work/", 0.9),
    ...companies.map((c) => page(`/work/${c.slug}/`, 0.9)),
    page("/case-studies/", 0.9),
    ...caseStudiesLong.map((c) => page(`/case-studies/${c.slug}/`, 0.9)),
    page("/strengths/", 0.8),
    page("/decisions/", 0.8),
    page("/stories/", 0.8),
  ];
}
