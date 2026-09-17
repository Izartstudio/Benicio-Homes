import { pageMetadata } from "@/lib/seo";
import { AboutSection } from "@/sections/home/about-section";
import { ContactSection } from "@/components/contact/contact-section";
import { Footer } from "@/components/footer/footer";
import { HomepageInteractionGuard } from "@/components/homepage-interaction-guard";
import { BlendScope } from "@/components/ui/blend-scope";
import { FeaturedProjectsSection } from "@/sections/home/featured-projects-section";
import { ImageShowcaseSection } from "@/sections/home/image-showcase-section";
import { JournalSection } from "@/sections/home/journal-section";
import { LegacySection } from "@/sections/home/legacy-section";
import { BuiltForPlaceSection } from "@/sections/home/built-for-place-section";
import { RestorationShowcaseSection } from "@/sections/home/restoration-showcase-section";
import { StepsSection } from "@/sections/home/steps-section";
import { StorySection } from "@/sections/home/story-section";
import { TexturedHeroSection } from "@/sections/home/textured-hero-section";
import { getJournalArticles } from "@/sanity/lib/journal";

export const metadata = pageMetadata("/", "", "Design-led tropical homes, luxury villas and heritage restorations across Goa by Benicio Homes.");

export default async function Home() {
  const journalArticles = await getJournalArticles();

  // This order is the homepage's scroll narrative. Coordinate reordering with
  // the sticky sections and ScrollTrigger refresh behavior in LenisProvider.
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
      <BuiltForPlaceSection />
      <LegacySection />
      <RestorationShowcaseSection backgroundPosition="calc(100% + 28.5vw) center" />
      <JournalSection articles={journalArticles} />
      <ContactSection />
      <Footer />
    </HomepageInteractionGuard>
  );
}
