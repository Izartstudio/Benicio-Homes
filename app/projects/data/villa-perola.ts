import { PROJECT_MEDIA } from "@/app/projects/data/project-media";
import type { ProjectDetailData } from "@/app/projects/data/types";

const media = PROJECT_MEDIA.villaPerola;

export const villaPerolaProject = {
  slug: "villa-perola",
  metadata: {
    title: "Villa Perola | Benicio",
    description:
      "Explore Villa Perola by Benicio Homes, a restored 5 BHK Goan villa in Socorro, Goa, where original character is preserved through considered restoration.",
  },
  hero: {
    layout: "el-salva",
    variant: "perola",
    title: "Villa Perola",
    description:
      "An ancestral Goan home restored with care, preserving the character of its past while creating a refined setting for contemporary life.",
    image: { src: media.hero, alt: "Restored exterior of Villa Perola heritage home in Goa" },
    foregroundImage: { src: media.heroForeground, alt: "" },
    mobileImage: {
      src: media.heroMobile,
      alt: "Restored exterior of Villa Perola heritage home in Goa",
    },
    mobileForegroundImage: {
      src: media.heroForegroundMobile,
      alt: "",
    },
    mediaCanvas: {
      aspectRatio: 1440 / 1500,
    },
    mobileMediaCanvas: {
      aspectRatio: 420 / 912,
      foregroundCanvasHeightRatio: 1,
    },
  },
  intro: {
    intro:
      "A living piece of Goa's architectural heritage, renewed with restraint and shaped for the rhythms of modern life.",
    backgroundImage: { src: media.intro, alt: "Villa Perola heritage architecture and tropical landscape" },
  },
  location: {
    location: "Goa",
    featureImage: { src: media.location, alt: "Villa Perola heritage home within the tropical Goan landscape" },
    decorativeImage: { src: media.locationDecorative, alt: "Tropical foliage surrounding Villa Perola in Goa" },
    description: [
      "Set within Goa's lush landscape, Villa Perola is shaped by the craft, proportions, and quiet dignity of a traditional family home.",
      "Its restoration protects the ancestral character of the house while giving every space a natural ease for contemporary living.",
    ],
  },
  contact: {
    heading: "Begin The Conversation.",
    copy: "Whether you're exploring a Benicio residence, considering a restoration opportunity, or simply want to understand our philosophy, we'd be pleased to hear from you. Every meaningful project begins with a conversation.",
  },
  editorialVariants: {
    mobileLayout: "perola",
    textures: {
      siteComposition: media.editorialSiteCompositionTexture,
      steps: PROJECT_MEDIA.shared.concreteTexture,
      moodboard: "",
      showcase: "",
      gallery: media.restorationTexture,
    },
    siteComposition: {
      image: { src: media.editorialSiteComposition, alt: "Architectural composition of the restored Villa Perola heritage home" },
    },
    moodboard: {
      labels: {
        primary: "LIVED",
        vertical: "UNHURRIED",
        footer: "STILLNESS",
      },
      images: [
        { src: media.editorialMoodboard[0], alt: "Traditional Goan architectural references for the Villa Perola restoration" },
        { src: media.editorialMoodboard[1], alt: "Material palette for the Villa Perola heritage restoration" },
        { src: media.editorialMoodboard[2], alt: "Villa Perola restoration sketches and spatial references" },
        { src: media.editorialMoodboard[3], alt: "Goan heritage details informing the Villa Perola restoration" },
      ],
    },
    showcase: {
      images: [
        { src: media.editorialShowcase[0], alt: "Restored facade and garden of Villa Perola in Goa" },
        { src: media.editorialShowcase[1], alt: "Traditional roof and architectural detail at Villa Perola" },
        { src: media.editorialShowcase[2], alt: "Crafted heritage detail inside the restored Villa Perola" },
        { src: media.editorialShowcase[3], alt: "Natural materials used in the Villa Perola restoration" },
        { src: media.editorialShowcase[4], alt: "Tropical indoor-outdoor detail at Villa Perola" },
      ],
    },
    gallery: {
      watermark: "Villa Perola",
      items: [
        { caption: "Comfort, Framed By Nature.", image: { src: media.editorialGallery[0], alt: "Villa Perola living space framed by its tropical garden" } },
        { caption: "Inside, The Garden Continues.", image: { src: media.editorialGallery[1], alt: "Villa Perola interior connected to the surrounding Goan garden" } },
      ],
    },
  },
} as const satisfies ProjectDetailData;
