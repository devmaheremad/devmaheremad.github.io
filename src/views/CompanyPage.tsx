import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Motion from "@/components/page/Motion";
import { BigLine, Chip, NextChapter, PageHero, SectionHead, Split, StoryRow } from "@/components/page/ui";
import { getContent } from "@/content/localized";
import { UI, storiesCount, type Lang } from "@/lib/i18n";
import { article, breadcrumbs, JsonLd, pageMetadata } from "@/lib/seo";
import { clip } from "@/lib/text";

const COPY = {
  en: {
    chapter: (i: string, period: string) => `Chapter ${i} — ${period}`,
    role: "Role",
    when: "When",
    where: "Where",
    product: "Product",
    context: "The context",
    roleLabel: "The role",
    owned: ["What I ", "owned."],
    storiesLabel: "Stories",
    happened: ["What ", "happened."],
    aside: (n: number, name: string) => `${storiesCount(n, "en")} from ${name}: the problem, what I did, what came of it.`,
    took: "What I took from it: ",
    next: (i: string) => `Next chapter · ${i}`,
  },
  ar: {
    chapter: (i: string, period: string) => `الفصل ${i} — ${period}`,
    role: "الدور",
    when: "المدة",
    where: "المكان",
    product: "المنتج",
    context: "السياق",
    roleLabel: "الدور",
    owned: ["ما ", "تولّيته."],
    storiesLabel: "القصص",
    happened: ["ماذا ", "حدث."],
    aside: (n: number, name: string) => `${storiesCount(n, "ar")} من ${name}: المشكلة، وما فعلته، وما نتج عنه.`,
    took: "ما تعلّمته: ",
    next: (i: string) => `الفصل التالي · ${i}`,
  },
} as const;

export function companyMetadata(slug: string, lang: Lang) {
  const c = getContent(lang).companyBySlug(slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name} · ${c.role}`,
    description: clip(`${c.headline} ${c.intro}`, 158),
    path: `/work/${c.slug}/`,
    type: "article",
    lang,
  });
}

export default function CompanyPage({ slug, lang }: { slug: string; lang: Lang }) {
  const { companies, companyBySlug, storiesFor } = getContent(lang);
  const c = companyBySlug(slug);
  if (!c) notFound();
  const t = COPY[lang];
  const ui = UI[lang];
  const list = storiesFor(c.slug);
  const i = companies.indexOf(c);
  const next = companies[(i + 1) % companies.length];
  const path = `/work/${c.slug}/`;

  return (
    <Motion className={lang === "ar" ? "ar-sub" : undefined}>
      <JsonLd
        graph={[
          breadcrumbs(
            [
              { name: ui.chapters, path: "/work/" },
              { name: c.name, path },
            ],
            lang,
          ),
          article({ headline: `${c.name}: ${c.headline}`, description: clip(c.intro, 200), path, about: c.name, lang }),
        ]}
      />
      <main>
        <PageHero
          index={c.index}
          eyebrow={t.chapter(c.index, c.period)}
          title={
            lang === "ar" ? (
              // The company name is English: keep its full stop on its right inside the Arabic page.
              <bdi dir="ltr">
                {c.name}
                <span className="text-gradient">.</span>
              </bdi>
            ) : (
              <>
                {c.name}
                <span className="text-gradient">.</span>
              </>
            )
          }
          lead={c.headline}
          crumbs={[{ name: ui.chapters, href: "/work/" }, { name: c.name }]}
          tone={i === 1 ? "violet" : i === 2 ? "cyan" : "mix"}
          meta={[
            { label: t.role, value: c.role },
            { label: t.when, value: c.period },
            { label: t.where, value: c.place },
            { label: t.product, value: c.product },
          ]}
          lang={lang}
        />

        <section className="px-5 py-[16vh] sm:px-10">
          <p data-rv className="eyebrow mb-10">
            ( 01 ) — {t.context}
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
                  {/* A plain inline bdi: the gradient text clip does not reach inline-block children. */}
                  <bdi dir="ltr">{n.value}</bdi>
                </p>
                <p className="mt-4 max-w-[28ch] text-sm leading-snug text-muted">{n.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-5 py-[16vh] sm:px-10">
          <SectionHead index="02" label={t.roleLabel} title={<Split t={t.owned} />} aside={`${c.role} · ${c.place}`} />
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
          <SectionHead index="03" label={t.storiesLabel} title={<Split t={t.happened} />} aside={t.aside(list.length, c.name)} />
          {list.map((s, k) => (
            <StoryRow key={s.id} story={s} n={k + 1} lang={lang} />
          ))}
        </section>

        <BigLine>
          <span className="text-gradient">{t.took}</span>
          {c.lesson}
        </BigLine>

        <NextChapter href={`/work/${next.slug}/`} eyebrow={t.next(next.index)} title={next.name} lang={lang} />
      </main>
      <Footer index="04" lang={lang} />
    </Motion>
  );
}
