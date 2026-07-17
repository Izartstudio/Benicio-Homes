import { AboutSection } from "@/sections/home/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { ImageShowcaseSection } from "@/sections/home/image-showcase-section";
import { JournalSection } from "@/sections/home/journal-section";
import { LegacyGallerySection } from "@/sections/home/legacy-gallery-section";
import { LegacySection } from "@/sections/home/legacy-section";
import { RestorationShowcaseSection } from "@/sections/home/restoration-showcase-section";
import { StepsSection } from "@/sections/home/steps-section";
import { StorySection } from "@/sections/home/story-section";
import { TexturedHeroSection } from "@/sections/home/textured-hero-section";

export default function Home() {
  return (
    <main>
      <TexturedHeroSection />
      <StepsSection />
      <FeaturedProjectsSection />
      <StorySection />
      <AboutSection />
      <ImageShowcaseSection />
      <LegacySection />
      <LegacyGallerySection />
      <RestorationShowcaseSection />
      <JournalSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
