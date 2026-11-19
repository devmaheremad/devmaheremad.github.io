import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Storefronts from "@/components/Storefronts";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import GoDeeper from "@/components/GoDeeper";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";
import { homeContent } from "@/content/home";

// The Arabic homepage (src/app/ar/page.tsx) renders these same sections, in the same order.
export default function Home() {
  const c = homeContent("en");
  return (
    <>
      <main>
        <Hero intro={c.intro} />
        <Manifesto text={c.manifesto} />
        <Stats items={c.stats} />
        <Storefronts />
        <Work groups={c.workGroups} />
        <CaseStudies items={c.caseStudies} />
        <Experience items={c.experience} />
        <GoDeeper />
        <Marquee />
      </main>
      <Contact index="07" />
    </>
  );
}
