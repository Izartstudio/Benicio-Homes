import type { ProjectDetailData } from "@/app/projects/data/types";
import { SIX_IMAGE_GALLERY_LAYOUT } from "@/app/projects/data/gallery-layouts";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.nayanVilla;

export const nayanVillaProject = {
  slug: "nayan-villa",
  metadata: {
    title: "Nayan Villas | Benicio",
    description:
      "Explore Nayan Villa by Benicio Homes, a design-led home in Goa shaped by a distinct architectural point of view, honest materials and considered living.",
  },
  hero: {
    layout: "nayan",
    title: "Nayan Villas",
    description:
      "An intimate collection of six private pool villas in Majorda, thoughtfully designed to bring together nature, privacy, and timeless tropical living with effortless elegance.",
    image: {
      src: media.hero,
      alt: "Nayan Villas contemporary tropical residences in Majorda, South Goa",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
    mobileImage: {
      src: media.heroMobile,
      alt: "Nayan Villas contemporary tropical residences in Majorda, South Goa",
    },
    mobileForegroundImage: {
      src: media.heroForegroundMobile,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 1020 / 1000,
      foregroundCanvasHeightRatio: 1,
    },
    mobileMediaCanvas: {
      aspectRatio: 420 / 912,
      foregroundCanvasHeightRatio: 1,
    },
  },
  intro: {
    intro:
      "Surrounded by tropical plantations, each residence blends privacy, openness, and nature into a peaceful retreat.",
    backgroundImage: {
      src: media.intro,
      alt: "Nayan Villas facade opening onto a landscaped lawn in Majorda, Goa",
    },
  },
  location: {
    location: "Majorda, South Goa",
    featureImage: {
      src: media.location,
      alt: "Tropical landscape surrounding Nayan Villas in Majorda, South Goa",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Tropical foliage framing Nayan Villas in Majorda, South Goa",
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
      alt: "Masterplan of six Nayan Villas in Majorda, South Goa",
    },
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "Villa 1 - 6",
        items: [
          { label: "Total Built Up Area", value: "321 sq.m" },
          { label: "Total Carpet Area", value: "282 sq.m." },
         
        ],
      },
   
    ],
  },
  moodboard: {
    description:
      "Before Nayan became a collection of homes, it began as a vision inspired by its natural surroundings. Every space was thoughtfully shaped in response to the tropical landscape, climate, and quiet character of the site, allowing the architecture to exist in harmony with nature. Through careful planning and timeless design, that vision became a place that feels deeply connected to its setting.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "Nayan Villas architectural moodboard with plans, materials and tropical design references",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "Nayan Villas architectural moodboard with plans, materials and tropical design references",
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
      alt: "Contemporary architecture and landscaped garden at Nayan Villas in Majorda",
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
        alt: "Ground floor plan for Nayan Villas in Majorda, South Goa",
      },
      rightDrawing: {
        src: media.floorPlan01First,
        alt: "First floor plan for Nayan Villas in Majorda, South Goa",
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
        alt: "Ground floor plan for the second Nayan Villas layout",
      },
      rightDrawing: {
        src: media.floorPlan02First,
        alt: "First floor plan for the second Nayan Villas layout",
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
          alt: "Sunlight filtering through tropical landscaping at Nayan Villas",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[0],
      },
      {
        caption: "Nature Shapes Every View.",
        image: {
          src: media.gallery[1],
          alt: "Garden views surrounding Nayan Villas in Majorda, South Goa",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[1],
      },
      {
        caption: "Life Flows Naturally.",
        image: {
          src: media.gallery[2],
          alt: "Indoor-outdoor living space at Nayan Villas in Majorda, Goa",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[2],
      },
      {
        caption: "Quiet Streets. Private Living.",
        image: {
          src: media.gallery[3],
          alt: "Private residential approach to Nayan Villas in a tropical setting",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[3],
      },
      {
        caption: "Reflections of Calm.",
        image: {
          src: media.gallery[4],
          alt: "Swimming pool reflecting the tropical landscape at Nayan Villas",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[4],
      },
      {
        caption: "Nature In Every Surface.",
        image: {
          src: media.gallery[5],
          alt: "Natural architectural materials used throughout Nayan Villas",
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
      alt: "Zen Villa II contemporary tropical home in Assagao, Goa",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/zen-villas-2",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
