import type { Metadata } from "next";
import { projectList } from "@/app/projects/data";
import { EditorialListingPage } from "@/components/journal/editorial-listing-page";
import type { ProjectStatus } from "@/components/journal/project-status-tag";

export const metadata: Metadata = {
  title: "Projects | Benicio Residences",
  description:
    "Explore Benicio residences shaped by Goa's landscape, climate, craft, and architectural heritage.",
};

const projectListingDetails: Record<
  string,
  {
    status: ProjectStatus;
    description: string;
    specifications: Array<{ label: string; value: string }>;
  }
> = {
  "vanam-villas": {
    status: "for-sale",
    description: "Gated community of six signature villas in Anjuna, Goa.",
    specifications: [
      { label: "Bedrooms", value: "4 BHK" },
      { label: "Plot Size", value: "2100 sq. m." },
      { label: "Project Status", value: "Ongoing" },
    ],
  },
  "nayan-villa": {
    status: "for-sale",
    description: "Gated community of six private-pool tropical villas in Majorda, South Goa.",
    specifications: [
      { label: "Bedrooms", value: "4 BHK" },
      { label: "Plot Size", value: "2100 sq. m." },
      { label: "Project Status", value: "Coming Soon" },
    ],
  },
  "zen-villa-1": {
    status: "sold-out",
    description: "Gated community of six private-pool tropical villas in Majorda, South Goa.",
    specifications: [
      { label: "Bedrooms", value: "4 BHK" },
      { label: "Plot Size", value: "2100 sq. m." },
      { label: "Project Status", value: "Coming Soon" },
    ],
  },
  "zen-villas-2": {
    status: "ongoing",
    description: "Standalone zen-style villas in Assagaon, Goa.",
    specifications: [
      { label: "Bedrooms", value: "3 BHK" },
      { label: "Plot Size", value: "2600 sq. m." },
      { label: "Project Status", value: "Ongoing" },
    ],
  },
  "el-salva-villa": {
    status: "for-sale",
    description: "A restored Goan mansion in Salvador do Mundo, Goa.",
    specifications: [
      { label: "Bedrooms", value: "5 BHK" },
      { label: "Plot Size", value: "1000 sq. m." },
      { label: "Project Status", value: "Ongoing" },
    ],
  },
  "villa-perola": {
    status: "ongoing",
    description: "An ancestral Goan home restored for contemporary life.",
    specifications: [
      { label: "Type", value: "Heritage Villa" },
      { label: "Setting", value: "Goa" },
      { label: "Project Status", value: "Ongoing" },
    ],
  },
};

export default function ProjectsPage() {
  return (
    <EditorialListingPage
      accentColor="#dc4c28"
      cardAuthorColor="#ffffff"
      cardTitleColor="#232323"
      cardTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/card-texture.webp"
      ctaBackgroundColor="#575757"
      ctaTextColor="#ffffff"
      contactTransitionGradient="linear-gradient(180deg, rgba(185,185,185,0) 0%, rgba(185,185,185,0.35) 48%, rgba(185,185,185,0.78) 76%, #b9b9b9 100%)"
      description="From tropical villas shaped by Goa's landscape to heritage homes restored with care, every project reflects our commitment to thoughtful design, enduring craftsmanship, and architecture that belongs to its place."
      descriptionTextColor="#EEEEEE"
      emptyMessage="New projects are coming soon."
      heading="A Collection Built Over Time."
      introBackgroundColor="#343434"
      introTextColor="#EEEEEE"
      introTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/introtexture.webp"
      items={projectList.map((project, index) => {
        const details = projectListingDetails[project.slug];

        return {
          author: project.location.location,
          description: details?.description ?? project.hero.description,
          href: `/projects/${project.slug}`,
          image: project.hero.image,
          number: `Project ${String(index + 1).padStart(3, "0")}`,
          specifications: details?.specifications,
          status: details?.status,
          title: project.hero.title,
        };
      })}
      listingBackgroundColor="#b9b9b9"
      listingTexture="/assets/projects/texture-listing.webp"
      listingHeading="Homes With A Sense Of Place"
      loadMoreLabel="Load More Projects"
      sectionLabel="Benicio projects"
      stepBackgroundColor="rgb(185 185 185 / 0.25)"
      stepTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/card-texture.webp"
      stepTextureBlend
      variant="projects"
    />
  );
}
