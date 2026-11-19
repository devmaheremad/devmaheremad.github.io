"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { counterpart, isArPath } from "@/lib/i18n";

// The language switch: the same page in the other language (/work/ <-> /ar/work/).
export default function LangLink({ children, className }: { children: ReactNode; className?: string }) {
  const to = counterpart(usePathname());
  const ar = isArPath(to);
  return (
    <Link href={to} hrefLang={ar ? "ar" : "en"} lang={ar ? "ar" : "en"} data-transition={ar ? "العربية" : "English"} className={className}>
      {children}
    </Link>
  );
}
