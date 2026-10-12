import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us | Miu Miu Nail Design",
  description: "Contact Miu Miu Nail Design in Menlo Park to reserve your appointment.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <main><Contact /></main>;
}
