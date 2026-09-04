import type { ProjectDetailData } from "@/app/projects/data/types";
import { SIX_IMAGE_GALLERY_LAYOUT } from "@/app/projects/data/gallery-layouts";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.zenVillas2;

export const zenVillas2Project = {
  slug: "zen-villas-2",
  metadata: {
    title: "Zen Villas-II | Benicio",
    description:
      "Explore Zen Villa II by Benicio Homes, a standalone 3 BHK villa with a private plunge pool in Assagao, Goa, shaped by contemporary tropical design.",
  },
  hero: {
    layout: "zen",
    title: "Zen Villa-II",
    description:
      "Nestled in the tranquil heart of Assagaon, Goa, crafted for privacy, comfort, and refined living, where contemporary luxury meets nature.",
    image: {
      src: media.hero,
      alt: "Zen Villa II contemporary tropical facade in Assagao, Goa",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
    mobileImage: {
      src: media.heroMobile,
      alt: "Zen Villa II contemporary tropical facade in Assagao, Goa",
    },
    mobileForegroundImage: {
      src: media.heroForegroundMobile,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 2000 / 1800,
      foregroundCanvasHeightRatio: 1200 / 1600,
    },
    mobileMediaCanvas: {
      aspectRatio: 420 / 913,
      foregroundCanvasHeightRatio: 1,
    },
  },
  intro: {
    intro:
      "Where bespoke architecture, lush surroundings, and effortless luxury become one.",
    backgroundImage: {
      src: media.intro,
      alt: "Zen Villa II contemporary architecture surrounded by tropical planting",
    },
  },
  location: {
    location: "Assagaon, Goa",
    featureImage: {
      src: media.location,
      alt: "Tropical landscape surrounding Zen Villa II in Assagao, Goa",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Tropical foliage framing Zen Villa II in Assagao, Goa",
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
      alt: "Site plan of Zen Villa II in Assagao, Goa",
    },
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "PROPERTY DETAILS",
        items: [
          { label: "Plot Size", value: "251 sq.m." },
         
        ],
      },
    ],
  },
  moodboard: {
    description:
      "The story of Zen Villa II began with the landscape. Inspired by Goa's lush surroundings and tropical climate, every space was carefully planned to welcome natural light, enhance privacy, and create a seamless connection between the villa and its environment. The result is a timeless residence where architecture and nature exist in perfect balance.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "Zen Villa II architectural moodboard with plans, materials and tropical design references",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "Zen Villa II architectural moodboard with plans, materials and tropical design references",
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
      alt: "Contemporary facade and tropical landscaping at Zen Villa II",
    },
  },
  specifications: {
    groups: [
      {
        title: "Structure",
        items: [
          "Earthquake-Resistant RCC Frame",
          "Heat-Insulated External Walls",
          "Waterproof Terraces And Sun Decks",
          "Damp-Proof Foundation System",
        ],
      },
      {
        title: "Materials",
        items: [
          "Natural Stone Flooring",
          "Granite / Corian Countertops",
          "Wooden / UPVC Windows",
          "Premium Brass Ironmongery",
        ],
      },
      {
        title: "Landscape",
        items: [
          "Private Swimming Pool",
          "Landscaped Gardens",
          "Stone-Paved Walkways",
          "Poolside Pavilion",
        ],
      },
      {
        title: "Living",
        items: [
         "Modular Kitchen",
         "Premium Lighting Throughout",
          "Segregated Wet & Dry Bathrooms",
          "Large Openings For Natural Light",
        ],
      },
      {
        title: "Technology",
        items: [
          "CCTV Security",
          "Video Door Phone",
          "100% Common-Area Power Backup",
          "High-Speed Wi-Fi Readiness",
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
      specifications: [{ label: "", value: "" }],
    },
  ],
  gallery: {
    watermark: "Zen",
    items: [
      {
        caption: "Quiet By Design.",
        image: {
          src: media.gallery[0],
          alt: "Contemporary exterior of Zen Villa II in Assagao, Goa",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[0],
      },
      {
        caption: "Open To Nature.",
        image: {
          src: media.gallery[1],
          alt: "Zen Villa II opening onto tropical landscaping in Assagao",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[1],
      },
      {
        caption: "Light In Balance.",
        image: {
          src: media.gallery[2],
          alt: "Natural light across the interiors of Zen Villa II",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[2],
      },
      {
        caption: "Space To Breathe.",
        image: {
          src: media.gallery[3],
          alt: "Open-plan living space at Zen Villa II in Goa",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[3],
      },
      {
        caption: "Rooted In Calm.",
        image: {
          src: media.gallery[4],
          alt: "Landscaped private retreat surrounding Zen Villa II",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[4],
      },
      {
        caption: "Crafted With Restraint.",
        image: {
          src: media.gallery[5],
          alt: "Crafted natural material details at Zen Villa II",
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
      alt: "Villa El Salva restored Goan heritage home in Salvador do Mundo",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/el-salva-villa",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
