import type { ProjectDetailData } from "@/app/projects/data";
import { ArchitectureImageSection } from "@/app/projects/components/architecture-image-section";
import { ContactSection } from "@/app/projects/components/contact-section";
import { FloorPlanCollection } from "@/app/projects/components/floor-plan-section";
import { GallerySection } from "@/app/projects/components/gallery-section";
import { HeroSection } from "@/app/projects/components/hero-section";
import { LocationSection } from "@/app/projects/components/location-section";
import { MoodboardSection } from "@/app/projects/components/moodboard-section";
import { NextProjectSection } from "@/app/projects/components/next-project-section";
import { SiteCompositionSection } from "@/app/projects/components/site-composition-section";
import { SpecificationSection } from "@/app/projects/components/specification-section";
import { Footer } from "@/components/footer/footer";
import { EditorialVariantSections } from "@/app/projects/components/editorial-variant-sections";
import { BrochurePrompt } from "@/components/project-detail/brochure-prompt";

type ProductDetailPageProps = {
  project: ProjectDetailData;
};

export function ProductDetailPage({ project }: ProductDetailPageProps) {
  return (
    <main className="bg-[#232323]">
      <HeroSection data={project.hero} intro={project.intro} />
      <LocationSection data={project.location} />
      {project.editorialVariants ? (
        <>
          <EditorialVariantSections data={project.editorialVariants} />
          <BrochurePrompt />
        </>
      ) : (
        <>
          <SiteCompositionSection data={project.siteComposition} />
          <MoodboardSection data={project.moodboard} />
          <ArchitectureImageSection data={project.architectureImage} />
          <SpecificationSection data={project.specifications} />
          <FloorPlanCollection layout={project.floorPlanLayout} plans={project.floorPlans} />
          <GallerySection data={project.gallery} />
          <BrochurePrompt />
          <NextProjectSection data={project.nextProject} />
        </>
      )}
      <ContactSection data={project.contact} />
      <Footer />
    </main>
  );
}
