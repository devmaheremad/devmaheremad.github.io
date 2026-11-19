import CaseStudyPage, { caseStudyMetadata } from "@/views/CaseStudyPage";
import { caseStudiesLong } from "@/content/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudiesLong.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  return caseStudyMetadata((await params).slug, "en");
}

export default async function Page({ params }: PageProps<"/case-studies/[slug]">) {
  return <CaseStudyPage slug={(await params).slug} lang="en" />;
}
