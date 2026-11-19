import Link from "next/link";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero, Split } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, localePath, storiesCount, type Lang } from "@/lib/i18n";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const COPY = {
  en: {
    title: "Chapters: where I've worked",
    description:
      "Three chapters: Konin Cloud (KoninPay, payments, Next.js), The Sailors (World Cup 2022 booking, 55% to 95%+ on Lighthouse) and Mars Innovation (Beljwar).",
    eyebrow: "Chapters — 2021 to 2025",
    h1: ["Three ", "chapters."],
    lead: "5+ years of shipping frontends, told company by company: what I owned, the problems I ran into, what I did, and what came of it.",
    before:
      "Before these: Internship Trainee at Gaza Sky Geeks (Jan — Aug 2020), intensive practical training in JavaScript, HTML5, CSS3 and modern frontend practices.",
    nextEyebrow: "Go deeper",
  },
  ar: {
    title: "الفصول: أين عملت",
    description:
      "ثلاثة فصول: Konin Cloud (KoninPay والمدفوعات وNext.js)، وThe Sailors (حجز كأس العالم 2022، ومن 55% إلى أكثر من 95% على Lighthouse)، وMars Innovation (Beljwar).",
    eyebrow: "الفصول — من 2021 إلى 2025",
    h1: ["ثلاثة ", "فصول."],
    lead: "أكثر من 5 سنوات في بناء الواجهات الأمامية وإطلاقها، شركةً شركة: ما تولّيته، والمشاكل التي واجهتها، وما فعلته، وما نتج عنه.",
    before:
      "قبل ذلك: متدرّب في Gaza Sky Geeks (يناير — أغسطس 2020)، تدريب عملي مكثّف في JavaScript وHTML5 وCSS3 وممارسات الواجهات الأمامية الحديثة.",
    nextEyebrow: "للتعمّق أكثر",
  },
} as const;

export const workIndexMetadata = (lang: Lang) =>
  pageMetadata({ title: COPY[lang].title, description: COPY[lang].description, path: "/work/", lang });

export default function WorkIndex({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ui = UI[lang];
  const { companies, storiesFor } = getContent(lang);
  const ar = lang === "ar";
  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs([{ name: ui.chapters, path: "/work/" }], lang),
          collection({ name: ui.chapters, description: t.description, path: "/work/", lang }),
        ]}
      />
      <main>
        <PageHero index="03" eyebrow={t.eyebrow} title={<Split t={t.h1} />} lead={t.lead} crumbs={[{ name: ui.chapters }]} lang={lang} />

        <section className="px-5 pb-[14vh] sm:px-10">
          <ol className="border-t border-line">
            {companies.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link
                  href={localePath(`/work/${c.slug}/`, lang)}
                  data-transition={c.name}
                  data-cursor={ui.cursorOpen}
                  className="sweep group grid gap-6 px-2 py-12 sm:px-4 md:grid-cols-12 md:items-end md:py-16"
                >
                  <span data-rv className="eyebrow md:col-span-1">
                    {c.index}
                  </span>
                  <div data-rv className="md:col-span-7">
                    <p className="eyebrow mb-4 transition-colors duration-500 group-hover:text-bg/70">
                      {c.period} · {c.role}
                    </p>
                    <h2 lang="en" className="font-display text-[clamp(2.4rem,6.6vw,6.6rem)] font-extrabold leading-[0.92] tracking-tighter">
                      {c.name}
                    </h2>
                  </div>
                  <div data-rv className="md:col-span-4">
                    <p className="text-lg leading-snug">{c.headline}</p>
                    <p className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] opacity-70">
                      {storiesCount(storiesFor(c.slug).length, lang)}
                      <span className={`text-2xl transition-transform duration-700 ${ar ? "group-hover:rotate-45" : "group-hover:-rotate-45"}`}>{ui.arrow}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <p data-rv className="mt-10 max-w-[60ch] text-muted">
            {t.before}
          </p>
        </section>

        <NextChapter href="/case-studies/" eyebrow={t.nextEyebrow} title={ui.caseStudies} lang={lang} />
      </main>
      <Footer index="04" lang={lang} />
    </Motion>
  );
}
