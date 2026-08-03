import type { ProjectGalleryData } from "@/app/projects/data";
import { ProjectGalleryEditorialSection } from "@/components/project-detail/project-gallery-editorial-section";

type GallerySectionProps = {
  data: ProjectGalleryData;
};

export function GallerySection({ data }: GallerySectionProps) {
  return (
    <ProjectGalleryEditorialSection
      items={data.items}
      watermark={data.watermark}
    />
  );
}
