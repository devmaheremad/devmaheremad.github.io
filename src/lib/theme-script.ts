// Theme constants the root layout (a server component) needs; lib/theme.ts has the client side.
export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const THEME_BG: Record<Theme, string> = { dark: "#07070a", light: "#f3f1ea" };

// Runs in <head> before the first paint. Dark is the site's look (owner, 2026-11-24): every first visit is dark,
// whatever the system setting; light only for a visitor who picked it with the switch. Also marks later visits in the
// same tab, so the preloader plays its short version (globals.css, .pl-quick).
export const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("${THEME_KEY}")==="light"?"light":"dark";d.setAttribute("data-theme",t);if(sessionStorage.getItem("pl-seen"))d.classList.add("pl-quick")}catch(e){d.setAttribute("data-theme","dark")}})();`;
