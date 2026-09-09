import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { ...pageMetadata("/privacy", "Privacy Policy | Benicio Homes", "Privacy policy for the Benicio Homes."), robots: { index: false, follow: true } };

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" />;
}
