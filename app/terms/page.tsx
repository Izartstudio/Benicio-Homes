import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = { ...pageMetadata("/terms", "Terms and Conditions | Benicio Homes", "Terms and conditions for the Benicio Homes."), robots: { index: false, follow: true } };

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" />;
}
