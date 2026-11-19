import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { BigLine, Chip, NextChapter, PageHero, SectionHead, Split, StoryCard } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, type Lang } from "@/lib/i18n";
import { article, breadcrumbs, JsonLd, OG_CASE_STUDIES, pageMetadata } from "@/lib/seo";
import { clip } from "@/lib/text";

const COPY = {
  en: {
    eyebrow: (n: string, kicker: string) => `Case study ${n} — ${kicker}`,
    company: "Company",
    role: "Role",
    when: "When",
    stack: "Stack",
    context: "Context",
    challenge: "The challenge",
    options: "The options",
    twoWays: ["Two ways ", "to go."],
    chosen: "What we went with",
    option: (k: number) => `Option ${String.fromCharCode(65 + k)}`,
    did: "What I did",
    result: "The result",
    lesson: "Lesson: ",
    related: "Related",
    more: (name: string) => ["More from ", `${name}.`] as const,
    nextCase: "Next case study",
    addsUp: "What it adds up to",
  },
  ar: {
    eyebrow: (n: string, kicker: string) => `دراسة الحالة ${n} — ${kicker}`,
    company: "الشركة",
    role: "الدور",
    when: "المدة",
    stack: "التقنيات",
    context: "السياق",
    challenge: "التحدي",
    options: "الخيارات",
    twoWays: ["طريقان ", "أمامنا."],
    chosen: "ما اخترناه",
    option: (k: number) => `الخيار ${"أبجد"[k]}`,
    did: "ما فعلته",
    result: "النتيجة",
    lesson: "الدرس: ",
    related: "ذات صلة",
    more: (name: string) => ["المزيد من ", name] as const,
    nextCase: "دراسة الحالة التالية",
    addsUp: "خلاصة كل ذلك",
  },
} as const;

export function caseStudyMetadata(slug: string, lang: Lang) {
  const cs = getContent(lang).caseStudiesLong.find((c) => c.slug === slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.title,
    description: clip(`${cs.outcome} ${cs.constraint}`, 158),
    path: `/case-studies/${cs.slug}/`,
    type: "article",
    image: lang === "en" ? OG_CASE_STUDIES : undefined,
    lang,
  });
}

export default function CaseStudyPage({ slug, lang }: { slug: string; lang: Lang }) {
  const { caseStudiesLong, companyBySlug, storyById } = getContent(lang);
  const cs = caseStudiesLong.find((c) => c.slug === slug);
  if (!cs) notFound();
  const t = COPY[lang];
  const ui = UI[lang];
  const c = companyBySlug(cs.company);
  const i = caseStudiesLong.indexOf(cs);
  const next = caseStudiesLong[i + 1];
  const path = `/case-studies/${cs.slug}/`;
  const n = String(i + 1).padStart(2, "0");

  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs(
            [
              { name: ui.caseStudies, path: "/case-studies/" },
              { name: cs.title, path },
            ],
            lang,
          ),
          article({ headline: cs.title, description: cs.outcome, path, about: c.name, lang }),
        ]}
      />
      <main>
        <PageHero
          index={n}
          eyebrow={t.eyebrow(n, cs.kicker)}
          title={cs.title}
          lead={cs.outcome}
          crumbs={[{ name: ui.caseStudies, href: "/case-studies/" }, { name: cs.kicker }]}
          tone={i === 0 ? "cyan" : i === 1 ? "violet" : "mix"}
          meta={[
            { label: t.company, value: c.name },
            { label: t.role, value: c.role },
            { label: t.when, value: c.period },
            { label: t.stack, value: cs.stack.slice(0, 3).join(", ") },
          ]}
          lang={lang}
        />

        <section className="grid gap-14 px-5 py-[16vh] sm:px-10 md:grid-cols-2">
          <div>
            <p data-rv className="eyebrow mb-6">
              ( 01 ) — {t.context}
            </p>
            <p data-rv className="text-xl leading-relaxed text-ink/85 sm:text-2xl">
              {cs.context}
            </p>
          </div>
          <div>
            <p data-rv className="eyebrow mb-6">
              {t.challenge}
            </p>
            <p data-rv-words className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-[1.1] tracking-tight">
              {cs.constraint}
            </p>
          </div>
        </section>

        {cs.options && (
          <section className="px-5 pb-[14vh] sm:px-10">
            <SectionHead index="02" label={t.options} title={<Split t={t.twoWays} />} />
            <div className="grid gap-6 md:grid-cols-2">
              {cs.options.map((o, k) => {
                const chosen = k === cs.options!.length - 1;
                return (
                  <div
                    key={o.option}
                    data-rv
                    data-spot
                    className={`spot rounded-3xl border p-8 sm:p-10 ${chosen ? "border-cyan/50 bg-bg-2" : "border-line bg-bg-2/40 text-ink/60"}`}
                  >
                    <p className="eyebrow mb-6">{chosen ? t.chosen : t.option(k)}</p>
                    <p className={`font-display text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-tight ${chosen ? "text-gradient" : ""}`}>{o.option}</p>
                    <p className="mt-4 text-lg leading-relaxed">{o.note}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section data-hscroll className="relative overflow-hidden lg:h-[100svh]">
          <div className="px-5 pt-[8vh] sm:px-10 lg:absolute lg:inset-x-0 lg:top-0">
            <p className="eyebrow">
              ( {cs.options ? "03" : "02"} ) — {t.did}
            </p>
          </div>
          <div data-hscroll-track className="flex flex-col gap-6 px-5 py-10 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:py-0">
            {cs.steps.map((s, k) => (
              <article
                key={s.title}
                data-spot
                className="spot flex flex-col justify-between rounded-3xl border border-line bg-bg-2/70 p-8 sm:p-12 lg:h-[62vh] lg:w-[min(64vw,820px)]"
              >
                <span className="text-outline font-display text-[clamp(5rem,10vw,9rem)] font-extrabold leading-[0.8]">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="mt-8 font-display text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight">{s.title}</h3>
                  <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/80">{s.body}</p>
                </div>
              </article>
            ))}
            <div className="hidden w-[10vw] shrink-0 lg:block" />
          </div>
        </section>

        <section className="px-5 py-[16vh] sm:px-10">
          <p data-rv className="eyebrow mb-10">
            {t.result}
          </p>
          <p data-rv-words className="max-w-[30ch] font-display text-[clamp(1.8rem,4.4vw,4.4rem)] font-bold leading-[1.06] tracking-tight">
            {cs.result}
          </p>
          <div data-rv className="mt-12 flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </section>

        <BigLine>
          <span className="text-gradient">{t.lesson}</span>
          {cs.learned}
        </BigLine>

        <section className="px-5 pb-[16vh] sm:px-10">
          <SectionHead index="✦" label={t.related} title={<Split t={t.more(c.name)} />} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cs.stories.map((id) => (
              <div key={id} data-rv>
                <StoryCard story={storyById(id)} lang={lang} />
              </div>
            ))}
          </div>
        </section>

        {next ? (
          <NextChapter href={`/case-studies/${next.slug}/`} eyebrow={t.nextCase} title={next.title} lang={lang} />
        ) : (
          <NextChapter href="/strengths/" eyebrow={t.addsUp} title={ui.strengths} lang={lang} />
        )}
      </main>
      <Footer index="✦" lang={lang} />
    </Motion>
  );
}
