import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/bakery/CustomCursor";
import { LoadingScreen, ScrollProgress, MouseSpotlight } from "@/components/bakery/Effects";
import { Navbar } from "@/components/bakery/Navbar";
import {
  Hero,
  Marquee,
  Story,
  Collection,
  FeaturedCake,
  Process,
  Testimonials,
  Gallery,
  Stats,
  InstagramSection,
  CTA,
  Footer,
} from "@/components/bakery/Sections";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[var(--warm-white)]">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <MouseSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Collection />
        <FeaturedCake />
        <Process />
        <Testimonials />
        <Gallery />
        <Stats />
        <InstagramSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
