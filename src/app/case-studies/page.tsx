import CaseStudiesIndex, { caseStudiesMetadata } from "@/views/CaseStudiesIndex";

export const metadata = caseStudiesMetadata("en");

export default function Page() {
  return <CaseStudiesIndex lang="en" />;
}
