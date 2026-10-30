
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolGrid from "@/components/ToolGrid";
import Features from "@/components/Features";
import WhyChoose from "@/components/WhyChoose";
import Pricing from "@/components/Pricing";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#050814]">
      <Navbar />

      <Hero />

      <section className="relative z-10">
        <ToolGrid />
      </section>

      <section
        id="features"
        className="relative z-10 mt-16 scroll-mt-24 sm:mt-20"
      >
        <Features />
      </section>

      <section
        id="why-choose"
        className="relative z-10 mt-16 scroll-mt-24 sm:mt-20"
      >
        <WhyChoose />
      </section>

      <section
        id="pricing"
        className="relative z-10 mt-16 scroll-mt-24 sm:mt-24"
      >
        <Pricing />
      </section>

      <section className="relative z-10 mt-12 sm:mt-16">
        <Stats />
      </section>

      <section className="relative z-10 mt-12 sm:mt-16">
        <Testimonials />
      </section>

      <section
        id="faq"
        className="relative z-10 mt-12 scroll-mt-24 sm:mt-16"
      >
        <FAQ />
      </section>

      <section className="relative z-10 mt-10">
        <Footer />
      </section>
    </main>
  );
}
