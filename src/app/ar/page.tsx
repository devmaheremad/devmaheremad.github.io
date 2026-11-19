import type { Metadata } from "next";
import Link from "next/link";
import ContactAr from "@/components/ContactAr";
import Motion from "@/components/page/Motion";
import Liquid from "@/components/page/Liquid";
import { Chip, Ltr } from "@/components/page/ui";
import { ar } from "@/content/ar";
import { profile, stack } from "@/content/site";
import { JsonLd, OG_AR, PERSON_ID, SITE } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: ar.title },
  description: ar.description,
  alternates: { canonical: "/ar/", languages: { en: "/", ar: "/ar/", "x-default": "/" } },
  openGraph: {
    title: ar.title,
    description: ar.description,
    url: "/ar/",
    type: "profile",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    siteName: `${profile.name} · ${ar.name}`,
    images: [OG_AR],
  },
  twitter: { card: "summary_large_image", title: ar.title, description: ar.description, creator: "@devmaheremad", images: [OG_AR] },
};

function Head({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="mb-14">
      <p data-rv className="eyebrow mb-5">
        ( <Ltr>{index}</Ltr> ) — {label}
      </p>
      <h2 data-rv className="font-display text-[clamp(2.2rem,5.6vw,5.4rem)] font-extrabold leading-[1.15]">
        {title}
      </h2>
    </div>
  );
}

