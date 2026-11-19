import Link from "next/link";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero, SectionHead, Split } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, count, type Lang } from "@/lib/i18n";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

// Each principle is the lesson of a real story.
const PRINCIPLES: Record<Lang, { title: string; body: string; story: string }[]> = {
  en: [
    { title: "Measure before deciding.", body: "Start from the numbers, find the causes, then fix them.", story: "lighthouse-55-95" },
    { title: "Write the trade-offs down.", body: "A written comparison persuades better than an opinion, especially outside frontend.", story: "nextjs-decision" },
    { title: "Reuse when the deadline is fixed.", body: "Less to build means less to test, and a launch that happens on time.", story: "world-cup-inside" },
    { title: "Protect the money first.", body: "Payments and wallets get tested before anything else, on both sides of the API.", story: "money-paths" },
  ],
  ar: [
    { title: "قِس قبل أن تقرّر.", body: "ابدأ من الأرقام، وجد الأسباب، ثم أصلحها.", story: "lighthouse-55-95" },
    { title: "اكتب المقايضات.", body: "المقارنة المكتوبة تُقنع أكثر من الرأي، خصوصًا خارج الواجهة الأمامية.", story: "nextjs-decision" },
    { title: "أعد الاستخدام حين يكون الموعد ثابتًا.", body: "ما يُبنى أقل يعني ما يُختبر أقل، وإطلاقًا في موعده.", story: "world-cup-inside" },
    { title: "احمِ المال أولًا.", body: "المدفوعات والمحافظ تُختبر قبل أي شيء آخر، على جانبي الـ API.", story: "money-paths" },
  ],
};

const COPY = {
  en: {
    title: "Decisions, and why",
    description:
      "How I make frontend decisions: the calls I'd make again (Next.js over Blade, World Cup booking inside the platform) and the ones made under pressure.",
    index: "D",
    eyebrow: "Decisions — calls I'd make again",
    h1: ["Decisions, ", "and why."],
    lead: "How I decide, the calls I made, and the ones made under pressure: a deadline that couldn't move, traffic peaks, and money on the line.",
    principles: "Principles",
    howIDecide: ["How I ", "decide."],
    principle: (k: number) => `P/${String(k + 1).padStart(2, "0")}`,
    from: "From: ",
    calls: (n: number) => `The calls · ${count(n, "en", ["decision", "decisions"], { one: "", two: "", few: "", many: "" })}`,
    makeAgain: ["The calls I'd ", "make again."],
    keepScrolling: "Keep scrolling: each card is a decision, what it replaced, and why.",
    call: (k: number) => `Call ${String(k + 1).padStart(2, "0")}`,
    happened: "What happened. ",
    pressureLabel: "Under pressure",
    hard: ["When it got ", "hard."],
    pressureAside: "Decisions made with the clock running, traffic spiking or money on the line.",
    pressure: "The pressure: ",
    outcome: "Outcome. ",
    fullStory: "Full story",
    nextEyebrow: "Every story, one place",
  },
  ar: {
    title: "القرارات، ولماذا",
    description:
      "كيف أتخذ قرارات الواجهات الأمامية: قرارات سأتخذها مجددًا (Next.js بدل Blade، وحجز كأس العالم داخل المنصة) وأخرى اتُّخذت تحت الضغط.",
    index: "ق",
    eyebrow: "القرارات — قرارات سأتخذها مجددًا",
    h1: ["القرارات، ", "ولماذا."],
    lead: "كيف أقرّر، والقرارات التي اتخذتها، وتلك التي اتُّخذت تحت الضغط: موعد لا يتحرّك، وذروات زيارات، ومال على المحك.",
    principles: "المبادئ",
    howIDecide: ["كيف ", "أقرّر."],
    principle: (k: number) => `مبدأ ${String(k + 1).padStart(2, "0")}`,
    from: "من: ",
    calls: (n: number) => `القرارات · ${count(n, "ar", ["", ""], { one: "قرار واحد", two: "قراران", few: "قرارات", many: "قرارًا" })}`,
    makeAgain: ["قرارات ", "سأتخذها مجددًا."],
    keepScrolling: "تابع التمرير: كل بطاقة قرار، وما الذي حلّ محله، ولماذا.",
    call: (k: number) => `قرار ${String(k + 1).padStart(2, "0")}`,
    happened: "ما حدث. ",
    pressureLabel: "تحت الضغط",
    hard: ["حين ", "صعُب الأمر."],
    pressureAside: "قرارات اتُّخذت والوقت يمضي، أو الزيارات تقفز، أو المال على المحك.",
    pressure: "الضغط: ",
    outcome: "النتيجة. ",
    fullStory: "القصة كاملة",
    nextEyebrow: "كل القصص في مكان واحد",
  },
} as const;

export const decisionsMetadata = (lang: Lang) =>
  pageMetadata({ title: COPY[lang].title, description: COPY[lang].description, path: "/decisions/", lang });

