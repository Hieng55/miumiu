import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Us | Miu Miu Nail Design",
  description: "Learn about Miu Miu Nail Design and view our salon opening hours in Menlo Park.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <main><About /></main>;
}
