import type { ProjectDetailData } from "@/app/projects/data/types";
import { SIX_IMAGE_GALLERY_LAYOUT } from "@/app/projects/data/gallery-layouts";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.zenVillas2;

export const zenVillas2Project = {
  slug: "zen-villas-2",
  metadata: {
    title: "Zen Villas-II | Benicio",
    description:
      "Nestled in the tranquil heart of Assagaon, Goa, crafted for privacy, comfort, and refined living, where contemporary luxury meets nature.",
  },
  hero: {
    layout: "zen",
    title: "Zen Villa-II",
    description:
      "Nestled in the tranquil heart of Assagaon, Goa, crafted for privacy, comfort, and refined living, where contemporary luxury meets nature.",
    image: {
      src: media.hero,
      alt: "Zen Villas-2 hero",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
  },
  intro: {
    intro:
      "Where bespoke architecture, lush surroundings, and effortless luxury become one.",
    backgroundImage: {
      src: media.intro,
      alt: "Zen Villas-2 introduction",
    },
  },
  location: {
    location: "Assagaon, Goa",
    featureImage: {
      src: media.location,
      alt: "Landscape surrounding Zen Villas-2",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Tropical foliage at Zen Villas-2",
    },
    description: [
      "Surrounded by peaceful landscapes and crafted with elegant design, this exclusive residence offers an elevated lifestyle where every space inspires calm and sophistication.",
      "Every detail is crafted for exceptional comfort and complete privacy.",
    ],
  },
  siteComposition: {
    guideLineVariant: "zen",
    heading: "Site Composition",
    description:
      "Zen Villa II offers a secluded retreat while keeping the very best of North Goa close at hand. From pristine beaches and fine dining to boutique cafés, beach clubs, and vibrant cultural experiences, every destination is just moments away.",
    masterplanImage: {
      src: media.siteComposition,
      alt: "Masterplan of Zen Villas-2",
    },
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "PROPERTY DETAILS",
        items: [
          { label: "Built Up Area", value: "339 sq.m." },
          { label: "Carpet Area", value: "234 sq.m." },
          { label: "Saleable Area", value: "351 sq.m." },
        ],
      },
    ],
  },
  moodboard: {
    description:
      "The story of Zen Villa II began with the landscape. Inspired by Goa's lush surroundings and tropical climate, every space was carefully planned to welcome natural light, enhance privacy, and create a seamless connection between the villa and its environment. The result is a timeless residence where architecture and nature exist in perfect balance.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "Zen Villas-2 architectural moodboard",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "Zen Villas-2 architectural moodboard",
    },
  },
  architectureImage: {
    heading: "Explore Zen Villas-2",
    description:
      "Every space reflects a purpose. Discover the vision behind Zen Villa II.",
    cta: {
      label: "Download Brochure",
      href: "/#contact",
    },
    image: {
      src: media.architecture,
      alt: "Architectural view of Zen Villas-2",
    },
  },
  specifications: {
    groups: [
      {
        title: "Structure",
        items: [
          "Structural specification to be confirmed",
          "External wall specification to be confirmed",
          "Terrace specification to be confirmed",
          "Foundation specification to be confirmed",
        ],
      },
      {
        title: "Materials",
        items: [
          "Flooring specification to be confirmed",
          "Countertop specification to be confirmed",
          "Window specification to be confirmed",
          "Ironmongery specification to be confirmed",
        ],
      },
      {
        title: "Landscape",
        items: [
          "Pool specification to be confirmed",
          "Garden specification to be confirmed",
          "Walkway specification to be confirmed",
          "Outdoor pavilion specification to be confirmed",
        ],
      },
      {
        title: "Living",
        items: [
          "Kitchen specification to be confirmed",
          "Lighting specification to be confirmed",
          "Bathroom specification to be confirmed",
          "Natural light strategy to be confirmed",
        ],
      },
      {
        title: "Technology",
        items: [
          "Security specification to be confirmed",
          "Entry system specification to be confirmed",
          "Power backup specification to be confirmed",
          "Connectivity specification to be confirmed",
        ],
      },
    ],
  },
  floorPlanLayout: "stacked-three",
  floorPlans: [
    {
      description:
        "Thoughtfully designed as the villa's central living space, the Ground Floor connects contemporary interiors with tranquil outdoor areas, delivering comfort, openness, and timeless appeal.",
      villaLabel: "Ground Floor",
      footerLabel: "Zen Villa II",
      leftDrawing: {
        src: media.floorPlan01Ground,
        alt: "Ground floor plan for Zen Villas-2 Villa 01",
      },
      rightDrawing: {
        src: media.floorPlan01First,
        alt: "First floor plan for Zen Villas-2 Villa 01",
      },
      specifications: [
        { label: "Bedrooms", value: "1" },
        { label: "Bathrooms", value: "3" },
        { label: "Pool", value: "Private Pool" },
        { label: "Car Parking", value: "1" },
        { label: "Living Room", value: "1" },
        { label: "Kitchen/Dining", value: "1" },
        { label: "Garden", value: "2" },
      ],
    },
    {
      description:
        "The First Floor brings together spacious bedrooms, tranquil private spaces, and open balconies that embrace the surrounding landscape. Thoughtful planning ensures every room feels bright, peaceful, and effortlessly connected to nature.",
      villaLabel: "First Floor",
      footerLabel: "Zen Villa II",
      mirrored: true,
      leftDrawing: {
        src: media.floorPlan02Ground,
        alt: "Ground floor plan for Zen Villas-2 Villa 02",
      },
      rightDrawing: {
        src: media.floorPlan02First,
        alt: "First floor plan for Zen Villas-2 Villa 02",
      },
      specifications: [
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "2" },
        { label: "Walk In Wardrobe", value: "2" },
        { label: "Passages", value: "2" },
        { label: "Balconies", value: "1" },
        { label: "Staircase", value: "2" },
      ],
    },
    {
      description:
        "The Terrace extends the villa into the open sky, offering peaceful outdoor spaces designed for relaxation, quiet moments, and uninterrupted views. Every corner is thoughtfully crafted to embrace fresh air, natural light, and the surrounding landscape.",
      villaLabel: "Terrace Floor Plan",
      footerLabel: "Zen Villa II",
      mirrored: true,
      leftDrawing: {
        src: media.floorPlan03,
        alt: "Terrace floor plan for Zen Villa II",
      },
      rightDrawing: {
        src: media.floorPlan03,
        alt: "Terrace floor plan for Zen Villa II",
      },
      specifications: [{ label: "Staircase", value: "1" }],
    },
  ],
  gallery: {
    watermark: "Zen",
    items: [
      {
        caption: "Quiet By Design.",
        image: {
          src: media.gallery[0],
          alt: "Zen Villas-2 gallery image 1",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[0],
      },
      {
        caption: "Open To Nature.",
        image: {
          src: media.gallery[1],
          alt: "Zen Villas-2 gallery image 2",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[1],
      },
      {
        caption: "Light In Balance.",
        image: {
          src: media.gallery[2],
          alt: "Zen Villas-2 gallery image 3",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[2],
      },
      {
        caption: "Space To Breathe.",
        image: {
          src: media.gallery[3],
          alt: "Zen Villas-2 gallery image 4",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[3],
      },
      {
        caption: "Rooted In Calm.",
        image: {
          src: media.gallery[4],
          alt: "Zen Villas-2 gallery image 5",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[4],
      },
      {
        caption: "Crafted With Restraint.",
        image: {
          src: media.gallery[5],
          alt: "Zen Villas-2 gallery image 6",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[5],
      },
    ],
  },
  nextProject: {
    title: "Villa El Salva",
    description:
      "Each residence is shaped by its surroundings, blending Goa's natural beauty with enduring architectural design.",
    image: {
      src: media.nextProject,
      alt: "El Salva Villa project preview",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/el-salva-villa",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
