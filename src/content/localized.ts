// One accessor for the page content in either language. Server components only: client components get what they
// need as props, so neither language's text ends up in the other's JavaScript.
import { THEMES, caseStudiesLong, companies, stories, strengths, type Company, type CaseStudyLong, type Story } from "./stories";
import { THEMES_AR, caseStudiesAr, companiesAr, storiesAr, strengthsAr } from "./stories.ar";
import { localePath, type Lang } from "@/lib/i18n";

function need<T>(value: T | undefined, what: string): T {
  if (value === undefined) throw new Error(`Arabic text missing: ${what}`);
  return value;
}

function arabic() {
  const cs: Company[] = companies.map((c) => ({ ...c, ...need(companiesAr[c.slug], `company ${c.slug}`) }));
  const st: Story[] = stories.map((s) => {
    const t = need(storiesAr[s.id], `story ${s.id}`);
    // A decision or a pressure line in English must have its Arabic twin, and the other way round.
    if (!!s.decision !== !!t.decision) throw new Error(`Arabic story ${s.id}: decision does not match the English`);
    if (!!s.pressure !== !!t.pressure) throw new Error(`Arabic story ${s.id}: pressure does not match the English`);
    return { ...s, ...t };
  });
  const long: CaseStudyLong[] = caseStudiesLong.map((c) => {
    const t = need(caseStudiesAr[c.slug], `case study ${c.slug}`);
    if (t.steps.length !== c.steps.length || (t.options?.length ?? 0) !== (c.options?.length ?? 0))
      throw new Error(`Arabic case study ${c.slug}: steps or options do not match the English`);
    return { ...c, ...t };
  });
  const str = strengths.map((s) => ({ ...s, ...need(strengthsAr[s.theme], `strength ${s.theme}`) }));
  for (const c of cs) {
    const en = companies.find((x) => x.slug === c.slug)!;
    if (c.facts.length !== en.facts.length || c.numbers.length !== en.numbers.length)
      throw new Error(`Arabic company ${c.slug}: facts or numbers do not match the English`);
  }
  return { companies: cs, stories: st, caseStudiesLong: long, strengths: str, THEMES: THEMES_AR };
}

const english = { companies, stories, caseStudiesLong, strengths, THEMES };
let arabicCache: ReturnType<typeof arabic> | undefined;

export function getContent(lang: Lang) {
  const d = lang === "ar" ? (arabicCache ??= arabic()) : english;
  const companyBySlug = (slug: string) => d.companies.find((c) => c.slug === slug)!;
  return {
    ...d,
    companyBySlug,
    storyById: (id: string) => d.stories.find((s) => s.id === id)!,
    storiesFor: (slug: string) => d.stories.filter((s) => s.company === slug),
    storyHref: (s: Story) => localePath(`/work/${s.company}/#${s.id}`, lang),
  };
}

export type Content = ReturnType<typeof getContent>;
