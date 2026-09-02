import type { ProjectDetailData } from "@/app/projects/data/types";
import { SIX_IMAGE_GALLERY_LAYOUT } from "@/app/projects/data/gallery-layouts";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.elSalvaVilla;

export const elSalvaVillaProject = {
  slug: "el-salva-villa",
  metadata: {
    title: "El Salva Villa | Benicio",
    description:
      "Rooted in the architectural charm of old Goa and reimagined for today, this heritage villa brings together history, elegance, and contemporary luxury in one timeless sanctuary.",
  },
  hero: {
    layout: "el-salva",
    variant: "el-salva",
    title: "Villa El Salva",
    description:
      "Rooted in the architectural charm of old Goa and reimagined for today, this heritage villa brings together history, elegance, and contemporary luxury in one timeless sanctuary.",
    image: {
      src: media.hero,
      alt: "El Salva Villa hero",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
    mobileImage: {
      src: media.heroMobile,
      alt: "El Salva Villa hero",
    },
    mobileForegroundImage: {
      src: media.heroForegroundMobile,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 1435 / 1500,
    },
    mobileMediaCanvas: {
      aspectRatio: 420 / 911,
      foregroundCanvasHeightRatio: 1,
    },
  },
  intro: {
    intro:
      "El Salva blends the soul of the 1930s with the refinement of 2026, creating a heritage villa reimagined for luxury.",
    backgroundImage: {
      src: media.intro,
      alt: "El Salva Villa introduction",
    },
  },
  location: {
    location: "Salvador du Mundo - Goa",
    featureImage: {
      src: media.location,
      alt: "Landscape surrounding El Salva Villa",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Tropical foliage at El Salva Villa",
    },
    description: [
      "Set in Salvador du Mundo, Goa, El Salva is a heritage villa shaped by its surroundings. Blending history with modern living, it preserves the spirit of Goa architecture while embracing a contemporary way of life.",
      "Rooted in Goa's enduring character, El Salva offers a refined way of living shaped by history and place.",
    ],
  },
  siteComposition: {
    guideLineVariant: "el-salva",
    heading: "Site Composition",
    description:
      "El Salva offers five spacious bedrooms, generous living areas, and a thoughtfully designed kitchen and dining space for effortless living. A private pool, landscaped gardens, and a versatile attic complete this timeless villa retreat.",
    masterplanImage: {
      src: media.siteComposition,
      alt: "Site composition of El Salva Villa",
    },
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "PROPERTY",
        items: [
          { label: "Plot Area", value: "1000 sq.m." },
          { label: "Garden Area", value: "500 sq.m." },
          { label: "Swimming Pool Area", value: "50 sq.m" },
          { label: "Parking Area", value: "70 sq.m" },
          { label: "Built up Area", value: "714 sq.m" },
          { label: "Carpet Area", value: "559 sq.m" },
        ],
      },
    ],
  },
  moodboard: {
    description:
      "El Salva is rooted in the character of its setting in Goa, where heritage and nature come together to shape a home of quiet elegance. Thoughtful planning, timeless materials, and a deep respect for the villa's surroundings create spaces that feel warm, private, and effortlessly connected to the landscape and its natural rhythm of life.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "El Salva Villa architectural moodboard",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "El Salva Villa architectural moodboard",
    },
  },
  architectureImage: {
    heading: "Explore El Salva Villa",
    description:
      "Step into El Salva, where heritage and nature come together.",
    cta: {
      label: "Download Brochure",
      href: "/#contact",
    },
    image: {
      src: media.architecture,
      alt: "Architectural view of El Salva Villa",
    },
  },
  specifications: {
    groups: [
      {
        title: "Structure",
        items: [
          "High plinth-levels with damp-proofing below the ground-floor",
          "Waterproofing For Terraces/Sun-Decks",
          "Internal Walls In Fly Ash Bricks",
          "Quake Resistant RCC Framed Structure",
        ],
      },
      {
        title: "Materials",
        items: [
          "Corian | Granite counter top",
          "Stainless steel sink",
          "Natural stone flooring",
          "Wooden/ UPVC windows",
        ],
      },
      {
        title: "Landscape",
        items: [
          "Landscaped gardens",
          "Private Swimming Pool",
          "Poolside Pavilion",
          "Paved Walkways & Driveway",
        ],
      },
      {
        title: "Living",
        items: [
          "Five Spacious Bedrooms",
          "Grand Living Room & Attic floor",
          "Modular Designer Kitchen",
          "Large Dining Area",
        ],
      },
      {
        title: "Technology",
        items: [
          "100% Power Backup",
          "CCTV Security System",
          "Video Door Phone",
          "Built-in Satellite TV Cabling",
        ],
      },
    ],
  },
  floorPlanLayout: "stacked-two",
  floorPlans: [
    {
      description:
        "Designed as the heart of El Salva, the Ground Floor blends open living spaces with natural light and effortless access to the beautifully landscaped surroundings with timeless elegance..",
      villaLabel: "GROUND FLOOR",
      footerLabel: "VILLA EL SALVA",
      leftDrawing: {
        src: media.floorPlan01Ground,
        alt: "Ground floor plan for El Salva Villa",
      },
      rightDrawing: {
        src: media.floorPlan01First,
        alt: "First floor plan for El Salva Villa",
      },
      specifications: [
        { label: "Bedrooms", value: "3" },
        { label: "Bathrooms", value: "3" },
        { label: "Pool", value: "Private Pool" },
        { label: "Verandahs", value: "3" },
        { label: "Living Room", value: "1" },
        { label: "Kitchen/Dining", value: "1" },
        { label: "Parking Area", value: "1" },
      ],
    },
    {
      description:
        "The First Floor offers spacious bedrooms enriched by natural light and surrounded by the calming beauty of Goa's lush landscape, creating a peaceful and timeless living experience with refined comfort and effortless elegance.",
      villaLabel: "FIRST FLOOR",
      footerLabel: "VILLA EL SALVA",
      mirrored: true,
      leftDrawing: {
        src: media.floorPlan02Ground,
        alt: "Alternate ground floor plan for El Salva Villa",
      },
      rightDrawing: {
        src: media.floorPlan02First,
        alt: "Alternate first floor plan for El Salva Villa",
      },
      specifications: [
        { label: "Bedrooms", value: "2" },
        { label: "Bathrooms", value: "2" },
        { label: "Verandah", value: "1" },
        { label: "Attic Room", value: "1" },
        { label: "Power Room", value: "1" },
      ],
    },
  ],
  gallery: {
    watermark: "El Salva",
    items: [
      {
        caption: "Living At The Edge Of Nature.",
        image: {
          src: media.gallery[0],
          alt: "El Salva Villa gallery image 1",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[0],
      },
      {
        caption: "Light, Filtered Through Time.",
        image: {
          src: media.gallery[1],
          alt: "El Salva Villa gallery image 2",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[1],
      },
      {
        caption: "Spaces Made To Be Shared.",
        image: {
          src: media.gallery[2],
          alt: "El Salva Villa gallery image 3",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[2],
      },
      {
        caption: "Stillness, Within Reach.",
        image: {
          src: media.gallery[3],
          alt: "El Salva Villa gallery image 4",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[3],
      },
      {
        caption: "Materials That Age Gracefully.",
        image: {
          src: media.gallery[4],
          alt: "El Salva Villa gallery image 5",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[4],
      },
      {
        caption: "Crafted By Human Hands.",
        image: {
          src: media.gallery[5],
          alt: "El Salva Villa gallery image 6",
        },
        ...SIX_IMAGE_GALLERY_LAYOUT[5],
      },
    ],
  },
  nextProject: {
    title: "Vanam Villas",
    description:
      "A collection of homes rooted in Goa's tropical landscape and shaped by light, material, and nature.",
    image: {
      src: media.nextProject,
      alt: "Vanam Villas project preview",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/vanam-villas",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
