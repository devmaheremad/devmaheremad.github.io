// Theme constants the root layout (a server component) needs; lib/theme.ts has the client side.
export type Theme = "dark" | "light";

export const THEME_KEY = "theme";
export const THEME_BG: Record<Theme, string> = { dark: "#07070a", light: "#f3f1ea" };

// Runs in <head> before the first paint: the saved choice, else the system setting. Also marks later visits in the
// same tab, so the preloader plays its short version (globals.css, .pl-quick).
export const THEME_SCRIPT = `(function(){var d=document.documentElement;try{var s=localStorage.getItem("${THEME_KEY}");var t=s==="light"||s==="dark"?s:matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.setAttribute("data-theme",t);if(sessionStorage.getItem("pl-seen"))d.classList.add("pl-quick")}catch(e){d.setAttribute("data-theme","dark")}})();`;
