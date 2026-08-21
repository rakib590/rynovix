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
    <main className="bg-[#050814] min-h-screen">
  <Navbar />
  <Hero />
  <div className="-mt-30">
    <ToolGrid />
    <div className="-mt-30"></div>
    <Features />
    <div className="-mt-30"></div>
    <WhyChoose />
    <div className="-mt-30"></div>
    <Pricing />
    <div className="-mt-10"></div>
    <Stats />
    <div className="-mt-20"></div>
    <Testimonials />
    <div className="-mt-20"></div>
    <FAQ />
    <div className="-mt-10"></div>
    <Footer />
  </div>
</main>
  );
}