export default function DecisionsPage({ lang }: { lang: Lang }) {
  const t = COPY[lang];
  const ui = UI[lang];
  const ar = lang === "ar";
  const { companyBySlug, stories, storyById, storyHref } = getContent(lang);
  const calls = stories.filter((s) => s.decision);
  const pressure = stories.filter((s) => s.pressure);

  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs([{ name: ui.decisions, path: "/decisions/" }], lang),
          collection({ name: t.title, description: t.description, path: "/decisions/", lang }),
        ]}
      />
      <main>
        <PageHero index={t.index} eyebrow={t.eyebrow} title={<Split t={t.h1} />} lead={t.lead} crumbs={[{ name: ui.decisions }]} tone="violet" lang={lang} />

        <section className="px-5 py-[12vh] sm:px-10">
          <SectionHead index="01" label={t.principles} title={<Split t={t.howIDecide} />} />
          <ol className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES[lang].map((p, k) => {
              const st = storyById(p.story);
              return (
                <li key={p.title} data-rv>
                  <Link
                    href={storyHref(st)}
                    data-spot
                    data-transition={companyBySlug(st.company).name}
                    className="spot group flex h-full flex-col rounded-3xl border border-line bg-bg-2/60 p-8 sm:p-10"
                  >
                    <span className="eyebrow">{t.principle(k)}</span>
                    <h3 className="mt-8 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1] tracking-tight">{p.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-ink/75">{p.body}</p>
                    <p className="mt-auto flex items-center justify-between gap-4 pt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      {t.from}
                      {st.title}
                      <span className={`text-lg text-ink transition-transform duration-500 ${ar ? "group-hover:rotate-45" : "group-hover:-rotate-45"}`}>{ui.arrow}</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section data-hscroll className="relative overflow-hidden lg:h-[100svh]">
          <div className="px-5 pt-[8vh] sm:px-10 lg:absolute lg:inset-x-0 lg:top-0">
            <p className="eyebrow">
              ( 02 ) — {t.calls(calls.length)}
            </p>
          </div>
          <div data-hscroll-track className="flex flex-col gap-6 px-5 py-10 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:py-0">
            <div className="shrink-0 lg:w-[34vw]">
              <h2 className="font-display text-[clamp(2.6rem,6vw,6.4rem)] font-extrabold leading-[0.9] tracking-tighter">
                <Split t={t.makeAgain} />
              </h2>
              <p className="mt-6 hidden max-w-[34ch] text-muted lg:block">{t.keepScrolling}</p>
            </div>
            {calls.map((s, k) => (
              <Link
                key={s.id}
                href={storyHref(s)}
                data-spot
                data-cursor={ui.cursorRead}
                data-transition={companyBySlug(s.company).name}
                className="spot group flex shrink-0 flex-col rounded-3xl border border-line bg-bg-2/70 p-8 sm:p-10 lg:min-h-[64vh] lg:w-[min(40vw,540px)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">{t.call(k)}</span>
                  <span className="eyebrow">{companyBySlug(s.company).name}</span>
                </div>
                <h3 className="mt-8 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1] tracking-tight">{s.decision!.call}</h3>
                <p className="mt-4 text-sm text-muted">
                  {ui.insteadOf}
                  <span className="text-ink/70 line-through decoration-violet/60">{s.decision!.instead}</span>
                </p>
                <p className="mt-6 leading-relaxed text-ink/80">{s.decision!.why}</p>
                <p className="mt-auto pt-8 leading-relaxed">
                  <span className="text-gradient font-semibold">{t.happened}</span>
                  {s.result}
                </p>
              </Link>
            ))}
            <div className="hidden w-[8vw] shrink-0 lg:block" />
          </div>
        </section>

        <section className="px-5 py-[14vh] sm:px-10">
          <SectionHead index="03" label={t.pressureLabel} title={<Split t={t.hard} />} aside={t.pressureAside} />
          <ol className="relative">
            <span aria-hidden className="absolute bottom-0 start-[11px] top-0 w-px bg-line md:start-1/2" />
            {pressure.map((s, k) => (
              <li key={s.id} className={`relative grid gap-6 pb-16 ps-10 md:w-1/2 md:ps-0 ${k % 2 ? "md:ms-auto md:ps-14" : "md:pe-14 md:text-end"}`}>
                <span
                  aria-hidden
                  className={`absolute start-[5px] top-2 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-cyan to-violet shadow-[0_0_24px_rgba(76,195,255,.6)] ${
                    k % 2 ? "md:-start-[7px]" : "md:-end-[7px] md:start-auto"
                  }`}
                />
                <div data-rv>
                  <p className="eyebrow">{companyBySlug(s.company).name}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.02] tracking-tight">{s.title}</h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.14em] text-violet">
                    {t.pressure}
                    {s.pressure}
                  </p>
                  <p className="mt-4 leading-relaxed text-ink/80">{s.action}</p>
                  <p className="mt-3 leading-relaxed">
                    <span className="text-gradient font-semibold">{t.outcome}</span>
                    {s.result}
                  </p>
                  <Link href={storyHref(s)} className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                    {t.fullStory} {ui.arrow}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <NextChapter href="/stories/" eyebrow={t.nextEyebrow} title={ui.stories} lang={lang} />
      </main>
      <Footer index="✦" lang={lang} />
    </Motion>
  );
}
