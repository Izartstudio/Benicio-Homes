import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Benicio Homes",
  description: "Privacy policy for the Benicio Homes.",
};

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
