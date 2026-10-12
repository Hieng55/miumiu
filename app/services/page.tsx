import type { Metadata } from "next";
import ServicesMenu from "@/components/ServicesMenu";

export const metadata: Metadata = {
  title: "Services | Miu Miu Nail Design",
  description: "Explore nail and beauty service categories at Miu Miu Nail Design in Menlo Park.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesMenu />;
}
