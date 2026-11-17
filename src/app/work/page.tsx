import Link from "next/link";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero } from "@/components/page/ui";
import { companies, storiesFor } from "@/content/stories";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Three chapters: Konin Cloud (KoninPay, payments, Next.js), The Sailors (World Cup 2022 booking, 55% to 95%+ on Lighthouse) and Mars Innovation (Beljwar).";

export const metadata = pageMetadata({ title: "Chapters: where I've worked", description: DESCRIPTION, path: "/work/" });

export default function WorkIndex() {
  return (
    <Motion>
      <JsonLd graph={[breadcrumbs([{ name: "Chapters", path: "/work/" }]), collection({ name: "Chapters", description: DESCRIPTION, path: "/work/" })]} />
      <main>
        <PageHero
          index="03"
          eyebrow="Chapters — 2021 to 2025"
          title={
            <>
              Three <span className="text-gradient">chapters.</span>
            </>
          }
          lead="5+ years of shipping frontends, told company by company: what I owned, the problems I ran into, what I did, and what came of it."
          crumbs={[{ name: "Chapters" }]}
        />

        <section className="px-5 pb-[14vh] sm:px-10">
          <ol className="border-t border-line">
            {companies.map((c) => (
              <li key={c.slug} className="border-b border-line">
                <Link
                  href={`/work/${c.slug}/`}
                  data-transition={c.name}
                  data-cursor="Open"
                  className="sweep group grid gap-6 px-2 py-12 sm:px-4 md:grid-cols-12 md:items-end md:py-16"
                >
                  <span data-rv className="eyebrow md:col-span-1">
                    {c.index}
                  </span>
                  <div data-rv className="md:col-span-7">
                    <p className="eyebrow mb-4 transition-colors duration-500 group-hover:text-bg/70">
                      {c.period} · {c.role}
                    </p>
                    <h2 className="font-display text-[clamp(2.4rem,6.6vw,6.6rem)] font-extrabold leading-[0.92] tracking-tighter">{c.name}</h2>
                  </div>
                  <div data-rv className="md:col-span-4">
                    <p className="text-lg leading-snug">{c.headline}</p>
                    <p className="mt-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] opacity-70">
                      {storiesFor(c.slug).length} stories
                      <span className="text-2xl transition-transform duration-700 group-hover:-rotate-45">→</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
          <p data-rv className="mt-10 max-w-[60ch] text-muted">
            Before these: Internship Trainee at Gaza Sky Geeks (Jan — Aug 2020), intensive practical training in JavaScript, HTML5, CSS3 and
            modern frontend practices.
          </p>
        </section>

        <NextChapter href="/case-studies/" eyebrow="Go deeper" title="Case studies" />
      </main>
      <Contact index="04" />
    </Motion>
  );
}
