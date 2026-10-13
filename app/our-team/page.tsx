import Team from "@/components/Team";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Our Team",
  description:
    "Meet the talented nail and beauty artists at Miu Miu Nail Design and find the specialist for your next visit in Menlo Park.",
  path: "/our-team/",
});

export default function OurTeamPage() {
  return (
    <main id="main-content">
      <Team headingLevel="h1" />
    </main>
  );
}
