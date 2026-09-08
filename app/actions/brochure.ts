"use server";

import { appendBrochureSubmission } from "@/lib/googleSheets";
import { getBrochure } from "@/lib/brochures";

export type BrochureFormErrors = Partial<
  Record<"email" | "name" | "phone", string>
>;

export type BrochureFormState = {
  submissionId?: string;
  errors?: BrochureFormErrors;
  message?: string;
  status: "error" | "idle" | "success";
};

function getField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitBrochureForm(
  _previousState: BrochureFormState,
  formData: FormData,
): Promise<BrochureFormState> {
  const name = getField(formData, "name");
  const phone = getField(formData, "phone");
  const email = getField(formData, "email");
  const projectSlug = getField(formData, "projectSlug");
  const brochure = getBrochure(projectSlug);
  const errors: BrochureFormErrors = {};

  if (!name) errors.name = "Name is required.";
  if (!phone) errors.phone = "Phone number is required.";
  if (!email) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (Object.keys(errors).length) {
    return {
      errors,
      message: "Please check the highlighted fields.",
      status: "error",
    };
  }

  if (!brochure || !("pdfPath" in brochure)) {
    return {
      message: "This project brochure is not available for download.",
      status: "error",
    };
  }

  try {
    await appendBrochureSubmission({
      downloadedBrochure: `${brochure.projectName} brochure`,
      email,
      name,
      phone,
      projectName: brochure.projectName,
      timestamp: new Date().toISOString(),
    });

    return {
      message: "Thank you. Your brochure request has been received.",
      status: "success",
      submissionId: crypto.randomUUID(),
    };
  } catch (error) {
    console.error("Brochure form submission failed:", error);
    return {
      message: "Something went wrong. Please try again.",
      status: "error",
    };
  }
}
