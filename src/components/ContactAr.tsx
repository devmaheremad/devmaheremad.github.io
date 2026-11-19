import LangLink from "@/components/LangLink";
import { Ltr } from "@/components/page/ui";
import { ar } from "@/content/ar";
import { profile } from "@/content/site";

// The Arabic contact footer, on the Arabic homepage and every Arabic page.
// No per-letter animation here: splitting Arabic text into letters breaks the joined script.
export default function ContactAr({ index = "07" }: { index?: string }) {
  return (
    <footer id="contact" lang="ar" dir="rtl" className="relative overflow-hidden px-5 pb-10 pt-[16vh] sm:px-10">
      <div className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[90vh] w-[90vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(76,195,255,.22),rgba(182,156,255,.12)_40%,transparent_70%)] blur-2xl" />
      <p data-rv className="eyebrow mb-8">
        ( <Ltr>{index}</Ltr> ) — تواصل
      </p>
      <h2 data-rv className="font-display text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[1.1]">
        لنجعله <span className="text-gradient">سريعًا.</span>
      </h2>
      <div className="relative mt-14 grid gap-10 md:grid-cols-2 md:items-end">
        <div data-rv>
          <p className="max-w-[44ch] text-lg leading-loose text-ink/80">
            {ar.role} · <Ltr>{profile.stackLine}</Ltr>. {ar.availability}.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} data-magnetic className="rounded-full bg-ink px-7 py-4 font-medium text-bg transition-colors hover:bg-cyan">
              <Ltr>{profile.email}</Ltr>
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
        </div>
        <ul data-rv dir="ltr" className="flex flex-wrap gap-x-8 gap-y-3 md:justify-start">
          {profile.links.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-display text-2xl font-bold hover:text-cyan">
                {l.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative mt-24 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © <Ltr>{new Date().getFullYear()}</Ltr> {ar.name} · <Ltr>{profile.name}</Ltr>
        </span>
        <LangLink className="eyebrow hover:text-ink">English version ↗</LangLink>
      </div>
    </footer>
  );
}
