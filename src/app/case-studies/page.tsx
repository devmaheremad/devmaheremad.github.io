import Link from "next/link";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero } from "@/components/page/ui";
import { caseStudiesLong, companyBySlug } from "@/content/stories";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "Three frontend case studies: from about 55% to 95%+ on Lighthouse, a FIFA World Cup Qatar 2022 ticket-booking launch, and choosing Next.js for a multi-store SaaS platform.";

export const metadata = pageMetadata({ title: "Case studies", description: DESCRIPTION, path: "/case-studies/" });

export default function CaseStudiesIndex() {
  return (
    <Motion>
      <JsonLd
        graph={[breadcrumbs([{ name: "Case studies", path: "/case-studies/" }]), collection({ name: "Case studies", description: DESCRIPTION, path: "/case-studies/" })]}
      />
      <main>
        <PageHero
          index="CS"
          eyebrow="Case studies — the long versions"
          title={
            <>
              How I <span className="text-gradient">solved it.</span>
            </>
          }
          lead="Three projects told in full: the context, the options on the table, what I did step by step, and the result."
          crumbs={[{ name: "Case studies" }]}
          tone="violet"
        />
        <section className="px-5 pb-[14vh] sm:px-10">
          <ol className="border-t border-line">
            {caseStudiesLong.map((cs, k) => (
              <li key={cs.slug} className="border-b border-line">
                <Link
                  href={`/case-studies/${cs.slug}/`}
                  data-transition={cs.kicker}
                  data-cursor="Read"
                  className="sweep group grid gap-6 px-2 py-12 sm:px-4 md:grid-cols-12 md:items-end md:py-16"
                >
                  <span data-rv className="eyebrow md:col-span-1">
                    {String(k + 1).padStart(2, "0")}
                  </span>
                  <div data-rv className="md:col-span-7">
                    <p className="eyebrow mb-4 transition-colors duration-500 group-hover:text-bg/70">
                      {cs.kicker} · {companyBySlug(cs.company).name}
                    </p>
                    <h2 className="font-display text-[clamp(2rem,4.8vw,4.8rem)] font-extrabold leading-[0.95] tracking-tighter">{cs.title}</h2>
                  </div>
                  <div data-rv className="md:col-span-4">
                    <p className="text-lg leading-snug">{cs.outcome}</p>
                    <span className="mt-4 block text-right text-2xl transition-transform duration-700 group-hover:-rotate-45">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
        <NextChapter href="/strengths/" eyebrow="What it adds up to" title="Strengths" />
      </main>
      <Contact index="✦" />
    </Motion>
  );
}
