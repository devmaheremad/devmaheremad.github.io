// Every page exists twice: English at /path/ and Arabic at /ar/path/. Content stays the same in both; only the language changes.

export type Lang = "en" | "ar";

export const isArPath = (pathname: string) => pathname === "/ar" || pathname.startsWith("/ar/");

/** The same page in the given language: "/work/" -> "/ar/work/". Hashes and queries pass through. */
export function localePath(path: string, lang: Lang) {
  if (lang === "en") return path;
  return path === "/" ? "/ar/" : `/ar${path}`;
}

/** The same page in the other language, for the language switch. */
export function counterpart(pathname: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (isArPath(p)) return p.slice(3) || "/";
  return p === "/" ? "/ar/" : `/ar${p}`;
}

/** "8 stories" / "8 قصص": Arabic counts take a plural form for 3-10 and a singular one from 11 up. */
export function count(n: number, lang: Lang, en: [string, string], ar: { one: string; two: string; few: string; many: string }) {
  if (lang === "en") return `${n} ${n === 1 ? en[0] : en[1]}`;
  if (n === 1) return ar.one;
  if (n === 2) return ar.two;
  return `${n} ${n >= 3 && n <= 10 ? ar.few : ar.many}`;
}

export const storiesCount = (n: number, lang: Lang) =>
  count(n, lang, ["story", "stories"], { one: "قصة واحدة", two: "قصتان", few: "قصص", many: "قصة" });

// Words that appear on many pages.
export const UI = {
  en: {
    home: "Home",
    chapters: "Chapters",
    caseStudies: "Case studies",
    strengths: "Strengths",
    decisions: "Decisions",
    stories: "Stories",
    contact: "Contact",
    problem: "The problem",
    action: "What I did",
    result: "Result",
    resultShort: "Result. ",
    call: "The call",
    insteadOf: "Instead of: ",
    readCaseStudy: "Read the full case study",
    storyLabel: (n: number) => `S/${String(n).padStart(2, "0")}`,
    arrow: "→",
    cursorOpen: "Open",
    cursorRead: "Read",
    cursorNext: "Next",
  },
  ar: {
    home: "الرئيسية",
    chapters: "الفصول",
    caseStudies: "دراسات الحالة",
    strengths: "نقاط القوة",
    decisions: "القرارات",
    stories: "القصص",
    contact: "تواصل",
    problem: "المشكلة",
    action: "ما فعلته",
    result: "النتيجة",
    resultShort: "النتيجة. ",
    call: "القرار",
    insteadOf: "بدلًا من: ",
    readCaseStudy: "اقرأ دراسة الحالة كاملة",
    storyLabel: (n: number) => `قصة ${String(n).padStart(2, "0")}`,
    arrow: "←",
    cursorOpen: "افتح",
    cursorRead: "اقرأ",
    cursorNext: "التالي",
  },
} satisfies Record<Lang, Record<string, unknown>>;
