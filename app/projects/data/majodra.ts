import type { ProjectDetailData } from "@/app/projects/data/types";
import { SIX_IMAGE_GALLERY_LAYOUT } from "@/app/projects/data/gallery-layouts";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.nayanVilla;

export const nayanVillaProject = {
  slug: "nayan-villa",
  metadata: {
    title: "Nayan Villas | Benicio",
    description:
      "An intimate collection of six private pool villas in Majorda, thoughtfully designed to bring together nature, privacy, and timeless tropical living with effortless elegance.",
  },
  hero: {
    layout: "nayan",
    title: "Nayan Villas",
    description:
      "An intimate collection of six private pool villas in Majorda, thoughtfully designed to bring together nature, privacy, and timeless tropical living with effortless elegance.",
    image: {
      src: media.hero,
      alt: "Nayan Villas hero",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
  },
  intro: {
    intro:
      "Surrounded by tropical plantations, each residence blends privacy, openness, and nature into a peaceful retreat.",
    backgroundImage: {
      src: media.intro,
      alt: "Majodra Villas introduction",
    },
  },
  location: {
    location: "Majorda, South Goa",
    featureImage: {
      src: media.location,
      alt: "Landscape surrounding Majodra Villas",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Tropical foliage at Majodra Villas",
    },
    description: [
      "Tropical architecture, thoughtful materiality and lush landscaping come together to create homes that breathe with their surroundings, offering a slower, more intentional way of living in South Goa.",
      "Designed to exist in harmony with nature, creating a timeless retreat of peace and privacy.",
    ],
  },
  siteComposition: {
    heading: "Site Composition",
    description:
      "Nayan Villas is thoughtfully designed to exist in harmony with its tropical surroundings. Lush gardens, winding pathways, and carefully curated landscapes create a peaceful retreat where every step feels connected to nature.",
    masterplanImage: {
      src: media.siteComposition,
      alt: "Masterplan of nayan Villas",
    },
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "Villa 1 - 3",
        items: [
          { label: "Built Up Area", value: "316 sq.m" },
          { label: "Carpet Area", value: "218 sq.m." },
          { label: "Saleable Area", value: "328 sq.m" },
        ],
      },
      {
        title: "Villa 4 - 6",
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
      "Before Nayan became a collection of homes, it began as a vision inspired by its natural surroundings. Every space was thoughtfully shaped in response to the tropical landscape, climate, and quiet character of the site, allowing the architecture to exist in harmony with nature. Through careful planning and timeless design, that vision became a place that feels deeply connected to its setting.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "Nayan Villas architectural moodboard",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "Nayan Villas architectural moodboard",
    },
  },
  architectureImage: {
    heading: "Explore Nayan Villas",
    description:
      "Every space tells a story. Discover the design philosophy of Nayan Villas.",
    cta: {
      label: "Download Brochure",
      href: "/#contact",
    },
    image: {
      src: media.architecture,
      alt: "Architectural view of Majodra Villas",
    },
  },
  specifications: {
    groups: [
      {
        title: "Structure",
        items: [
          "RCC Concrete Structure (M30 Grade)",
          "JSW Reinforced Steel Framework",
          "High-Quality Laterite Stone Walls",
          "Dr. Fixit Waterproofing System",
        ],
      },
      {
        title: "Materials",
        items: [
          "Vitrified Flooring Throughout",
          "18mm Black Granite Countertop",
          "Aluminium Windows with Teak Wooden Jali",
          "Premium Kohler Bathroom Fittings",
        ],
      },
      {
        title: "Landscape",
        items: [
        "Swimming Pool along with Jacuzzi",
          "Landscaped Tropical Gardens",
          "Outdoor Landscape Lighting",
          "Private Open Car Park",
        ],
      },
      {
        title: "Living",
        items: [
         "Modular Kitchen by Hettich/Häfele",
          "Daikin Split Air Conditioning",
          "Warm White LED Lighting",
          "Premium Light Fittings",
        ],
      },
      {
        title: "Technology",
        items: [
          "24×7 CCTV Surveillance",
          "Automated Main Gate Access",
          "100% DG Power Backup",
          "Video Door Phone System",
        ],
      },
    ],
  },
  floorPlanLayout: "stacked-two",
  floorPlans: [
    {
      description:
        "Designed as the heart of the villa, the Ground Floor brings together open-plan living, abundant natural light, and seamless transitions to private outdoor spaces, creating a welcoming environment for both everyday living and relaxed entertaining.",
      villaLabel: "GROUND FLOOR",
      footerLabel: "NAYAN",
      leftDrawing: {
        src: media.floorPlan01Ground,
        alt: "Ground floor plan for Majodra Villa 01",
      },
      rightDrawing: {
        src: media.floorPlan01First,
        alt: "First floor plan for Majodra Villa 01",
      },
      specifications: [
        { label: "Bedrooms", value: "1" },
        { label: "Bathrooms", value: "2" },
        { label: "Pool", value: "Private Pool" },
        { label: "Car Parking/Garage", value: "1" },
        { label: "Outdoor Lounge", value: "1" },
        { label: "Kitchen/Dining", value: "1" },
      ],
    },
    {
      description:
        "Designed for quiet living, the First Floor offers expansive bedrooms, intimate family spaces, and generous outdoor terraces. Every area is carefully positioned to provide privacy, natural light, and a relaxed atmosphere that complements the villa's overall design.",
      villaLabel: "FIRST FLOOR",
      footerLabel: "NAYAN",
      mirrored: true,
      leftDrawing: {
        src: media.floorPlan02Ground,
        alt: "Ground floor plan for Majodra Villa 02",
      },
      rightDrawing: {
        src: media.floorPlan02First,
        alt: "First floor plan for Majodra Villa 02",
      },
      specifications: [
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "3" },
        { label: "Pool", value: "Private Pool" },
        { label: "Lounge", value: "1" },
        { label: "Balconies", value: "2" },
        { label: "StairCase", value: "1" },
      ],
    },
  ],
  gallery: {
    watermark: "Nayan",
    items: [
      {
        caption: "Nature Leaves Light.",
        image: {
          src: media.gallery[0],
          alt: "Majodra Villas gallery image 1",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[0],
      },
      {
        caption: "Nature Shapes Every View.",
        image: {
          src: media.gallery[1],
          alt: "Majodra Villas gallery image 2",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[1],
      },
      {
        caption: "Life Flows Naturally.",
        image: {
          src: media.gallery[2],
          alt: "Majodra Villas gallery image 3",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[2],
      },
      {
        caption: "Quiet Streets. Private Living.",
        image: {
          src: media.gallery[3],
          alt: "Majodra Villas gallery image 4",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[3],
      },
      {
        caption: "Reflections of Calm.",
        image: {
          src: media.gallery[4],
          alt: "Majodra Villas gallery image 5",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[4],
      },
      {
        caption: "Nature In Every Surface.",
        image: {
          src: media.gallery[5],
          alt: "Majodra Villas gallery image 6",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[5],
      },
    ],
  },
  nextProject: {
    title: "Zen Villas-II",
    description:
      "Each residence is shaped by its surroundings, blending Goa's natural beauty with enduring architectural design.",
    image: {
      src: media.nextProject,
      alt: "Zen Villas-2 project preview",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/zen-villas-2",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
