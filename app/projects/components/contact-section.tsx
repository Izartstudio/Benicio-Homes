import type { ProjectContactData } from "@/app/projects/data";
import { ContactSection as SharedContactSection } from "@/components/contact/contact-section";

type ContactSectionProps = {
  data: ProjectContactData;
};

export function ContactSection({ data }: ContactSectionProps) {
  return <SharedContactSection copy={data.copy} heading={data.heading} />;
}
