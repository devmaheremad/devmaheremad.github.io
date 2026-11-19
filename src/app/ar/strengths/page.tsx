// The Arabic twin of the English page: the same view, in Arabic.
import StrengthsPage, { strengthsMetadata } from "@/views/StrengthsPage";

export const metadata = strengthsMetadata("ar");

export default function Page() {
  return <StrengthsPage lang="ar" />;
}
