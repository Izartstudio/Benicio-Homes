import type { ImageProps } from "next/image";

export type ProjectImage = {
  alt: string;
  src: ImageProps["src"];
};

export type ProjectHeroData = {
  description: string;
  foregroundImage?: ProjectImage;
  image: ProjectImage;
  layout?: "default" | "el-salva" | "nayan" | "zen";
  mediaScale?: {
    continuation?: number;
    desktop?: number;
    mobile?: number;
    tablet?: number;
  };
  objectPosition?: {
    desktop?: string;
    mobile?: string;
    tablet?: string;
  };
  title: string;
};

export type ProjectIntroData = {
  backgroundImage: ProjectImage;
  intro: string;
};

export type ProjectLocationData = {
  decorativeImage: ProjectImage;
  description: readonly string[];
  featureImage: ProjectImage;
  location: string;
};

export type ProjectSiteCompositionData = {
  compass: string;
  description: string;
  guideLineVariant?: "default" | "el-salva" | "zen";
  heading: string;
  masterplanImage: ProjectImage;
  specifications: readonly {
    items: readonly {
      label: string;
      value: string;
    }[];
    title: string;
  }[];
  textureSrc: string;
};

export type ProjectMoodboardData = {
  description: string;
  desktopImage: ProjectImage;
  mobileImage: ProjectImage;
};

export type ProjectArchitectureImageData = {
  cta: {
    href: string;
    label: string;
  };
  description: string;
  heading: string;
  image: ProjectImage;
};

export type ProjectSpecificationsData = {
  groups: readonly {
    items: readonly string[];
    title: string;
  }[];
};

export type ProjectFloorPlanData = {
  description: string;
  footerLabel: string;
  leftDrawing: ProjectImage;
  mirrored?: boolean;
  rightDrawing: ProjectImage;
  specifications: readonly {
    label: string;
    value: string;
  }[];
  villaLabel: string;
};

export type ProjectFloorPlanLayout =
  "vanam-paired" | "stacked-two" | "stacked-three";

export type ProjectGalleryData = {
  items: readonly {
    caption: string;
    height: number;
    image: ProjectImage;
    position: {
      captionAlign?: "left" | "right";
      left: number;
      top: number;
    };
    width: number;
  }[];
  watermark?: string;
};

export type ProjectNextProjectData = {
  ctaHref: string;
  ctaLabel: string;
  description: string;
  image: ProjectImage;
  title: string;
};

export type ProjectContactData = {
  copy: string;
  heading: string;
};

export type ProjectDetailData = {
  architectureImage: ProjectArchitectureImageData;
  contact: ProjectContactData;
  floorPlans: readonly ProjectFloorPlanData[];
  floorPlanLayout: ProjectFloorPlanLayout;
  gallery: ProjectGalleryData;
  hero: ProjectHeroData;
  intro: ProjectIntroData;
  location: ProjectLocationData;
  metadata: {
    description: string;
    title: string;
  };
  moodboard: ProjectMoodboardData;
  nextProject: ProjectNextProjectData;
  siteComposition: ProjectSiteCompositionData;
  slug: string;
  specifications: ProjectSpecificationsData;
};
