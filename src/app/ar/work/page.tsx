// The Arabic twin of the English page: the same view, in Arabic.
import WorkIndex, { workIndexMetadata } from "@/views/WorkIndex";

export const metadata = workIndexMetadata("ar");

export default function Page() {
  return <WorkIndex lang="ar" />;
}
