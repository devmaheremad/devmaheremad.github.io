import Contact from "@/components/Contact";
import type { Lang } from "@/lib/i18n";

// The contact footer in the page's language.
export default function Footer({ index, lang }: { index: string; lang: Lang }) {
  return <Contact index={index} lang={lang} />;
}
