import DecisionsPage, { decisionsMetadata } from "@/views/DecisionsPage";

export const metadata = decisionsMetadata("en");

export default function Page() {
  return <DecisionsPage lang="en" />;
}
