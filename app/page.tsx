import About from "@/components/About";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main id="home">
      <Banner />
      <About />
      <Services />
      <Gallery />
      <Contact />
    </main>
  );
}