export default function ArabicHome() {
  return (
    <Motion>
      <meta httpEquiv="content-language" content="ar" />
      <JsonLd
        graph={[
          {
            "@type": "ProfilePage",
            "@id": `${SITE}/ar/#profilepage`,
            url: `${SITE}/ar/`,
            name: ar.title,
            description: ar.description,
            inLanguage: "ar",
            mainEntity: { "@id": PERSON_ID },
            isPartOf: { "@id": `${SITE}/#website` },
          },
        ]}
      />
      <main lang="ar" dir="rtl">
        {/* ---- hero ---- */}
        <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-10 pt-28 sm:px-10">
          <Liquid tone="mix" />
          <div className="relative flex items-start justify-between gap-6">
            <p data-hero-fade className="eyebrow">
              {ar.role} — <Ltr>Senior Frontend Engineer</Ltr>
            </p>
            <Link href="/" hrefLang="en" lang="en" data-transition="English" className="eyebrow shrink-0 hover:text-ink">
              Read in English ↗
            </Link>
          </div>
          <div className="relative">
            <h1 className="font-display text-[clamp(3.4rem,12vw,12rem)] font-extrabold leading-[1.05]">
              <span data-hero-fade className="block">
                {ar.name}
                <span className="text-cyan">.</span>
              </span>
              <span data-hero-fade lang="en" dir="ltr" className="mt-6 block text-right text-[clamp(1.1rem,2.6vw,2.2rem)] font-bold leading-tight">
                <span className="text-gradient">
                {profile.name} · devmaheremad</span>
              </span>
            </h1>
            <p data-hero-fade className="mt-8 max-w-[52ch] text-lg leading-loose text-ink/80 sm:text-xl">
              {ar.intro}
            </p>
            <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
              <a href={`mailto:${profile.email}`} data-magnetic className="rounded-full bg-ink px-7 py-4 font-medium text-bg transition-colors hover:bg-cyan">
                راسلني: <Ltr>{profile.email}</Ltr>
              </a>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                data-magnetic
                className="rounded-full border border-line px-7 py-4 font-medium transition-colors hover:border-ink"
              >
                السيرة الذاتية ↗
              </a>
            </div>
            <p data-hero-fade className="eyebrow mt-10 flex items-center gap-3 border-t border-line pt-6">
              <span className="relative inline-flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {ar.availability}
            </p>
          </div>
        </section>

        {/* ---- about ---- */}
        <section className="grid gap-12 px-5 py-[16vh] sm:px-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <p data-rv className="eyebrow">
              ( <Ltr>01</Ltr> ) — من أنا
            </p>
          </div>
          <div className="space-y-6 md:col-span-8">
            {ar.about.map((p) => (
              <p key={p} data-rv className="text-xl leading-loose text-ink/85 sm:text-2xl">
                {p}
              </p>
            ))}
            <p data-rv className="font-display text-[clamp(1.5rem,3vw,2.6rem)] font-bold leading-[1.5]">
              {ar.manifesto}
            </p>
          </div>
        </section>

        {/* ---- numbers ---- */}
        <section className="px-5 pb-[14vh] sm:px-10">
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-5">
            {ar.stats.map((s) => (
              <li key={s.label} data-rv className="bg-bg p-6 sm:p-8">
                <p dir="ltr" className="text-right font-display text-[clamp(2.2rem,4vw,3.6rem)] font-extrabold leading-none text-gradient">
                  {s.value}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">{s.label}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ---- experience ---- */}
        <section className="px-5 pb-[14vh] sm:px-10">
          <Head index="02" label="الخبرة" title="أين عملت، وماذا أنجزت." />
          <ol className="border-t border-line">
            {ar.experience.map((e) => (
              <li key={e.company} data-rv className="grid gap-6 border-b border-line py-10 md:grid-cols-12">
                <div className="md:col-span-4">
                  <h3 lang="en" dir="ltr" className="text-right font-display text-[clamp(1.6rem,2.6vw,2.4rem)] font-extrabold leading-tight">
                    {e.company}
                  </h3>
                  <p className="mt-3 text-ink/85">{e.role}</p>
                  <p className="eyebrow mt-2">
                    {e.period} · {e.place}
                  </p>
                </div>
                <div className="md:col-span-8">
                  <ul className="space-y-3">
                    {e.points.map((pt) => (
                      <li key={pt} className="flex gap-3 text-lg leading-loose text-ink/80">
                        <span className="mt-1 text-cyan" aria-hidden>
                          ←
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  {e.slug && (
                    <Link href={`/ar/work/${e.slug}/`} data-transition={e.company} className="eyebrow mt-6 inline-block hover:text-ink">
                      القصة كاملة ←
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- case studies ---- */}
        <section className="px-5 pb-[14vh] sm:px-10">
          <Head index="03" label="دراسات حالة" title="مشاكل حقيقية، وكيف حللتها." />
          <div className="grid gap-6 lg:grid-cols-3">
            {ar.caseStudies.map((cs, k) => (
              <Link
                key={cs.slug}
                href={`/ar/case-studies/${cs.slug}/`}
                data-transition="دراسة حالة"
                data-spot
                data-rv
                className="spot group flex flex-col justify-between rounded-3xl border border-line bg-bg-2/60 p-8 sm:p-10"
              >
                <div>
                  <span className="text-outline font-display text-[clamp(4rem,7vw,6rem)] font-extrabold leading-none">
                    <Ltr>{String(k + 1).padStart(2, "0")}</Ltr>
                  </span>
                  <h3 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-bold leading-[1.4]">{cs.title}</h3>
                  <p className="mt-4 text-lg leading-loose text-cyan/90">{cs.outcome}</p>
                  <p className="mt-4 leading-loose text-ink/75">{cs.body}</p>
                </div>
                <span className="eyebrow mt-8 transition-colors group-hover:text-ink">دراسة الحالة كاملة ←</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ---- strengths ---- */}
        <section className="px-5 pb-[14vh] sm:px-10">
          <Head index="04" label="نقاط القوة" title="ما أجيده، مع الأدلة." />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {ar.strengths.map((s) => (
              <div key={s.label} data-rv className="bg-bg p-8 sm:p-10">
                <p className="eyebrow mb-4">{s.label}</p>
                <h3 className="font-display text-[clamp(1.4rem,2.2vw,1.9rem)] font-bold leading-[1.45]">{s.claim}</h3>
                <p className="mt-4 leading-loose text-ink/75">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- skills, education, languages ---- */}
        <section className="grid gap-12 px-5 pb-[14vh] sm:px-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p data-rv className="eyebrow mb-6">
              ( <Ltr>05</Ltr> ) — الأدوات والتقنيات
            </p>
            <div data-rv dir="ltr" className="flex flex-wrap justify-end gap-2">
              {stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
          <div className="space-y-10 md:col-span-5">
            <div data-rv>
              <p className="eyebrow mb-3">التعليم</p>
              <p className="text-xl">
                {ar.education.degree} — {ar.education.school}
              </p>
              <p className="eyebrow mt-2">{ar.education.period}</p>
            </div>
            <div data-rv>
              <p className="eyebrow mb-3">اللغات</p>
              <p className="text-lg leading-loose text-ink/85">{ar.languages}</p>
            </div>
          </div>
        </section>

        {/* ---- deeper pages ---- */}
        <section className="px-5 pb-[10vh] sm:px-10">
          <p data-rv className="eyebrow mb-6">
            ( <Ltr>06</Ltr> ) — للتعمّق أكثر
          </p>
          <ul className="border-t border-line">
            {ar.pages.map((p) => (
              <li key={p.href} data-rv className="border-b border-line">
                <Link href={p.href} data-transition={p.label} className="sweep group flex items-baseline justify-between gap-6 px-2 py-7 sm:px-4">
                  <span className="font-display text-[clamp(1.4rem,3vw,2.6rem)] font-bold">{p.label}</span>
                  <span className="text-2xl transition-transform duration-500 group-hover:rotate-45">←</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* ---- contact ---- */}
      <ContactAr index="07" />
    </Motion>
  );
}
