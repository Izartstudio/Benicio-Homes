import { elSalvaVillaProject } from "@/app/projects/data/el-salva";
import { nayanVillaProject } from "@/app/projects/data/majodra";
import type { ProjectDetailData } from "@/app/projects/data/types";
import { vanamProject } from "@/app/projects/data/vanam";
import { zenVillas2Project } from "@/app/projects/data/zen";

export const projects = {
  [vanamProject.slug]: vanamProject,
  [nayanVillaProject.slug]: nayanVillaProject,
  [zenVillas2Project.slug]: zenVillas2Project,
  [elSalvaVillaProject.slug]: elSalvaVillaProject,
} as const satisfies Record<string, ProjectDetailData>;

export const projectList: readonly ProjectDetailData[] =
  Object.values(projects);

export function getProjectBySlug(
  slug: string,
): ProjectDetailData | undefined {
  return (projects as Record<string, ProjectDetailData>)[slug];
}

export type {
  ProjectArchitectureImageData,
  ProjectContactData,
  ProjectDetailData,
  ProjectFloorPlanData,
  ProjectFloorPlanLayout,
  ProjectGalleryData,
  ProjectHeroData,
  ProjectImage,
  ProjectIntroData,
  ProjectLocationData,
  ProjectMoodboardData,
  ProjectNextProjectData,
  ProjectSiteCompositionData,
  ProjectSpecificationsData,
} from "@/app/projects/data/types";
