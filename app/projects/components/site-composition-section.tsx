import type { ProjectSiteCompositionData } from "@/app/projects/data";
import { ProjectSiteCompositionSection } from "@/components/project-detail/project-site-composition-section";

type SiteCompositionSectionProps = {
  data: ProjectSiteCompositionData;
};

export function SiteCompositionSection({
  data,
}: SiteCompositionSectionProps) {
  return (
    <ProjectSiteCompositionSection
      compass={data.compass}
      description={data.description}
      guideLineVariant={data.guideLineVariant}
      heading={data.heading}
      masterplanImage={data.masterplanImage}
      masterplanVariant={data.masterplanVariant}
      specifications={data.specifications}
      textureSrc={data.textureSrc}
    />
  );
}
