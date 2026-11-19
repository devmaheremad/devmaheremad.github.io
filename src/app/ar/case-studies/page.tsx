// The Arabic twin of the English page: the same view, in Arabic.
import CaseStudiesIndex, { caseStudiesMetadata } from "@/views/CaseStudiesIndex";

export const metadata = caseStudiesMetadata("ar");

export default function Page() {
  return <CaseStudiesIndex lang="ar" />;
}
