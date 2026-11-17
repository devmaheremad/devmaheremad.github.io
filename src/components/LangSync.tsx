"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One root layout serves both languages. The static HTML of /ar/ already says lang="ar" dir="rtl" (set after the
// build); this keeps <html> right when the visitor moves between Arabic and English without a full page load.
export default function LangSync() {
  const pathname = usePathname();
  useEffect(() => {
    const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
    document.documentElement.lang = isAr ? "ar" : "en";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [pathname]);
  return null;
}
