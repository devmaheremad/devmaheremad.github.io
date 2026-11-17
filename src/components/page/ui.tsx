import Link from "next/link";
import type { ReactNode } from "react";
import Liquid from "./Liquid";
import { THEMES, companyBySlug, storyHref, type Story } from "@/content/stories";

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" data-hero-fade>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
        <li>
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
        </li>
        {items.map((it) => (
          <li key={it.name} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {it.href ? (
              <Link href={it.href} className="hover:text-ink">
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
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  meta?: { label: string; value: string }[];
  crumbs: { name: string; href?: string }[];
  tone?: "mix" | "cyan" | "violet";
}) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 sm:px-10">
      <Liquid tone={tone} />
      <span
        aria-hidden
        data-parallax="1.2"
        className="text-outline pointer-events-none absolute -right-[2vw] top-[12vh] select-none font-display text-[clamp(10rem,34vw,34rem)] font-extrabold leading-none tracking-tighter"
      >
        {index}
      </span>
      <div className="relative">
        <Crumbs items={crumbs} />
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
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p data-rv className="eyebrow mb-6">
          ( {index} ) — {label}
        </p>
        <h2 data-rv-lines className="font-display text-[clamp(2.6rem,7vw,7rem)] font-extrabold leading-[0.9] tracking-tighter">
          {title}
        </h2>
      </div>
      {aside && (
        <p data-rv className="eyebrow max-w-[30ch] md:text-right">
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

export function ThemeChips({ story }: { story: Story }) {
  return (
    <div className="flex flex-wrap gap-2">
      {story.themes.map((t) => (
        <Chip key={t}>{THEMES[t].short}</Chip>
      ))}
    </div>
  );
}

// A full story, used on company pages: sticky number and title on the left, the story on the right.
export function StoryRow({ story, n }: { story: Story; n: number }) {
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
          <ThemeChips story={story} />
        </div>
      </header>
      <div className="space-y-10 md:col-span-6 md:col-start-7">
        <Beat label="The problem" text={story.problem} />
        <Beat label="What I did" text={story.action} />
        <Beat label="Result" text={story.result} strong />
        {story.decision && (
          <div data-rv data-spot className="spot rounded-2xl border border-line bg-bg-2/70 p-6">
            <p className="eyebrow mb-3">The call</p>
            <p className="font-display text-xl font-bold">{story.decision.call}</p>
            <p className="mt-2 text-sm text-muted">Instead of: {story.decision.instead}</p>
            <p className="mt-4 leading-relaxed text-ink/80">{story.decision.why}</p>
          </div>
        )}
        <p data-rv className="border-l-2 border-cyan/70 pl-5 font-display text-[clamp(1.25rem,2vw,1.7rem)] font-bold leading-snug">
          {story.lesson}
        </p>
        {story.caseStudy && (
          <Link
            data-rv
            href={`/case-studies/${story.caseStudy}/`}
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan"
          >
            Read the full case study
            <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
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
export function StoryCard({ story, n }: { story: Story; n?: number }) {
  const c = companyBySlug(story.company);
  return (
    <Link
      href={storyHref(story)}
      data-spot
      data-cursor="Read"
      data-transition={c.name}
      className="spot group flex h-full flex-col rounded-3xl border border-line bg-bg-2/60 p-7 transition-colors duration-500 hover:border-transparent"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow">{n !== undefined ? `S/${String(n).padStart(2, "0")}` : c.short}</span>
        <span className="eyebrow">{c.name}</span>
      </div>
      <h3 className="mt-8 font-display text-2xl font-bold leading-tight tracking-tight">{story.title}</h3>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-ink/70">{story.problem}</p>
      <p className="mt-4 text-[0.95rem] leading-relaxed">
        <span className="text-gradient font-semibold">Result. </span>
        {story.result}
      </p>
      <div className="mt-auto flex items-end justify-between gap-4 pt-8">
        <ThemeChips story={story} />
        <span className="text-xl transition-transform duration-500 group-hover:-rotate-45">→</span>
      </div>
    </Link>
  );
}

export function NextChapter({ href, eyebrow, title }: { href: string; eyebrow: string; title: string }) {
  return (
    <Link href={href} data-transition={title} data-cursor="Next" className="sweep group block border-y border-line px-5 py-16 sm:px-10 sm:py-24">
      <p className="eyebrow transition-colors duration-500 group-hover:text-bg">{eyebrow}</p>
      <p className="mt-6 flex items-end justify-between gap-6 font-display text-[clamp(2.8rem,9vw,9.5rem)] font-extrabold leading-[0.9] tracking-tighter">
        <span>{title}</span>
        <span className="shrink-0 text-[0.6em] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-3 group-hover:-rotate-45">
          →
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
