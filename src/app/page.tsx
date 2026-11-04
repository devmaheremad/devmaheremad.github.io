import Nav from "@/components/Nav";
import Hero from "@/components/hero/Hero";
import Manifesto from "@/components/Manifesto";
import Stats from "@/components/Stats";
import Work from "@/components/Work";
import Storefronts from "@/components/Storefronts";
import CaseStudies from "@/components/CaseStudies";
import Experience from "@/components/Experience";
import Marquee from "@/components/Marquee";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Stats />
        <Storefronts />
        <Work />
        <CaseStudies />
        <Experience />
        <Marquee />
      </main>
      <Contact />
    </>
  );
}
