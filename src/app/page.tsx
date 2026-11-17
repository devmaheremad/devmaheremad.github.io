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

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Manifesto />
        <Stats />
        <Storefronts />
        <Work />
        <CaseStudies />
        <Experience />
        <GoDeeper />
        <Marquee />
      </main>
      <Contact index="07" />
    </>
  );
}
