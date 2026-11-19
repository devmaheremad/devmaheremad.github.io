"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/motion";
import { storiesCount, type Lang } from "@/lib/i18n";

// The cards are rendered on the server in the page's language and passed in; this component only filters them.
export type ExplorerItem = { id: string; company: string; themes: string[]; card: ReactNode };
type Filter = { company: string; theme: string };

const LABELS: Record<Lang, { company: string; theme: string; all: string }> = {
  en: { company: "Company", theme: "Theme", all: "All" },
  ar: { company: "الشركة", theme: "الموضوع", all: "الكل" },
};

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
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

export default function StoriesExplorer({
  items,
  companies,
  themes,
  lang = "en",
}: {
  items: ExplorerItem[];
  companies: { slug: string; name: string }[];
  themes: { key: string; short: string }[];
  lang?: Lang;
}) {
  const t = LABELS[lang];
  const [f, setF] = useState<Filter>({ company: "all", theme: "all" });
  const grid = useRef<HTMLUListElement>(null);
  const list = useMemo(
    () => items.filter((s) => (f.company === "all" || s.company === f.company) && (f.theme === "all" || s.themes.includes(f.theme))),
    [f, items],
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
          <span className="eyebrow me-2 w-20">{t.company}</span>
          <Pill active={f.company === "all"} onClick={() => setF({ ...f, company: "all" })}>
            {t.all}
          </Pill>
          {companies.map((c) => (
            <Pill key={c.slug} active={f.company === c.slug} onClick={() => setF({ ...f, company: c.slug })}>
              {c.name}
            </Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow me-2 w-20">{t.theme}</span>
          <Pill active={f.theme === "all"} onClick={() => setF({ ...f, theme: "all" })}>
            {t.all}
          </Pill>
          {themes.map((th) => (
            <Pill key={th.key} active={f.theme === th.key} onClick={() => setF({ ...f, theme: th.key })}>
              {th.short}
            </Pill>
          ))}
        </div>
        <p className="eyebrow pt-2" aria-live="polite">
          {storiesCount(list.length, lang)}
        </p>
      </div>
      <ul ref={grid} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((s) => (
          <li key={s.id}>{s.card}</li>
        ))}
      </ul>
    </div>
  );
}
