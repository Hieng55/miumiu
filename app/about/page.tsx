import About from "@/components/About";
import Team from "@/components/Team";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "About Our Salon",
  description:
    "Meet Miu Miu Nail Design, explore our approach to personalized nail and beauty care, and find current salon hours in Menlo Park.",
  path: "/about/",
});

export default function AboutPage() {
  return <main id="main-content"><About headingLevel="h1" teamHref="#our-team" /><Team /></main>;
}
