import Link from "next/link";
import type { ReactNode } from "react";
import Liquid from "./Liquid";
import { getContent } from "@/content/localized";
import type { Story } from "@/content/stories";
import { UI, localePath, type Lang } from "@/lib/i18n";

// Numbers and Latin names stay left-to-right inside Arabic sentences.
export const Ltr = ({ children }: { children: ReactNode }) => (
  <bdi dir="ltr" className="inline-block">
    {children}
  </bdi>
);

/** A heading in two parts: plain text, then the part in the accent gradient. */
export const Split = ({ t }: { t: readonly [string, string] }) => (
  <>
    {t[0]}
    <span className="text-gradient">{t[1]}</span>
  </>
);

export function Crumbs({ items, lang = "en" }: { items: { name: string; href?: string }[]; lang?: Lang }) {
  return (
    <nav aria-label={lang === "ar" ? "مسار التنقل" : "Breadcrumb"} data-hero-fade>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        <li>
          <Link href={localePath("/", lang)} className="hover:text-ink">
            {UI[lang].home}
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {it.href ? (
              <Link href={localePath(it.href, lang)} className="hover:text-ink">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-ink/80">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  index,
  eyebrow,
  title,
  lead,
  meta,
  crumbs,
  tone = "mix",
  lang = "en",
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  meta?: { label: string; value: string }[];
  /** English paths; Arabic pages prefix them with /ar. */
  crumbs: { name: string; href?: string }[];
  tone?: "mix" | "cyan" | "violet";
  lang?: Lang;
}) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 sm:px-10">
      <Liquid tone={tone} />
      <span
        aria-hidden
        data-parallax="1.2"
        className="text-outline pointer-events-none absolute -end-[2vw] top-[12vh] select-none font-display text-[clamp(10rem,34vw,34rem)] font-extrabold leading-none tracking-tighter"
      >
        {index}
      </span>
      <div className="relative">
        <Crumbs items={crumbs} lang={lang} />
        <p data-hero-fade className="eyebrow mt-10">
          {eyebrow}
        </p>
      </div>
      <div className="relative">
        <h1 data-hero className="max-w-[16ch] font-display text-[clamp(3rem,9.5vw,10rem)] font-extrabold leading-[0.88] tracking-tighter">
          {title}
        </h1>
        {lead && (
          <p data-hero-fade className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink/75 sm:text-xl">
            {lead}
          </p>
        )}
        {meta && (
          <dl data-hero-fade className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow mb-2">{m.label}</dt>
                <dd className="text-sm leading-snug text-ink/85 sm:text-base">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ index, label, title, aside }: { index: string; label: string; title: ReactNode; aside?: string }) {
  return (
    // data-sound: a bell as the section comes into view, its pitch from the section number (lib/sound.ts).
    <div data-sound="section" data-sound-index={Number(index) || 0} className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p data-rv className="eyebrow mb-6">
          ( {index} ) — {label}
        </p>
        <h2 data-rv-lines className="font-display text-[clamp(2.6rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-tighter">
          {title}
        </h2>
      </div>
      {aside && (
        <p data-rv className="eyebrow max-w-[30ch] md:text-end">
          {aside}
        </p>
      )}
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line px-3 py-1 font-mono text-[0.66rem] uppercase tracking-wider text-muted">{children}</span>
  );
}

export function ThemeChips({ story, lang = "en" }: { story: Story; lang?: Lang }) {
  const { THEMES } = getContent(lang);
  return (
    <div className="flex flex-wrap gap-2">
      {story.themes.map((t) => (
        <Chip key={t}>{THEMES[t].short}</Chip>
      ))}
    </div>
  );
}

// A full story, used on company pages: sticky number and title on one side, the story on the other.
export function StoryRow({ story, n, lang = "en" }: { story: Story; n: number; lang?: Lang }) {
  const t = UI[lang];
  return (
    <article id={story.id} className="relative grid scroll-mt-28 gap-10 py-16 md:grid-cols-12 md:py-24">
      <span data-rv-line className="absolute inset-x-0 top-0 h-px bg-line" />
      <header className="self-start md:sticky md:top-28 md:col-span-5">
        <span aria-hidden className="text-outline block font-display text-[clamp(5rem,11vw,10rem)] font-extrabold leading-[0.8] tracking-tighter">
          {String(n).padStart(2, "0")}
        </span>
        <h3 data-rv className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3rem)] font-bold leading-[1.02] tracking-tight">
          {story.title}
        </h3>
        <div data-rv className="mt-6">
          <ThemeChips story={story} lang={lang} />
        </div>
      </header>
      <div className="space-y-10 md:col-span-6 md:col-start-7">
        <Beat label={t.problem} text={story.problem} />
        <Beat label={t.action} text={story.action} />
        <Beat label={t.result} text={story.result} strong />
        {story.decision && (
          <div data-rv data-spot className="spot rounded-2xl border border-line bg-bg-2/70 p-6">
            <p className="eyebrow mb-3">{t.call}</p>
            <p className="font-display text-xl font-bold">{story.decision.call}</p>
            <p className="mt-2 text-sm text-muted">
              {t.insteadOf}
              {story.decision.instead}
            </p>
            <p className="mt-4 leading-relaxed text-ink/80">{story.decision.why}</p>
          </div>
        )}
        <p data-rv className="border-s-2 border-cyan/70 ps-5 font-display text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-snug">
          {story.lesson}
        </p>
        {story.caseStudy && (
          <Link
            data-rv
            href={localePath(`/case-studies/${story.caseStudy}/`, lang)}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan"
          >
            {t.readCaseStudy}
            <span className={`transition-transform duration-500 ${lang === "ar" ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}>{t.arrow}</span>
          </Link>
        )}
      </div>
    </article>
  );
}

function Beat({ label, text, strong }: { label: string; text: string; strong?: boolean }) {
  return (
    <div data-rv>
      <p className="eyebrow mb-3">{label}</p>
      <p className={`leading-relaxed ${strong ? "text-xl text-ink sm:text-2xl" : "text-lg text-ink/80"}`}>{text}</p>
    </div>
  );
}

// A compact story card for grids: links to the full story on its company page.
export function StoryCard({ story, n, lang = "en" }: { story: Story; n?: number; lang?: Lang }) {
  const { companyBySlug, storyHref } = getContent(lang);
  const t = UI[lang];
  const c = companyBySlug(story.company);
  return (
    <Link
      href={storyHref(story)}
      data-spot
      data-cursor={t.cursorRead}
      data-transition={c.name}
      className="spot group flex h-full flex-col rounded-3xl border border-line bg-bg-2/60 p-7 transition-colors duration-500 hover:border-transparent"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow">{n !== undefined ? t.storyLabel(n) : c.short}</span>
        <span className="eyebrow">{c.name}</span>
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-tight">{story.title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{story.problem}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed">
        <span className="text-gradient font-semibold">{t.resultShort}</span>
        {story.result}
      </p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <ThemeChips story={story} lang={lang} />
        <span className={`text-xl transition-transform duration-500 ${lang === "ar" ? "group-hover:rotate-45" : "group-hover:-rotate-45"}`}>{t.arrow}</span>
      </div>
    </Link>
  );
}

export function NextChapter({ href, eyebrow, title, lang = "en" }: { href: string; eyebrow: string; title: string; lang?: Lang }) {
  const ar = lang === "ar";
  return (
    <Link
      href={localePath(href, lang)}
      data-transition={title}
      data-cursor={UI[lang].cursorNext}
      className="sweep group block border-y border-line px-5 py-16 sm:px-10 sm:py-24"
    >
      <p className="eyebrow transition-colors duration-500 group-hover:text-bg">{eyebrow}</p>
      <p className="mt-6 flex items-end justify-between gap-6 font-display text-[clamp(2.8rem,9vw,9.5rem)] font-extrabold leading-[0.9] tracking-tighter">
        <span>{title}</span>
        <span
          className={`shrink-0 text-[0.6em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
            ar ? "group-hover:-translate-x-3 group-hover:rotate-45" : "group-hover:translate-x-3 group-hover:-rotate-45"
          }`}
        >
          {UI[lang].arrow}
        </span>
      </p>
    </Link>
  );
}

export function BigLine({ children }: { children: ReactNode }) {
  return (
    <section className="px-5 py-[18vh] sm:px-10">
      <p data-rv-words className="max-w-[24ch] font-display text-[clamp(2rem,5.6vw,5.8rem)] font-bold leading-[1.02] tracking-tight">
        {children}
      </p>
    </section>
  );
}
