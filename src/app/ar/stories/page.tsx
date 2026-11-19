// The Arabic twin of the English page: the same view, in Arabic.
import StoriesPage, { storiesMetadata } from "@/views/StoriesPage";

export const metadata = storiesMetadata("ar");

export default function Page() {
  return <StoriesPage lang="ar" />;
}
