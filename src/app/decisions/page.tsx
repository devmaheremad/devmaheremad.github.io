import Link from "next/link";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { NextChapter, PageHero, SectionHead } from "@/components/page/ui";
import { companyBySlug, stories, storyById, storyHref } from "@/content/stories";
import { breadcrumbs, collection, JsonLd, pageMetadata } from "@/lib/seo";

const DESCRIPTION =
  "How I make frontend decisions: the calls I'd make again (Next.js over Blade, World Cup booking inside the platform) and the ones made under pressure.";

export const metadata = pageMetadata({ title: "Decisions, and why", description: DESCRIPTION, path: "/decisions/" });

// Each principle is the lesson of a real story.
const PRINCIPLES = [
  { title: "Measure before deciding.", body: "Start from the numbers, find the causes, then fix them.", story: "lighthouse-55-95" },
  { title: "Write the trade-offs down.", body: "A written comparison persuades better than an opinion, especially outside frontend.", story: "nextjs-decision" },
  { title: "Reuse when the deadline is fixed.", body: "Less to build means less to test, and a launch that happens on time.", story: "world-cup-inside" },
  { title: "Protect the money first.", body: "Payments and wallets get tested before anything else, on both sides of the API.", story: "money-paths" },
];

export default function DecisionsPage() {
  const calls = stories.filter((s) => s.decision);
  const pressure = stories.filter((s) => s.pressure);

  return (
    <Motion>
      <JsonLd graph={[breadcrumbs([{ name: "Decisions", path: "/decisions/" }]), collection({ name: "Decisions, and why", description: DESCRIPTION, path: "/decisions/" })]} />
      <main>
        <PageHero
          index="D"
          eyebrow="Decisions — calls I'd make again"
          title={
            <>
              Decisions, <span className="text-gradient">and why.</span>
            </>
          }
          lead="How I decide, the calls I made, and the ones made under pressure: a deadline that couldn't move, traffic peaks, and money on the line."
          crumbs={[{ name: "Decisions" }]}
          tone="violet"
        />

        <section className="px-5 py-[12vh] sm:px-10">
          <SectionHead index="01" label="Principles" title={<>How I <span className="text-gradient">decide.</span></>} />
          <ol className="grid gap-6 md:grid-cols-2">
            {PRINCIPLES.map((p, k) => {
              const st = storyById(p.story);
              return (
                <li key={p.title} data-rv>
                  <Link href={storyHref(st)} data-spot data-transition={companyBySlug(st.company).name} className="spot group flex h-full flex-col rounded-3xl border border-line bg-bg-2/60 p-8 sm:p-10">
                    <span className="eyebrow">P/{String(k + 1).padStart(2, "0")}</span>
                    <h3 className="mt-8 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-extrabold leading-[1] tracking-tight">{p.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-ink/75">{p.body}</p>
                    <p className="mt-auto flex items-center justify-between gap-4 pt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      From: {st.title}
                      <span className="text-lg text-ink transition-transform duration-500 group-hover:-rotate-45">→</span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>

        <section data-hscroll className="relative overflow-hidden lg:h-[100svh]">
          <div className="px-5 pt-[8vh] sm:px-10 lg:absolute lg:inset-x-0 lg:top-0">
            <p className="eyebrow">( 02 ) — The calls · {calls.length} decisions</p>
          </div>
          <div data-hscroll-track className="flex flex-col gap-6 px-5 py-10 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:py-0">
            <div className="shrink-0 lg:w-[34vw]">
              <h2 className="font-display text-[clamp(2.6rem,6vw,6.4rem)] font-extrabold leading-[0.9] tracking-tighter">
                The calls I&apos;d <span className="text-gradient">make again.</span>
              </h2>
              <p className="mt-6 hidden max-w-[34ch] text-muted lg:block">Keep scrolling: each card is a decision, what it replaced, and why.</p>
            </div>
            {calls.map((s, k) => (
              <Link
                key={s.id}
                href={storyHref(s)}
                data-spot
                data-cursor="Read"
                data-transition={companyBySlug(s.company).name}
                className="spot group flex shrink-0 flex-col rounded-3xl border border-line bg-bg-2/70 p-8 sm:p-10 lg:min-h-[64vh] lg:w-[min(40vw,540px)]"
              >
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow">Call {String(k + 1).padStart(2, "0")}</span>
                  <span className="eyebrow">{companyBySlug(s.company).name}</span>
                </div>
                <h3 className="mt-8 font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-extrabold leading-[1] tracking-tight">{s.decision!.call}</h3>
                <p className="mt-4 text-sm text-muted">
                  Instead of: <span className="text-ink/70 line-through decoration-violet/60">{s.decision!.instead}</span>
                </p>
                <p className="mt-6 leading-relaxed text-ink/80">{s.decision!.why}</p>
                <p className="mt-auto pt-8 leading-relaxed">
                  <span className="text-gradient font-semibold">What happened. </span>
                  {s.result}
                </p>
              </Link>
            ))}
            <div className="hidden w-[8vw] shrink-0 lg:block" />
          </div>
        </section>

        <section className="px-5 py-[14vh] sm:px-10">
          <SectionHead
            index="03"
            label="Under pressure"
            title={<>When it got <span className="text-gradient">hard.</span></>}
            aside="Decisions made with the clock running, traffic spiking or money on the line."
          />
          <ol className="relative">
            <span aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-line md:left-1/2" />
            {pressure.map((s, k) => (
              <li key={s.id} className={`relative grid gap-6 pb-16 pl-10 md:w-1/2 md:pl-0 ${k % 2 ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right"}`}>
                <span
                  aria-hidden
                  className={`absolute left-[5px] top-2 h-3.5 w-3.5 rounded-full bg-gradient-to-r from-cyan to-violet shadow-[0_0_24px_rgba(76,195,255,.6)] ${
                    k % 2 ? "md:-left-[7px]" : "md:-right-[7px] md:left-auto"
                  }`}
                />
                <div data-rv>
                  <p className="eyebrow">{companyBySlug(s.company).name}</p>
                  <h3 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-[1.02] tracking-tight">{s.title}</h3>
                  <p className="mt-4 text-sm uppercase tracking-[0.14em] text-violet">The pressure: {s.pressure}</p>
                  <p className="mt-4 leading-relaxed text-ink/80">{s.action}</p>
                  <p className="mt-3 leading-relaxed">
                    <span className="text-gradient font-semibold">Outcome. </span>
                    {s.result}
                  </p>
                  <Link href={storyHref(s)} className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.18em] text-cyan">
                    Full story →
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <NextChapter href="/stories/" eyebrow="Every story, one place" title="Stories" />
      </main>
      <Contact index="✦" />
    </Motion>
  );
}
