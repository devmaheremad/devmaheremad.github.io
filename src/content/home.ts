// The homepage content in either language, for the server pages (/ and /ar/). The section components are client
// components and get their content as props, so each language's text ships only with its own page.
import { ar, projectsAr, workGroupTitlesAr } from "./ar";
import { caseStudies, experience, manifesto, profile, stats, workGroups } from "./site";
import { companies } from "./stories";
import { localePath, type Lang } from "@/lib/i18n";

function need<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`Arabic homepage text missing: ${what}`);
  return value;
}

export function homeContent(lang: Lang) {
  if (lang === "en") {
    return {
      intro: profile.intro,
      manifesto,
      stats,
      workGroups,
      caseStudies,
      experience: experience.map((x) => {
        const c = companies.find((c) => c.name === x.company);
        return { ...x, href: c ? `/work/${c.slug}/` : undefined };
      }),
    };
  }
  if (ar.experience.length !== experience.length || ar.caseStudies.length !== caseStudies.length || ar.stats.length !== stats.length)
    throw new Error("Arabic homepage: sections do not match the English homepage");
  return {
    intro: ar.intro,
    manifesto: ar.manifesto,
    stats: ar.stats,
    workGroups: workGroups.map((g) => ({
      title: need(workGroupTitlesAr[g.title], `work group ${g.title}`),
      items: g.items.map((p) => ({ ...p, ...need(projectsAr[p.slug], `project ${p.slug}`) })),
    })),
    caseStudies: ar.caseStudies,
    experience: ar.experience.map(({ slug, ...x }) => ({ ...x, href: slug ? localePath(`/work/${slug}/`, "ar") : undefined })),
  };
}

export type HomeContent = ReturnType<typeof homeContent>;
