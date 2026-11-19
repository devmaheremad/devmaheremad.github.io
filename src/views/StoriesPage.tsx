import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import StoriesExplorer from "@/components/page/StoriesExplorer";
import { NextChapter, PageHero, Split, StoryCard } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import type { Theme } from "@/content/stories";
import { UI, type Lang } from "@/lib/i18n";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const COPY = {
  en: {
    title: "Stories from the work",
    description: (n: number) =>
      `${n} short frontend stories from Konin Cloud, The Sailors and Mars Innovation Technology: payments, performance, booking flows, testing and technical decisions.`,
    eyebrow: (n: number, c: number) => `Stories — ${n} of them, from ${c} companies`,
    h1: ["Stories from ", "the work."],
    lead: "Short and specific: the problem, what I did, and what came of it. Filter by company or by the kind of problem.",
    nextEyebrow: "The full chapters",
    nextTitle: "Where it happened",
  },
  ar: {
    title: "قصص من العمل",
    description: (n: number) =>
      `${n} قصة قصيرة في الواجهات الأمامية من Konin Cloud وThe Sailors وMars Innovation Technology: المدفوعات، والأداء، ومسارات الحجز، والاختبار، والقرارات التقنية.`,
    eyebrow: (n: number, c: number) => `القصص — ${n} قصة من ${c} شركات`,
    h1: ["قصص من ", "العمل."],
    lead: "قصيرة ومحدّدة: المشكلة، وما فعلته، وما نتج عنه. صفِّها حسب الشركة أو حسب نوع المشكلة.",
    nextEyebrow: "الفصول كاملة",
    nextTitle: "أين حدث ذلك",
  },
} as const;

export const storiesMetadata = (lang: Lang) => {
  const { stories } = getContent(lang);
  return pageMetadata({ title: COPY[lang].title, description: COPY[lang].description(stories.length), path: "/stories/", lang });
};

export default function StoriesPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ui = UI[lang];
  const { THEMES, companies, stories } = getContent(lang);
  const description = t.description(stories.length);
  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs([{ name: ui.stories, path: "/stories/" }], lang),
          collection({ name: t.title, description, path: "/stories/", lang }),
        ]}
      />
      <main>
        <PageHero
          index={String(stories.length)}
          eyebrow={t.eyebrow(stories.length, companies.length)}
          title={<Split t={t.h1} />}
          lead={t.lead}
          crumbs={[{ name: ui.stories }]}
          lang={lang}
        />
        <section className="px-5 pb-[14vh] sm:px-10">
          <StoriesExplorer
            lang={lang}
            companies={companies.map((c) => ({ slug: c.slug, name: c.name }))}
            themes={(Object.keys(THEMES) as Theme[]).map((k) => ({ key: k, short: THEMES[k].short }))}
            items={stories.map((s, i) => ({
              id: s.id,
              company: s.company,
              themes: s.themes,
              card: <StoryCard story={s} n={i + 1} lang={lang} />,
            }))}
          />
        </section>
        <NextChapter href="/work/" eyebrow={t.nextEyebrow} title={t.nextTitle} lang={lang} />
      </main>
      <Footer index="✦" lang={lang} />
    </Motion>
  );
}
