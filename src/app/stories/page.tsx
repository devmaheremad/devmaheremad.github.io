import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import StoriesExplorer from "@/components/page/StoriesExplorer";
import { NextChapter, PageHero } from "@/components/page/ui";
import { companies, stories } from "@/content/stories";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION = `${stories.length} short frontend stories from Konin Cloud, The Sailors and Mars Innovation Technology: payments, performance, booking flows, testing and technical decisions.`;

export const metadata = pageMetadata({ title: "Stories from the work", description: DESCRIPTION, path: "/stories/" });

export default function StoriesPage() {
  return (
    <Motion>
      <JsonLd graph={[breadcrumbs([{ name: "Stories", path: "/stories/" }]), collection({ name: "Stories from the work", description: DESCRIPTION, path: "/stories/" })]} />
      <main>
        <PageHero
          index={String(stories.length)}
          eyebrow={`Stories — ${stories.length} of them, from ${companies.length} companies`}
          title={
            <>
              Stories from <span className="text-gradient">the work.</span>
            </>
          }
          lead="Short and specific: the problem, what I did, and what came of it. Filter by company or by the kind of problem."
          crumbs={[{ name: "Stories" }]}
        />
        <section className="px-5 pb-[14vh] sm:px-10">
          <StoriesExplorer />
        </section>
        <NextChapter href="/work/" eyebrow="The full chapters" title="Where it happened" />
      </main>
      <Contact index="✦" />
    </Motion>
  );
}
