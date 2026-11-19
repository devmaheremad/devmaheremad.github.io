import { Alexandria, IBM_Plex_Sans_Arabic } from "next/font/google";

// Arabic fonts load on the Arabic pages only; the English pages keep their Latin fonts.
const arDisplay = Alexandria({ variable: "--font-ar-display", subsets: ["arabic", "latin"], weight: ["700", "800"] });
const arBody = IBM_Plex_Sans_Arabic({ variable: "--font-ar-body", subsets: ["arabic", "latin"], weight: ["400", "500", "700"] });

// Set on :root, not on this wrapper, so the menu and the page curtain (both outside this layout) can use them too.
const fontVars = `:root{--font-ar-display:${arDisplay.style.fontFamily};--font-ar-body:${arBody.style.fontFamily}}`;

export default function ArabicLayout({ children }: LayoutProps<"/ar">) {
  return (
    <div lang="ar" dir="rtl" className="ar-page">
      <style dangerouslySetInnerHTML={{ __html: fontVars }} />
      {children}
    </div>
  );
}
