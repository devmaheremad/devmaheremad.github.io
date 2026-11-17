import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { Chip, NextChapter, PageHero, SectionHead, StoryCard, BigLine } from "@/components/page/ui";
import { caseStudiesLong, companyBySlug, storyById } from "@/content/stories";
import { article, breadcrumbs, JsonLd, OG_CASE_STUDIES, pageMetadata } from "@/lib/seo";
import { clip } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudiesLong.map((c) => ({ slug: c.slug }));
}

const find = (slug: string) => caseStudiesLong.find((c) => c.slug === slug);

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const cs = find((await params).slug);
  if (!cs) return {};
  return pageMetadata({
    title: cs.title,
    description: clip(`${cs.outcome} ${cs.constraint}`, 158),
    path: `/case-studies/${cs.slug}/`,
    type: "article",
    image: OG_CASE_STUDIES,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const cs = find((await params).slug);
  if (!cs) notFound();
  const c = companyBySlug(cs.company);
  const i = caseStudiesLong.indexOf(cs);
  const next = caseStudiesLong[i + 1];
  const path = `/case-studies/${cs.slug}/`;

  return (
    <Motion>
      <JsonLd
        graph={[
          breadcrumbs([
            { name: "Case studies", path: "/case-studies/" },
            { name: cs.title, path },
          ]),
          article({ headline: cs.title, description: cs.outcome, path, about: c.name }),
        ]}
      />
      <main>
        <PageHero
          index={String(i + 1).padStart(2, "0")}
          eyebrow={`Case study ${String(i + 1).padStart(2, "0")} — ${cs.kicker}`}
          title={cs.title}
          lead={cs.outcome}
          crumbs={[{ name: "Case studies", href: "/case-studies/" }, { name: cs.kicker }]}
          tone={i === 0 ? "cyan" : i === 1 ? "violet" : "mix"}
          meta={[
            { label: "Company", value: c.name },
            { label: "Role", value: c.role },
            { label: "When", value: c.period },
            { label: "Stack", value: cs.stack.slice(0, 3).join(", ") },
          ]}
        />

        <section className="grid gap-14 px-5 py-[16vh] sm:px-10 md:grid-cols-2">
          <div>
            <p data-rv className="eyebrow mb-6">
              ( 01 ) — Context
            </p>
            <p data-rv className="text-xl leading-relaxed text-ink/85 sm:text-2xl">
              {cs.context}
            </p>
          </div>
          <div>
            <p data-rv className="eyebrow mb-6">
              The challenge
            </p>
            <p data-rv-words className="font-display text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-[1.1] tracking-tight">
              {cs.constraint}
            </p>
          </div>
        </section>

        {cs.options && (
          <section className="px-5 pb-[14vh] sm:px-10">
            <SectionHead index="02" label="The options" title={<>Two ways <span className="text-gradient">to go.</span></>} />
            <div className="grid gap-6 md:grid-cols-2">
              {cs.options.map((o, k) => {
                const chosen = k === cs.options!.length - 1;
                return (
                  <div
                    key={o.option}
                    data-rv
                    data-spot
                    className={`spot rounded-3xl border p-8 sm:p-10 ${chosen ? "border-cyan/50 bg-bg-2" : "border-line bg-bg-2/40 text-ink/60"}`}
                  >
                    <p className="eyebrow mb-6">{chosen ? "What we went with" : `Option ${String.fromCharCode(65 + k)}`}</p>
                    <p className={`font-display text-[clamp(1.8rem,3.4vw,3rem)] font-extrabold leading-tight ${chosen ? "text-gradient" : ""}`}>{o.option}</p>
                    <p className="mt-4 text-lg leading-relaxed">{o.note}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section data-hscroll className="relative overflow-hidden lg:h-[100svh]">
          <div className="px-5 pt-[8vh] sm:px-10 lg:absolute lg:inset-x-0 lg:top-0">
            <p className="eyebrow">( {cs.options ? "03" : "02"} ) — What I did</p>
          </div>
          <div data-hscroll-track className="flex flex-col gap-6 px-5 py-10 sm:px-10 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:py-0">
            {cs.steps.map((s, k) => (
              <article
                key={s.title}
                data-spot
                className="spot flex flex-col justify-between rounded-3xl border border-line bg-bg-2/70 p-8 sm:p-12 lg:h-[62vh] lg:w-[min(64vw,820px)]"
              >
                <span className="text-outline font-display text-[clamp(5rem,10vw,9rem)] font-extrabold leading-[0.8]">{String(k + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="mt-8 font-display text-[clamp(2rem,4vw,3.6rem)] font-extrabold leading-[0.95] tracking-tight">{s.title}</h3>
                  <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink/80">{s.body}</p>
                </div>
              </article>
            ))}
            <div className="hidden w-[10vw] shrink-0 lg:block" />
          </div>
        </section>

        <section className="px-5 py-[16vh] sm:px-10">
          <p data-rv className="eyebrow mb-10">
            The result
          </p>
          <p data-rv-words className="max-w-[30ch] font-display text-[clamp(1.8rem,4.4vw,4.4rem)] font-bold leading-[1.06] tracking-tight">
            {cs.result}
          </p>
          <div data-rv className="mt-12 flex flex-wrap gap-2">
            {cs.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </section>

        <BigLine>
          <span className="text-gradient">Lesson: </span>
          {cs.learned}
        </BigLine>

        <section className="px-5 pb-[16vh] sm:px-10">
          <SectionHead index="✦" label="Related" title={<>More from <span className="text-gradient">{c.name}.</span></>} />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cs.stories.map((id) => (
              <div key={id} data-rv>
                <StoryCard story={storyById(id)} />
              </div>
            ))}
          </div>
        </section>

        {next ? (
          <NextChapter href={`/case-studies/${next.slug}/`} eyebrow="Next case study" title={next.title} />
        ) : (
          <NextChapter href="/strengths/" eyebrow="What it adds up to" title="Strengths" />
        )}
      </main>
      <Contact index="✦" />
    </Motion>
  );
}
