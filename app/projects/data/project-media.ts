/**
 * Single source of truth for every project-detail content image.
 *
 * Values can be either:
 * - a full https:// CDN URL, or
 * - an object key resolved against NEXT_PUBLIC_CDN_URL.
 *
 * Replace values here when final project media is uploaded; the project data
 * and presentation components should not contain image URLs directly.
 */
export const PROJECT_MEDIA = {
  vanamVillas: {
    hero: "/assets/projects/vanam-hero-background.webp",
    heroForeground: "/assets/projects/vanam-hero-foreground.webp",
    intro: "/assets/projects/vanam-hero-continuation.webp",
    location: "/assets/storysection/story-hero.webp",
    locationDecorative:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/leaf.webp",
    siteComposition: "/assets/projects/vanam-masterplan.png",
    moodboardDesktop:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-moodboard-desktop.webp",
    moodboardMobile:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-moodboard-mobile.webp",
    architecture: "/assets/projects/vanam-site-showcase.png",
    floorPlan01Ground: "/assets/projects/villatype01-1.svg",
    floorPlan01First: "/assets/projects/villatype01-2.svg",
    floorPlan02Ground: "/assets/projects/vilatype02-1.svg",
    floorPlan02First: "/assets/projects/villatype02-2.svg",
    gallery: [
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery1.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery2.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery3.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery4.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery5.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery6.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-gallery7.webp",
    ],
    nextProject:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/next-project.webp",
  },
  nayanVilla: {
    hero: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-villa-bg.webp",
    heroForeground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-villas-foreground.webp",
    intro:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-continuous.webp",
    location:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-horizontal.webp",
    locationDecorative:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/leaf.webp",
    siteComposition:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-masterplan.webp",
    moodboardDesktop: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-moodboard-esktop.webp",
    moodboardMobile: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-moodboard-mobile.webp",
   
    architecture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-showcase.webp",
    floorPlan01Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-floorplan1.webp",
    floorPlan01First: "Product-Detail-Page/nayan-villa/floor-plan-01-first.svg",
    floorPlan02Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-floorplan2.webp",
    floorPlan02First: "Product-Detail-Page/nayan-villa/floor-plan-02-first.svg",
    gallery: [
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase1.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase2.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase3.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase4.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase5.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-imageshowcase6.webp",
    ],
    nextProject:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/nayan/nayan-next-project.webp",
  },
  zenVillas2: {
    hero: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-background.webp",
    heroForeground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-foreground.webp",
    intro:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-intro.webp",
    location:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-horizontal.webp",
    locationDecorative:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/leaf.webp",
    siteComposition:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-masterplan.webp",
    moodboardDesktop: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-moodboard-desktop.webp",
    moodboardMobile: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-moodboard-mobile.webp",
   
    architecture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-architecture.webp",
    floorPlan01Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-floorplan1.webp",
    floorPlan01First:
      "Product-Detail-Page/zen-villas-2/floor-plan-01-first.svg",
    floorPlan02Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-floorplan2.webp",
    floorPlan02First:
      "Product-Detail-Page/zen-villas-2/floor-plan-02-first.svg",
    floorPlan03:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-floorplan3.webp",
    gallery: [
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse1.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse2.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse3.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse4.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse5.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-imageshowcse6.webp",
    ],
    nextProject:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/zen-villa-2/zen-villa-nextproject.webp",
  },
  elSalvaVilla: {
    hero: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalvavilla-background.webp",
    heroForeground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-foreground.webp",
    intro:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-continuous.webp",
    location:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-horizontal.webp",
    locationDecorative:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/leaf.webp",
    siteComposition:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-masterplan.webp",
    moodboardDesktop: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-moodboard-desktop.webp",
    moodboardMobile: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-moodboard-mobile.webp",
    architecture:
      "/assets/projects/elsalva-architecture.jpg",
    floorPlan01Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-floorplan1.webp",
    floorPlan01First:
      "Product-Detail-Page/el-salva-villa/floor-plan-01-first.svg",
    floorPlan02Ground:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-floorplan2.webp",
    floorPlan02First:
      "Product-Detail-Page/el-salva-villa/floor-plan-02-first.svg",
    gallery: [
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-1.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-2.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-3.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-4.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-5.webp",
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/elsalva/elsalva-gallery-6.webp",
    ],
    nextProject:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/vanam/vanam-background.webp",
  },
  shared: {
    concreteTexture: "/assets/textures/concrete-background-textures-09-1.webp",
    nextProjectTexture: "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/next-project-texture.webp",
    orangeBlock: "/assets/blocks/orange-block.svg",
    pdpTexture:
      "https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/pdp-texture-3.webp",
    siteCompositionTexture:
      "/images/placeholders/site-composition-texture.webp",
  },
} as const;
