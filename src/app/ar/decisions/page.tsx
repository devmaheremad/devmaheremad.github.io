// The Arabic twin of the English page: the same view, in Arabic.
import DecisionsPage, { decisionsMetadata } from "@/views/DecisionsPage";

export const metadata = decisionsMetadata("ar");

export default function Page() {
  return <DecisionsPage lang="ar" />;
}
