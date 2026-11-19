import Link from "next/link";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero, Split } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, localePath, type Lang } from "@/lib/i18n";
import { breadcrumbs, collection, JsonLd, OG_CASE_STUDIES, pageMetadata } from "@/lib/seo";

const COPY = {
  en: {
    description:
      "Three frontend case studies: about 55% to 95%+ on Lighthouse, a FIFA World Cup Qatar 2022 booking launch, and choosing Next.js for a multi-store SaaS.",
    index: "CS",
    eyebrow: "Case studies — the long versions",
    h1: ["How I ", "solved it."],
    lead: "Three projects told in full: the context, the options on the table, what I did step by step, and the result.",
    nextEyebrow: "What it adds up to",
  },
  ar: {
    description:
      "ثلاث دراسات حالة في الواجهات الأمامية: من نحو 55% إلى أكثر من 95% على Lighthouse، وإطلاق حجز تذاكر كأس العالم FIFA قطر 2022، واختيار Next.js لمنصة SaaS متعددة المتاجر.",
    index: "د",
    eyebrow: "دراسات الحالة — النسخ الكاملة",
    h1: ["كيف ", "حللتها."],
    lead: "ثلاثة مشاريع بالتفصيل: السياق، والخيارات المطروحة، وما فعلته خطوة بخطوة، والنتيجة.",
    nextEyebrow: "خلاصة كل ذلك",
  },
} as const;

export const caseStudiesMetadata = (lang: Lang) =>
  pageMetadata({
    title: UI[lang].caseStudies,
    description: COPY[lang].description,
    path: "/case-studies/",
    // The case-studies preview image is in English; Arabic pages use the Arabic one.
    image: lang === "en" ? OG_CASE_STUDIES : undefined,
    lang,
  });

export default function CaseStudiesIndex({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ui = UI[lang];
  const { caseStudiesLong, companyBySlug } = getContent(lang);
  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs([{ name: ui.caseStudies, path: "/case-studies/" }], lang),
          collection({ name: ui.caseStudies, description: t.description, path: "/case-studies/", lang }),
        ]}
      />
      <main>
        <PageHero
          index={t.index}
          eyebrow={t.eyebrow}
          title={<Split t={t.h1} />}
          lead={t.lead}
          crumbs={[{ name: ui.caseStudies }]}
          tone="violet"
          lang={lang}
        />
        <section className="px-5 pb-[14vh] sm:px-10">
          <ol className="border-t border-line">
            {caseStudiesLong.map((cs, k) => (
              <li key={cs.slug} className="border-b border-line">
                <Link
                  href={localePath(`/case-studies/${cs.slug}/`, lang)}
                  data-transition={cs.kicker}
                  data-cursor={ui.cursorRead}
                  className="sweep group grid gap-6 px-2 py-12 sm:px-4 md:grid-cols-12 md:items-end md:py-16"
                >
                  <span data-rv className="eyebrow md:col-span-1">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <div data-rv className="md:col-span-7">
                    <p className="eyebrow mb-4 transition-colors duration-500 group-hover:text-bg/70">
                      {cs.kicker} · {companyBySlug(cs.company).name}
                    </p>
                    <h2 className="font-display text-[clamp(2rem,4.8vw,4.8rem)] font-extrabold leading-[0.95] tracking-tighter">{cs.title}</h2>
                  </div>
                  <div data-rv className="md:col-span-4">
                    <p className="text-lg leading-snug">{cs.outcome}</p>
                    <span
                      className={`mt-4 block text-end text-2xl transition-transform duration-700 ${
                        lang === "ar" ? "group-hover:rotate-45" : "group-hover:-rotate-45"
                      }`}
                    >
                      {ui.arrow}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <NextChapter href="/strengths/" eyebrow={t.nextEyebrow} title={ui.strengths} lang={lang} />
      </main>
      <Footer index="✦" lang={lang} />
    </Motion>
  );
}
