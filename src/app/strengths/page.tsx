import Link from "next/link";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero } from "@/components/page/ui";
import { THEMES, companyBySlug, storyById, storyHref, strengths } from "@/content/stories";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Six frontend strengths, each backed by real stories: performance, technical decisions, payment-flow quality, UX, ownership and working across teams.";

export const metadata = pageMetadata({ title: "Strengths", description: DESCRIPTION, path: "/strengths/" });

export default function StrengthsPage() {
  return (
    <Motion>
      <JsonLd graph={[breadcrumbs([{ name: "Strengths", path: "/strengths/" }]), collection({ name: "Strengths", description: DESCRIPTION, path: "/strengths/" })]} />
      <main>
        <PageHero
          index="06"
          eyebrow="Strengths — with receipts"
          title={
            <>
              What I&apos;m <span className="text-gradient">good at.</span>
            </>
          }
          lead="Six strengths, and the stories behind each one. No adjective here without a story you can read."
          crumbs={[{ name: "Strengths" }]}
          tone="cyan"
        />

        <section className="px-5 pb-[12vh] sm:px-10">
          {strengths.map((s, k) => (
            <article key={s.theme} id={s.theme} className="relative grid scroll-mt-28 gap-10 py-16 md:grid-cols-12 md:py-24">
              <span data-rv-line className="absolute inset-x-0 top-0 h-px bg-line" />
              <div className="self-start md:sticky md:top-28 md:col-span-5">
                <span aria-hidden className="text-outline block font-display text-[clamp(5rem,12vw,11rem)] font-extrabold leading-[0.8] tracking-tighter">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <p data-rv className="eyebrow mt-6">
                  {THEMES[s.theme].label}
                </p>
              </div>
              <div className="md:col-span-7">
                <h2 data-rv-lines className="font-display text-[clamp(2rem,4.4vw,4.2rem)] font-extrabold leading-[0.98] tracking-tight">
                  {s.claim}
                </h2>
                <p data-rv className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/75">
                  {s.body}
                </p>
                <p data-rv className="eyebrow mb-4 mt-12">
                  The evidence
                </p>
                <ul className="border-t border-line">
                  {s.stories.map((id) => {
                    const st = storyById(id);
                    return (
                      <li key={id} data-rv className="border-b border-line">
                        <Link
                          href={storyHref(st)}
                          data-transition={companyBySlug(st.company).name}
                          className="group flex items-baseline justify-between gap-6 py-5"
                        >
                          <span className="text-lg transition-transform duration-500 group-hover:translate-x-2 sm:text-xl">{st.title}</span>
                          <span className="flex shrink-0 items-center gap-4">
                            <span className="eyebrow hidden sm:inline">{companyBySlug(st.company).name}</span>
                            <span className="transition-transform duration-500 group-hover:-rotate-45">→</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          ))}
        </section>

        <NextChapter href="/decisions/" eyebrow="How I decide" title="Decisions" />
      </main>
      <Contact index="✦" />
    </Motion>
  );
}
