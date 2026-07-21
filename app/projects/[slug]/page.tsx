import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactSection } from "@/components/contact/contact-section";
import { ProjectHero } from "@/components/project-detail/project-hero";
import { ProjectFloorPlanSection } from "@/components/project-detail/project-floor-plan-section";
import { ProjectIntroSection } from "@/components/project-detail/project-intro-section";
import { ProjectLocationSection } from "@/components/project-detail/project-location-section";
import { ProjectSiteCompositionSection } from "@/components/project-detail/project-site-composition-section";
import { ProjectSiteShowcaseSection } from "@/components/project-detail/project-site-showcase-section";
import { ProjectSpecificationsSection } from "@/components/project-detail/project-specifications-section";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Benicio",
    };
  }

  return {
    title: `${project.title} | Benicio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#232323]">
      <ProjectHero
        description={project.description}
        heroImage={project.heroImage}
        title={project.title}
      />
      <ProjectIntroSection
        backgroundImage={project.introImage}
        intro={project.intro}
      />
      <ProjectLocationSection
        decorativeImage={project.locationSection.decorativeImage}
        description={project.locationSection.description}
        featureImage={project.locationSection.featureImage}
        location={project.locationSection.location}
      />
      <ProjectSiteCompositionSection
        compass={project.siteCompositionSection.compass}
        description={project.siteCompositionSection.description}
        heading={project.siteCompositionSection.heading}
        masterplanImage={project.siteCompositionSection.masterplanImage}
        specifications={project.siteCompositionSection.specifications}
      />
      <ProjectSiteShowcaseSection
        cta={project.siteShowcaseSection.cta}
        description={project.siteShowcaseSection.description}
        heading={project.siteShowcaseSection.heading}
        image={project.siteShowcaseSection.image}
      />
      <ProjectSpecificationsSection
        groups={project.specificationsSection.groups}
      />
      {project.floorPlanSections.map((floorPlanSection, floorPlanIndex) => (
        <ProjectFloorPlanSection
          description={floorPlanSection.description}
          footerLabel={floorPlanSection.footerLabel}
          key={floorPlanSection.villaLabel}
          leftDrawing={floorPlanSection.leftDrawing}
          mirrored={floorPlanIndex % 2 === 1}
          rightDrawing={floorPlanSection.rightDrawing}
          specifications={floorPlanSection.specifications}
          villaLabel={floorPlanSection.villaLabel}
        />
      ))}
      <ContactSection />
    </main>
  );
}
