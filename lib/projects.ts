export type Project = {
  description: string;
  floorPlanSections: readonly {
    description: string;
    footerLabel: string;
    leftDrawing: {
      alt: string;
      src: string;
    };
    rightDrawing: {
      alt: string;
      src: string;
    };
    specifications: readonly {
      label: string;
      value: string;
    }[];
    villaLabel: string;
  }[];
  heroImage: {
    alt: string;
    src: string;
  };
  intro: string;
  introImage: {
    alt: string;
    src: string;
  };
  locationSection: {
    decorativeImage: {
      alt: string;
      src: string;
    };
    description: readonly string[];
    featureImage: {
      alt: string;
      src: string;
    };
    location: string;
  };
  siteCompositionSection: {
    compass: string;
    description: string;
    heading: string;
    masterplanImage: {
      alt: string;
      src: string;
    };
    specifications: readonly {
      items: readonly {
        label: string;
        value: string;
      }[];
      title: string;
    }[];
  };
  siteShowcaseSection: {
    cta: {
      href: string;
      label: string;
    };
    description: string;
    heading: string;
    image: {
      alt: string;
      src: string;
    };
  };
  specificationsSection: {
    groups: readonly {
      items: readonly string[];
      title: string;
    }[];
  };
  slug: string;
  title: string;
};

export const projects = [
  {
    slug: "vanam-villas",
    title: "Vanam Villas",
    description:
      "Rooted in Goa's tropical landscape, Vanam Villas brings architecture, light, and nature together in a calm, private rhythm.",
    intro:
      "Before the walls, there was the land. Vanam is shaped by its trees, its light, and the quiet rhythm of Goa.",
    introImage: {
      src: "/assets/projects/palm-house-front-view.png",
      alt: "Vanam Villas architecture set within tropical landscape",
    },
    locationSection: {
      location: "Anjuna, Goa, IN",
      featureImage: {
        src: "/assets/storysection/storysection.svg",
        alt: "Goa coastline near Anjuna",
      },
      decorativeImage: {
        src: "/assets/legacy/legacy-3.svg",
        alt: "Dense tropical foliage",
      },
      description: [
        "Set in the heart of Anjuna, Vanam Villas brings together contemporary architecture and Goa's tropical landscape. Every home is thoughtfully positioned to preserve openness, privacy, and its connection to nature.",
        "Inspired by the forest that surrounds it, the development offers a calm, enduring way of living rooted in place.",
      ],
    },
    siteCompositionSection: {
      heading: "Site Composition",
      description:
        "Vanam Villas blends with nature, offering a harmonious environment. Pedestrian pathways wind through manicured gardens, making every stroll a resort experience. The landscaping features exotic flora that enhances the serene ambience.",
      masterplanImage: {
        src: "/assets/projects/site-layout.svg",
        alt: "Masterplan of Vanam Villas showing six residences",
      },
      compass: "N",
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
    siteShowcaseSection: {
      heading: "Explore Vanam Villas",
      description:
        "Every detail has a purpose. Explore the complete vision behind Vanam Villas.",
      cta: {
        label: "Download Brochure",
        href: "/#contact",
      },
      image: {
        src: "/assets/projects/vanam-site-showcase.png",
        alt: "Vanam Villas facade surrounded by tropical landscape",
      },
    },
    specificationsSection: {
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
    floorPlanSections: [
      {
        description:
          "Designed to embrace the forest setting, Villa Type 1 unfolds through open living spaces, generous outdoor transitions, and naturally lit interiors. Every room is positioned to maximize privacy while strengthening its connection to the surrounding landscape.",
        villaLabel: "Villa 01",
        footerLabel: "Vanam",
        leftDrawing: {
          src: "/assets/projects/vanam-villa-type-1.svg",
          alt: "Ground floor plan for Vanam Villa Type 1",
        },
        rightDrawing: {
          src: "/assets/projects/vanam-first-floor-plan.svg",
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
        leftDrawing: {
          src: "/assets/projects/vanam-villa-type-2-ground-floor.png",
          alt: "Ground floor plan for Vanam Villa Type 2",
        },
        rightDrawing: {
          src: "/assets/projects/vanam-villa-type-2-first-floor.png",
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
    heroImage: {
      src: "/assets/projects/palm-house-front-view.png",
      alt: "Vanam Villas surrounded by tropical planting",
    },
  },
] as const satisfies readonly Project[];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
