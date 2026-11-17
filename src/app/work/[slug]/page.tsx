import { notFound } from "next/navigation";
import Contact from "@/components/Contact";
import Motion from "@/components/page/Motion";
import { Chip, NextChapter, PageHero, SectionHead, StoryRow, BigLine } from "@/components/page/ui";
import { companies, companyBySlug, storiesFor } from "@/content/stories";
import { article, breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { clip } from "@/lib/text";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const c = companyBySlug((await params).slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} · ${c.role}`,
    description: clip(`${c.headline} ${c.intro}`, 158),
    path: `/work/${c.slug}/`,
    type: "article",
  });
}

export default async function CompanyPage({ params }: PageProps<"/work/[slug]">) {
  const c = companyBySlug((await params).slug);
  if (!c) notFound();
  const list = storiesFor(c.slug);
  const i = companies.indexOf(c);
  const next = companies[(i + 1) % companies.length];
  const path = `/work/${c.slug}/`;

  return (
    <Motion>
      <JsonLd
        graph={[
          breadcrumbs([
            { name: "Chapters", path: "/work/" },
            { name: c.name, path },
          ]),
          article({ headline: `${c.name}: ${c.headline}`, description: clip(c.intro, 200), path, about: c.name }),
        ]}
      />
      <main>
        <PageHero
          index={c.index}
          eyebrow={`Chapter ${c.index} — ${c.period}`}
          title={
            <>
              {c.name}
              <span className="text-gradient">.</span>
            </>
          }
          lead={c.headline}
          crumbs={[{ name: "Chapters", href: "/work/" }, { name: c.name }]}
          tone={i === 1 ? "violet" : i === 2 ? "cyan" : "mix"}
          meta={[
            { label: "Role", value: c.role },
            { label: "When", value: c.period },
            { label: "Where", value: c.place },
            { label: "Product", value: c.product },
          ]}
        />

        <section className="px-5 py-[16vh] sm:px-10">
          <p data-rv className="eyebrow mb-10">
            ( 01 ) — The context
          </p>
          <p data-rv-words className="max-w-[34ch] font-display text-[clamp(1.6rem,3.4vw,3.3rem)] font-bold leading-[1.12] tracking-tight">
            {c.intro}
          </p>
        </section>

        <section className="border-y border-line px-5 py-16 sm:px-10">
          <ul className="grid gap-12 md:grid-cols-3">
            {c.numbers.map((n) => (
              <li key={n.label} data-rv>
                <p
                  className={`text-gradient whitespace-nowrap font-display font-extrabold leading-none tracking-tight ${
                    n.value.length > 5 ? "text-[clamp(2.2rem,4vw,3.8rem)]" : "text-[clamp(2.6rem,5.5vw,5.4rem)]"
                  }`}
                >
                  {n.value}
                </p>
                <p className="mt-4 max-w-[28ch] text-sm leading-snug text-muted">{n.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 py-[16vh] sm:px-10">
          <SectionHead index="02" label="The role" title={<>What I <span className="text-gradient">owned.</span></>} aside={`${c.role} · ${c.place}`} />
          <ol>
            {c.facts.map((f, k) => (
              <li key={f} className="relative grid gap-4 py-7 md:grid-cols-12">
                <span data-rv-line className="absolute inset-x-0 top-0 h-px bg-line" />
                <span data-rv className="eyebrow md:col-span-1">
                  {String(k + 1).padStart(2, "0")}
                </span>
                <p data-rv className="text-lg leading-relaxed text-ink/85 md:col-span-9 md:col-start-3 sm:text-xl">
                  {f}
                </p>
              </li>
            ))}
          </ol>
          <div data-rv className="mt-12 flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <Chip key={s}>{s}</Chip>
            ))}
          </div>
        </section>

        <section className="px-5 pb-[10vh] sm:px-10">
          <SectionHead
            index="03"
            label="Stories"
            title={<>What <span className="text-gradient">happened.</span></>}
            aside={`${list.length} stories from ${c.name}: the problem, what I did, what came of it.`}
          />
          {list.map((s, k) => (
            <StoryRow key={s.id} story={s} n={k + 1} />
          ))}
        </section>

        <BigLine>
          <span className="text-gradient">What I took from it: </span>
          {c.lesson}
        </BigLine>

        <NextChapter href={`/work/${next.slug}/`} eyebrow={`Next chapter · ${next.index}`} title={next.name} />
      </main>
      <Contact index="04" />
    </Motion>
  );
}
