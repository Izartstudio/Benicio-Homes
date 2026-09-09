import dynamic from "next/dynamic";
import type { ProjectDetailData } from "@/app/projects/data";
import { ArchitectureImageSection } from "@/app/projects/components/architecture-image-section";
import { ContactSection } from "@/app/projects/components/contact-section";
import { FloorPlanCollection } from "@/app/projects/components/floor-plan-section";
import { HeroSection } from "@/app/projects/components/hero-section";
import { LocationSection } from "@/app/projects/components/location-section";
import { MoodboardSection } from "@/app/projects/components/moodboard-section";
import { NextProjectSection } from "@/app/projects/components/next-project-section";
import { SiteCompositionSection } from "@/app/projects/components/site-composition-section";
import { SpecificationSection } from "@/app/projects/components/specification-section";
import { Footer } from "@/components/footer/footer";
import { EditorialVariantSections } from "@/app/projects/components/editorial-variant-sections";
import { BrochurePrompt } from "@/components/project-detail/brochure-prompt";
import { getBrochure } from "@/lib/brochures";

type ProductDetailPageProps = {
  project: ProjectDetailData;
};

const GallerySection = dynamic(() =>
  import("@/app/projects/components/gallery-section").then(
    (module) => module.GallerySection,
  ),
);

export function ProductDetailPage({ project }: ProductDetailPageProps) {
  const brochure = getBrochure(project.slug);
  const residenceSchema = {
    "@context": "https://schema.org", "@type": "Residence",
    "@id": `https://benicio.co.in/projects/${project.slug}#residence`,
    name: project.hero.title, description: project.metadata.description,
    url: `https://benicio.co.in/projects/${project.slug}`,
    address: { "@type": "PostalAddress", addressLocality: project.location.location, addressRegion: "Goa", addressCountry: "IN" },
    image: { "@type": "ImageObject", contentUrl: typeof project.hero.image.src === "string" ? new URL(project.hero.image.src, "https://benicio.co.in").href : undefined, caption: project.hero.image.alt },
  };

  return (
    <main className="bg-[#232323]" data-project-detail-page>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceSchema).replace(/</g, "\\u003c") }} />
      <HeroSection data={project.hero} intro={project.intro} />
      <LocationSection data={project.location} />
      {project.editorialVariants ? (
        <>
          <EditorialVariantSections data={project.editorialVariants} />
          {brochure ? (
            <BrochurePrompt
              copy={brochure.copy}
              pdfPath={"pdfPath" in brochure ? brochure.pdfPath : undefined}
              projectName={brochure.projectName}
              projectSlug={project.slug}
            />
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
          {brochure ? (
            <BrochurePrompt
              copy={brochure.copy}
              pdfPath={"pdfPath" in brochure ? brochure.pdfPath : undefined}
              projectName={brochure.projectName}
              projectSlug={project.slug}
            />
          ) : null}
          <NextProjectSection data={project.nextProject} />
        </>
      )}
      <ContactSection data={project.contact} />
      <Footer />
    </main>
  );
}
