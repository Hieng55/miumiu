import Contact from "@/components/Contact";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Contact & Salon Hours",
  description:
    "Call Miu Miu Nail Design, check our opening hours, or plan a visit to 1150 El Camino Real in Menlo Park, California.",
  path: "/contact/",
});

export default function ContactPage() {
  return <main id="main-content"><Contact headingLevel="h1" /></main>;
}
