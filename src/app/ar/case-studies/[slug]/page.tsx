// The Arabic twin of the English page: the same view, in Arabic.
import CaseStudyPage, { caseStudyMetadata } from "@/views/CaseStudyPage";
import { caseStudiesLong } from "@/content/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudiesLong.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ar/case-studies/[slug]">) {
  return caseStudyMetadata((await params).slug, "ar");
}

export default async function Page({ params }: PageProps<"/ar/case-studies/[slug]">) {
  return <CaseStudyPage slug={(await params).slug} lang="ar" />;
}
