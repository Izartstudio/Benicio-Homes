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
  mediaCanvas: {
    aspectRatio: number;
    focalPosition?: {
      desktop?: number;
      mobile?: number;
      tablet?: number;
    };
    foregroundCanvasHeightRatio?: number;
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
  masterplanVariant?: "default" | "vanam-large";
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

export type ProjectEditorialVariantsData = {
  textures?: {
    gallery?: string;
    moodboard?: string;
    showcase?: string;
    siteComposition?: string;
  };
  siteComposition: {
    image: ProjectImage;
  };
  moodboard: {
    images: readonly [ProjectImage, ProjectImage, ProjectImage, ProjectImage];
    labels?: {
      footer: string;
      primary: string;
      vertical: string;
    };
  };
  showcase: {
    images: readonly [
      ProjectImage,
      ProjectImage,
      ProjectImage,
      ProjectImage,
      ProjectImage,
    ];
  };
  gallery: {
    items: readonly [
      { caption: string; image: ProjectImage },
      { caption: string; image: ProjectImage },
    ];
    watermark: string;
  };
};

type ProjectDetailBase = {
  contact: ProjectContactData;
  hero: ProjectHeroData;
  intro: ProjectIntroData;
  location: ProjectLocationData;
  metadata: {
    description: string;
    title: string;
  };
  slug: string;
};

export type ProjectDetailData = ProjectDetailBase &
  (
    | { editorialVariants: ProjectEditorialVariantsData }
    | {
        architectureImage: ProjectArchitectureImageData;
        editorialVariants?: undefined;
        floorPlans: readonly ProjectFloorPlanData[];
        floorPlanLayout: ProjectFloorPlanLayout;
        gallery: ProjectGalleryData;
        moodboard: ProjectMoodboardData;
        nextProject: ProjectNextProjectData;
        siteComposition: ProjectSiteCompositionData;
        specifications: ProjectSpecificationsData;
      }
  );
