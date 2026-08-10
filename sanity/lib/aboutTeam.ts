import type { SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
import { getTeamMemberImageUrl } from "./image";
import { ABOUT_TEAM_SECTION_QUERY } from "./queries";

export type AboutTeamMember = {
  id: string;
  name: string;
  role: string;
  image: string;
  altText: string;
};

export type AboutTeamSection = {
  isVisible: boolean;
  heading: string;
  members: AboutTeamMember[];
};

const fallbackImage = "/images/placeholders/responsive-media-fallback.webp";

export const fallbackAboutTeamSection: AboutTeamSection = {
  isVisible: true,
  heading: "Crafted By A Shared Vision",
  members: [
    { id: "marketing", role: "Head Of Marketing & Branding", name: "Priyanka Rohra", image: fallbackImage, altText: "Priyanka Rohra" },
    { id: "finance", role: "Head Of Finance", name: "Ms. Kaneez", image: fallbackImage, altText: "Ms. Kaneez" },
    { id: "admin", role: "Head Of Admin", name: "Ms. Fatima", image: fallbackImage, altText: "Ms. Fatima" },
    { id: "supervisor", role: "Site Supervisor", name: "Afzal Khan", image: fallbackImage, altText: "Afzal Khan" },
    { id: "legal", role: "Head Of Legal Team", name: "Priyam Sheik", image: fallbackImage, altText: "Priyam Sheik" },
    { id: "placeholder", role: "Designation", name: "Name", image: fallbackImage, altText: "Team member portrait" },
  ],
};

type RawAboutTeamSection = {
  isVisible?: boolean;
  heading?: string;
  members?: Array<{
    _key?: string;
    name?: string;
    role?: string;
    altText?: string;
    image?: SanityImageSource;
  }>;
};

export async function getAboutTeamSection(): Promise<AboutTeamSection> {
  if (!sanityClient) return fallbackAboutTeamSection;

  try {
    const section = await sanityClient.fetch<RawAboutTeamSection | null>(
      ABOUT_TEAM_SECTION_QUERY,
      {},
      { cache: "no-store" },
    );

    if (!section) return fallbackAboutTeamSection;

    const members = (section.members ?? []).flatMap((member, index) => {
      const name = member.name?.trim();
      const role = member.role?.trim();
      const image = getTeamMemberImageUrl(member.image);
      if (!name || !role || !image) return [];

      return [{
        id: member._key || `${name}-${index}`,
        name,
        role,
        image,
        altText: member.altText?.trim() || `${name}, ${role}`,
      }];
    });

    return {
      isVisible: section.isVisible !== false,
      heading: section.heading?.trim() || fallbackAboutTeamSection.heading,
      members,
    };
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Unable to load the About team section from Sanity.", error);
    }
    return fallbackAboutTeamSection;
  }
}
