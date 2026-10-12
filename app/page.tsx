import type { Metadata } from "next";
import About from "@/components/About";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import { homeStructuredData, searchRobots } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  robots: searchRobots,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <Banner />
        <About />
        <Services />
        <Gallery />
        <Contact />
      </main>
    </>
  );
}
