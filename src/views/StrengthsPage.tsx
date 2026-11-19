import Link from "next/link";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero, Split } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, type Lang } from "@/lib/i18n";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const COPY = {
  en: {
    description:
      "Six frontend strengths, each backed by real stories: performance, technical decisions, payment-flow quality, UX, ownership and working across teams.",
    eyebrow: "Strengths — with receipts",
    h1: ["What I'm ", "good at."],
    lead: "Six strengths, and the stories behind each one. No adjective here without a story you can read.",
    evidence: "The evidence",
    nextEyebrow: "How I decide",
  },
  ar: {
    description:
      "ست نقاط قوة في الواجهات الأمامية، لكل منها قصص حقيقية: الأداء، والقرارات التقنية، وجودة مسارات الدفع، وتجربة المستخدم، والملكية الكاملة، والعمل مع الفرق.",
    eyebrow: "نقاط القوة — مع الأدلة",
    h1: ["ما ", "أجيده."],
    lead: "ست نقاط قوة، والقصص التي تقف خلف كل واحدة. لا صفة هنا بلا قصة يمكنك قراءتها.",
    evidence: "الأدلة",
    nextEyebrow: "كيف أقرّر",
  },
} as const;

export const strengthsMetadata = (lang: Lang) =>
  pageMetadata({ title: UI[lang].strengths, description: COPY[lang].description, path: "/strengths/", lang });

export default function StrengthsPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ui = UI[lang];
  const ar = lang === "ar";
  const { THEMES, companyBySlug, storyById, storyHref, strengths } = getContent(lang);
  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs([{ name: ui.strengths, path: "/strengths/" }], lang),
          collection({ name: ui.strengths, description: t.description, path: "/strengths/", lang }),
        ]}
      />
      <main>
        <PageHero
          index="06"
          eyebrow={t.eyebrow}
          title={<Split t={t.h1} />}
          lead={t.lead}
          crumbs={[{ name: ui.strengths }]}
          tone="cyan"
          lang={lang}
        />

        <section className="px-5 pb-[12vh] sm:px-10">
          {strengths.map((s, k) => (
            <article key={s.theme} id={s.theme} className="relative grid scroll-mt-28 gap-10 py-16 md:grid-cols-12 md:py-24">
              <span data-rv-line className="absolute inset-x-0 top-0 h-px bg-line" />
              <div className="self-start md:sticky md:top-28 md:col-span-5">
                <span aria-hidden className="text-outline block font-display text-[clamp(5rem,12vw,11rem)] font-extrabold leading-[0.8] tracking-tighter">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <p data-rv className="eyebrow mt-6">
                  {THEMES[s.theme].label}
                </p>
              </div>
              <div className="md:col-span-7">
                <h2 data-rv-lines className="font-display text-[clamp(2rem,4.4vw,4.2rem)] font-extrabold leading-[0.98] tracking-tight">
                  {s.claim}
                </h2>
                <p data-rv className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/75">
                  {s.body}
                </p>
                <p data-rv className="eyebrow mb-4 mt-12">
                  {t.evidence}
                </p>
                <ul className="border-t border-line">
                  {s.stories.map((id) => {
                    const st = storyById(id);
                    return (
                      <li key={id} data-rv className="border-b border-line">
                        <Link href={storyHref(st)} data-transition={companyBySlug(st.company).name} className="group flex items-baseline justify-between gap-6 py-5">
                          <span
                            className={`text-lg transition-transform duration-500 sm:text-xl ${ar ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
                          >
                            {st.title}
                          </span>
                          <span className="flex shrink-0 items-center gap-4">
                            <span className="eyebrow hidden sm:inline">{companyBySlug(st.company).name}</span>
                            <span className={`transition-transform duration-500 ${ar ? "group-hover:rotate-45" : "group-hover:-rotate-45"}`}>{ui.arrow}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <NextChapter href="/decisions/" eyebrow={t.nextEyebrow} title={ui.decisions} lang={lang} />
      </main>
      <Footer index="✦" lang={lang} />
    </Motion>
  );
}
