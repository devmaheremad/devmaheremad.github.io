"use client";

import { useSyncExternalStore } from "react";
import { THEME_BG, THEME_KEY as KEY, type Theme } from "./theme-script";

export type { Theme };

export function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(cb: () => void) {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
}

// The current theme, for code that cannot read CSS variables (the WebGL hero). Dark during the server render.
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}

function apply(theme: Theme, save: boolean) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", THEME_BG[theme]));
  if (save) {
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
  }
}

// The browser bar takes the colour of the theme the page opened in (the server HTML says dark).
export function syncThemeColor() {
  apply(getTheme(), false);
}

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
};

// Switch theme. With View Transitions the new theme spreads in a circle from (x, y); otherwise the colours cross-fade.
export function setTheme(theme: Theme, from?: { x: number; y: number }) {
  const html = document.documentElement;
  const doc = document as ViewTransitionDoc;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!doc.startViewTransition || !from) {
    html.classList.add("theme-fade");
    apply(theme, true);
    window.setTimeout(() => html.classList.remove("theme-fade"), 550);
    return;
  }
  // "Reduce motion": the browser's own short cross-fade, no circle.
  if (calm) {
    doc.startViewTransition(() => apply(theme, true));
    return;
  }
  html.classList.add("theme-vt");
  const vt = doc.startViewTransition(() => apply(theme, true));
  vt.ready
    .then(() => {
      const r = Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y));
      html.animate(
        { clipPath: [`circle(0px at ${from.x}px ${from.y}px)`, `circle(${r}px at ${from.x}px ${from.y}px)`] },
        { duration: 900, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
  vt.finished.finally(() => html.classList.remove("theme-vt"));
}
