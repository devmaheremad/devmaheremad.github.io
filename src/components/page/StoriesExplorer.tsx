"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { THEMES, companies, stories, type CompanySlug, type Theme } from "@/content/stories";
import { StoryCard } from "./ui";

type Filter = { company: CompanySlug | "all"; theme: Theme | "all" };

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
        active ? "border-transparent bg-ink text-bg" : "border-line text-muted hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

export default function StoriesExplorer() {
  const [f, setF] = useState<Filter>({ company: "all", theme: "all" });
  const grid = useRef<HTMLUListElement>(null);
  const list = useMemo(
    () => stories.filter((s) => (f.company === "all" || s.company === f.company) && (f.theme === "all" || s.themes.includes(f.theme))),
    [f],
  );

  useEffect(() => {
    if (!grid.current) return;
    ScrollTrigger.refresh();
    if (prefersReducedMotion()) return;
    gsap.fromTo(grid.current.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", stagger: 0.04 });
  }, [list]);

  return (
    <div>
      <div className="mb-12 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 w-20">Company</span>
          <Pill active={f.company === "all"} onClick={() => setF({ ...f, company: "all" })}>
            All
          </Pill>
          {companies.map((c) => (
            <Pill key={c.slug} active={f.company === c.slug} onClick={() => setF({ ...f, company: c.slug })}>
              {c.name}
            </Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-2 w-20">Theme</span>
          <Pill active={f.theme === "all"} onClick={() => setF({ ...f, theme: "all" })}>
            All
          </Pill>
          {(Object.keys(THEMES) as Theme[]).map((t) => (
            <Pill key={t} active={f.theme === t} onClick={() => setF({ ...f, theme: t })}>
              {THEMES[t].short}
            </Pill>
          ))}
        </div>
        <p className="eyebrow pt-2" aria-live="polite">
          {list.length} {list.length === 1 ? "story" : "stories"}
        </p>
      </div>
      <ul ref={grid} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => (
          <li key={s.id}>
            <StoryCard story={s} n={stories.indexOf(s) + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}
