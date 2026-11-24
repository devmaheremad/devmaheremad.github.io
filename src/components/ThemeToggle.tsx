"use client";

import { useEffect } from "react";
import { getTheme, setTheme, syncThemeColor, useTheme } from "@/lib/theme";
import { sfx } from "@/lib/sound";
import type { Lang } from "@/lib/i18n";

const LABEL = {
  en: { dark: "Switch to light theme", light: "Switch to dark theme" },
  ar: { dark: "التبديل إلى الوضع الفاتح", light: "التبديل إلى الوضع الداكن" },
};

const RAYS = Array.from({ length: 8 }, (_, i) => {
  const a = (i * Math.PI) / 4;
  const p = (r: number) => [12 + Math.cos(a) * r, 12 + Math.sin(a) * r].map((n) => +n.toFixed(2));
  return [...p(7.6), ...p(10)];
});

// Light / dark switch: a sun that folds into a moon. The icon follows the theme in CSS (globals.css, .tt-icon),
// so it is right on the first paint; only the label needs JavaScript.
export default function ThemeToggle({ lang }: { lang: Lang }) {
  const theme = useTheme();
  useEffect(() => syncThemeColor(), []);

  return (
    <button
      type="button"
      data-magnetic
      data-sfx="none"
      onClick={(e) => {
        const b = e.currentTarget.getBoundingClientRect();
        const next = getTheme() === "dark" ? "light" : "dark";
        sfx(next === "light" ? "theme-light" : "theme-dark");
        setTheme(next, { x: b.left + b.width / 2, y: b.top + b.height / 2 });
      }}
      aria-label={LABEL[lang][theme]}
      title={LABEL[lang][theme]}
      className="grid h-9 w-9 place-items-center rounded-full border border-line transition-colors duration-300 hover:border-ink/40"
    >
      <svg className="tt-icon" width="18" height="18" viewBox="0 0 24 24" aria-hidden>
        <mask id="tt-mask">
          <rect width="24" height="24" fill="#fff" />
          <circle className="tt-bite" cx="17.5" cy="6.5" r="6" fill="#000" />
        </mask>
        <circle className="tt-core" cx="12" cy="12" r="4.4" fill="currentColor" mask="url(#tt-mask)" />
        <g className="tt-rays" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {RAYS.map(([x1, y1, x2, y2], i) => (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
          ))}
        </g>
      </svg>
    </button>
  );
}
