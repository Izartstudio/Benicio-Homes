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

const brochureCopyBySlug: Record<string, string> = {
  "el-salva-villa":
    "Step into El Salva, where heritage and nature come together.",
  "nayan-villa":
    "Every space tells a story. Discover the design philosophy of Nayan Villas.",
  "vanam-villas":
    "Every aspect serves a reason. Discover the full concept behind Vanam Villas.",
  "zen-villas-2":
    "Every space reflects a purpose. Discover the vision behind Zen Villa II.",
};

export function ProductDetailPage({ project }: ProductDetailPageProps) {
  const brochureCopy = brochureCopyBySlug[project.slug];

  return (
    <main className="bg-[#232323]" data-project-detail-page>
      <HeroSection data={project.hero} intro={project.intro} />
      <LocationSection data={project.location} />
      {project.editorialVariants ? (
        <>
          <EditorialVariantSections data={project.editorialVariants} />
          {brochureCopy ? (
            <BrochurePrompt copy={brochureCopy} projectSlug={project.slug} />
          ) : null}
        </>
      ) : (
        <>
          <SiteCompositionSection data={project.siteComposition} />
          <MoodboardSection data={project.moodboard} />
          <ArchitectureImageSection data={project.architectureImage} />
          <SpecificationSection data={project.specifications} />
          <FloorPlanCollection layout={project.floorPlanLayout} plans={project.floorPlans} />
          <GallerySection data={project.gallery} />
          {brochureCopy ? (
            <BrochurePrompt copy={brochureCopy} projectSlug={project.slug} />
          ) : null}
          <NextProjectSection data={project.nextProject} />
        </>
      )}
      <ContactSection data={project.contact} />
      <Footer />
    </main>
  );
}
