import type { Metadata } from "next";
import { projectList } from "@/app/projects/data";
import { EditorialListingPage } from "@/components/journal/editorial-listing-page";
import type { ProjectStatus } from "@/components/journal/project-status-tag";

export const metadata: Metadata = {
  title: "Projects | Benicio Residences",
  description:
    "Explore Benicio Homes projects across Goa, from contemporary tropical residences to heritage restorations shaped by honest materials and a distinct architectural point of view.",
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
    status: "sold-out",
    description: "Gated community of 6 signature villas in Anjuna, Goa.",
    specifications: [
      { label: "Bedrooms", value: "4 BHK" },
      { label: "Plot Size", value: "2100 sq. m." },
      { label: "Project Status", value: "Sold Out" },
    ],
  },
  "nayan-villa": {
    status: "for-sale",
    description: "Gated community of six private-pool tropical villas in Majorda, South Goa",
    specifications: [
      { label: "Bedrooms", value: "4 BHK" },
      { label: "Plot Size", value: "2400 sq. m." },
      { label: "Project Status", value: "For Sale" },
    ],
  },
  "zen-villa-1": {
    status: "sold-out",
    description: "Standalone 3 BHK zen style villa in Assagaon, Goa",
    specifications: [
      { label: "Bedrooms", value: "3 BHK" },
      { label: "Plot Size", value: "260 sq. m." },
      { label: "Project Status", value: "Sold Out" },
    ],
  },
  "zen-villas-2": {
    status: "ongoing",
    description: "Standalone 3 BHK zen style villa in Assagaon, Goa",
    specifications: [
      { label: "Bedrooms", value: "3 BHK" },
      { label: "Plot Size", value: "251 sq. m." },
      { label: "Project Status", value: "Ongoing" },
    ],
  },
  "el-salva-villa": {
    status: "for-sale",
    description: "Standalone 5 BHK restored Goan mansion in Salvador do mundo, Goa.",
    specifications: [
      { label: "Bedrooms", value: "5 BHK" },
      { label: "Plot Size", value: "1000 sq. m." },
      { label: "Project Status", value: "For Sale" },
    ],
  },
  "villa-perola": {
    status: "sold-out",
    description: "Standalone 5 BHK restored Goan Villa in Socorro, Goa",
    specifications: [
      { label: "Type", value: "Heritage Villa" },
      { label: "Plot Size", value: "700 sq. m." },
      { label: "Project Status", value: "Sold Out" },
    ],
  },
};

const projectListStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Benicio Homes projects in Goa",
  itemListElement: projectList.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: project.hero.title,
    url: `https://benicio.co.in/projects/${project.slug}`,
  })),
};

export default function ProjectsPage() {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectListStructuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
      <EditorialListingPage
      accentColor="#dc4c28"
      cardAuthorColor="#ffffff"
      cardTitleColor="#232323"
      cardTexture="https://pub-5a938dd2c42e460dae151e92bbe99404.r2.dev/Product-Detail-Page/ListingPage/card-texture.webp"
      ctaBackgroundColor="#575757"
      ctaTextColor="#ffffff"
      contactTransitionGradient="linear-gradient(180deg, rgba(185,185,185,0) 0%, rgba(185,185,185,0.35) 48%, rgba(185,185,185,0.78) 76%, #b9b9b9 100%)"
      description="A record of what Benicio has built and what is taking shape. Contemporary tropical homes, private villa communities and heritage restorations, approached with a standard vision."
      descriptionTextColor="#EEEEEE"
      emptyMessage="New projects are coming soon."
      heading="We built the Home we Believe in"
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
      listingHeading="The Work, Project by Project"
      loadMoreLabel="View More Projects"
      sectionLabel="Benicio projects"
      stepBackgroundColor="#b9b9b9"
      stepTexture="/assets/projects/texture-listing.webp"
      stepTextureBlend={false}
      variant="projects"
      />
    </>
  );
}
