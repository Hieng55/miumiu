import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery | Miu Miu Nail Design",
  description: "View recent nail designs and beauty work from Miu Miu Nail Design.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return <main><Gallery /></main>;
}
