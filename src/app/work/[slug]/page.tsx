import CompanyPage, { companyMetadata } from "@/views/CompanyPage";
import { companies } from "@/content/stories";

export const dynamicParams = false;

export function generateStaticParams() {
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  return companyMetadata((await params).slug, "en");
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  return <CompanyPage slug={(await params).slug} lang="en" />;
}
