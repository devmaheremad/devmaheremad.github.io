import WorkIndex, { workIndexMetadata } from "@/views/WorkIndex";

export const metadata = workIndexMetadata("en");

export default function Page() {
  return <WorkIndex lang="en" />;
}
