import Gallery from "@/components/Gallery";
import { createPageMetadata } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Nail Design Gallery",
  description:
    "View a curated gallery of manicures, finishes, and nail designs created at Miu Miu Nail Design in Menlo Park.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return <main id="main-content"><Gallery headingLevel="h1" /></main>;
}
