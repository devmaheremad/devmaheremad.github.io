// The Arabic twin of the English page: the same view, in Arabic.
import CompanyPage, { companyMetadata } from "@/views/CompanyPage";
import { companies } from "@/content/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ar/work/[slug]">) {
  return companyMetadata((await params).slug, "ar");
}

export default async function Page({ params }: PageProps<"/ar/work/[slug]">) {
  return <CompanyPage slug={(await params).slug} lang="ar" />;
}
