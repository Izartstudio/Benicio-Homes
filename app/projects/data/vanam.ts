import type { ProjectDetailData } from "@/app/projects/data/types";
import { PROJECT_MEDIA } from "@/app/projects/data/project-media";

const media = PROJECT_MEDIA.vanamVillas;

export const vanamProject = {
  slug: "vanam-villas",
  metadata: {
    title: "Vanam Villas | Benicio",
    description:
      "Rooted in Goa's tropical landscape, Vanam Villas brings architecture, light, and nature together in a calm, private rhythm.",
  },
  hero: {
    title: "Vanam Villas",
    description:
      "Rooted in Goa's tropical landscape, Vanam Villas brings architecture, light, and nature together in a calm, private rhythm.",
    image: {
      src: media.hero,
      alt: "Vanam Villas framed by tropical planting",
    },
    foregroundImage: {
      src: media.heroForeground,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 1440 / 1500,
      foregroundCanvasHeightRatio: 900 / 1500,
    },
  },
  intro: {
    intro:
      "Before the walls, there was the land. Vanam is shaped by its trees, its light, and the quiet rhythm of Goa.",
    backgroundImage: {
      src: media.intro,
      alt: "Stone courtyard at Vanam Villas",
    },
  },
  location: {
    location: "Anjuna, Goa, IN",
    featureImage: {
      src: media.location,
      alt: "Goa coastline near Anjuna",
    },
    decorativeImage: {
      src: media.locationDecorative,
      alt: "Dense tropical foliage",
    },
    description: [
      "Set in the heart of Anjuna, Vanam Villas brings together contemporary architecture and Goa's tropical landscape. Every home is thoughtfully positioned to preserve openness, privacy, and its connection to nature.",
      "Inspired by the forest that surrounds it, the development offers a calm, enduring way of living rooted in place.",
    ],
  },
  siteComposition: {
    heading: "Site Composition",
    description:
      "Vanam Villas blends with nature, offering a harmonious environment. Pedestrian pathways wind through manicured gardens, making every stroll a resort experience. The landscaping features exotic flora that enhances the serene ambience.",
    masterplanImage: {
      src: media.siteComposition,
      alt: "Masterplan of Vanam Villas showing six residences",
    },
    masterplanVariant: "vanam-large",
    compass: "N",
    textureSrc: PROJECT_MEDIA.shared.siteCompositionTexture,
    specifications: [
      {
        title: "Villa 1 - 3",
        items: [
          { label: "Built Up Area", value: "316 sq.m" },
          { label: "Carpet Area", value: "218 sq.m" },
          { label: "Saleable Area", value: "328 sq.m" },
        ],
      },
      {
        title: "Villa 4 - 6",
        items: [
          { label: "Built Up Area", value: "339 sq.m" },
          { label: "Carpet Area", value: "234 sq.m" },
          { label: "Saleable Area", value: "351 sq.m" },
        ],
      },
    ],
  },
  moodboard: {
    description:
      "Before Vanam became a collection of homes, it existed as an idea shaped by the landscape itself. Every line was drawn in response to Anjuna's forests, tropical climate, and natural rhythms, allowing the architecture to grow with its surroundings rather than replace them. Through observation, sketching, refinement, and careful execution, that idea evolved into homes that feel quietly rooted in place.",
    desktopImage: {
      src: media.moodboardDesktop,
      alt: "Vanam Villas architectural moodboard with plans, material studies, sketches, site photographs, and design notes",
    },
    mobileImage: {
      src: media.moodboardMobile,
      alt: "Vanam Villas architectural moodboard with plans, material studies, sketches, site photographs, and design notes",
    },
  },
  architectureImage: {
    heading: "Explore Vanam Villas",
    description:
      "Every detail has a purpose. Explore the complete vision behind Vanam Villas.",
    cta: {
      label: "Download Brochure",
      href: "/#contact",
    },
    image: {
      src: media.architecture,
      alt: "Vanam Villas facade surrounded by tropical landscape",
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
  floorPlanLayout: "vanam-paired",
  floorPlans: [
    {
      description:
        "Designed to embrace the forest setting, Villa Type 1 unfolds through open living spaces, generous outdoor transitions, and naturally lit interiors. Every room is positioned to maximize privacy while strengthening its connection to the surrounding landscape.",
      villaLabel: "Villa 01",
      footerLabel: "Vanam",
      leftDrawing: {
        src: media.floorPlan01Ground,
        alt: "Ground floor plan for Vanam Villa Type 1",
      },
      rightDrawing: {
        src: media.floorPlan01First,
        alt: "First floor plan for Vanam Villa Type 1",
      },
      specifications: [
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "4" },
        { label: "Pool", value: "Private Pool" },
        { label: "Verandahs", value: "2" },
        { label: "Balconies", value: "2" },
      ],
    },
    {
      description:
        "Villa Type 2 expands the living experience with a dedicated upper lounge, gym terrace, and larger indoor-outdoor spaces. Designed for families, it balances private retreats with generous areas for gathering and entertaining.",
      villaLabel: "Villa 02",
      footerLabel: "Vanam",
      mirrored: true,
      leftDrawing: {
        src: media.floorPlan02Ground,
        alt: "Ground floor plan for Vanam Villa Type 2",
      },
      rightDrawing: {
        src: media.floorPlan02First,
        alt: "First floor plan for Vanam Villa Type 2",
      },
      specifications: [
        { label: "Bedrooms", value: "4" },
        { label: "Bathrooms", value: "4" },
        { label: "Pool", value: "Private Pool" },
        { label: "Verandahs", value: "2" },
        { label: "Balconies", value: "2" },
        { label: "Upper Terrace", value: "Gym & Balcony" },
      ],
    },
  ],
  gallery: {
    watermark: "Vanam",
    items: [
      {
        caption: "Designed For Goa.",
        image: {
          src: media.gallery[0],
          alt: "Vanam Villas pool opening onto the Goan landscape at sunset",
        },
        width: 18.3518,
        height: 21.2881,
        position: { left: 4.6875, top: 3.875 },
      },
      {
        caption: "Built Around Nature.",
        image: {
          src: media.gallery[1],
          alt: "Palm leaves casting shadows across a textured wall",
        },
        width: 32.5625,
        height: 5.6838,
        position: {
          left: 52.6875,
          top: 3.875,
          captionAlign: "right",
        },
      },
      {
        caption: "Light Meets Stone.",
        image: {
          src: media.gallery[2],
          alt: "Hands working with natural stone in warm daylight",
        },
        width: 18.7579,
        height: 21.4818,
        position: { left: 35.625, top: 19.5625 },
      },
      {
        caption: "Earth. Light. Shelter.",
        image: {
          src: media.gallery[3],
          alt: "Earth-toned interior framed by soft architectural light",
        },
        width: 9.8705,
        height: 14.8124,
        position: {
          left: 75.375,
          top: 18.5625,
          captionAlign: "right",
        },
      },
      {
        caption: "Designed To Belong.",
        image: {
          src: media.gallery[4],
          alt: "Handcrafted brick and plaster details at Vanam Villas",
        },
        width: 10.8254,
        height: 18.8706,
        position: { left: 4.6875, top: 37.75 },
      },
      {
        caption: "Calm Through Craft.",
        image: {
          src: media.gallery[5],
          alt: "Sculptural stone surface shaped by light and shadow",
        },
        width: 8.4342,
        height: 10.0756,
        position: { left: 40.7764, top: 46.375 },
      },
      {
        caption: "Rooted. Refined. Enduring.",
        image: {
          src: media.gallery[6],
          alt: "Quiet, refined interior at Vanam Villas",
        },
        width: 13.0758,
        height: 16.7575,
        position: {
          left: 72.1875,
          top: 39.875,
          captionAlign: "right",
        },
      },
    ],
  },
  nextProject: {
    title: "Nayan Villa",
    description:
      "Each residence is shaped by its surroundings, blending Goa's natural beauty with enduring architectural design.",
    image: {
      src: media.nextProject,
      alt: "Nayan Villa residence framed by trees and warm architectural materials",
    },
    ctaLabel: "Explore Project",
    ctaHref: "/projects/nayan-villa",
  },
  contact: {
    heading: "Begin The Conversation.",
    copy:
      "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
} as const satisfies ProjectDetailData;
