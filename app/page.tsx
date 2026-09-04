import { AboutSection } from "@/sections/home/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { HomepageInteractionGuard } from "@/components/homepage-interaction-guard";
import { BlendScope } from "@/components/ui/blend-scope";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { ImageShowcaseSection } from "@/sections/home/image-showcase-section";
import { JournalSection } from "@/sections/home/journal-section";
import { LegacySection } from "@/sections/home/legacy-section";
import { RestorationShowcaseSection } from "@/sections/home/restoration-showcase-section";
import { StepsSection } from "@/sections/home/steps-section";
import { StorySection } from "@/sections/home/story-section";
import { TexturedHeroSection } from "@/sections/home/textured-hero-section";
import { getJournalArticles } from "@/sanity/lib/journal";

export default async function Home() {
  const journalArticles = await getJournalArticles();

  return (
    <HomepageInteractionGuard>
      <TexturedHeroSection />
      <StepsSection />
      <FeaturedProjectsSection />
      <BlendScope>
        <StorySection />
        <AboutSection />
      </BlendScope>
      <ImageShowcaseSection />
      <LegacySection />
      <RestorationShowcaseSection backgroundPosition="calc(100% + 28.5vw) center" />
      <JournalSection articles={journalArticles} />
      <ContactSection />
      <Footer />
    </HomepageInteractionGuard>
  );
}
