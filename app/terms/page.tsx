import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions | Benicio Homes",
  description: "Terms and conditions for the Benicio Homes.",
};

export default function TermsPage() {
  return <LegalPage title="Terms & Conditions" />;
}
