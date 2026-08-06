"use server";

import { appendContactSubmission } from "@/lib/googleSheets";
import { sendContactNotification } from "@/lib/resend";

export type BrochureFormErrors = Partial<
  Record<"email" | "name" | "phone", string>
>;

export type BrochureFormState = {
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

  try {
    await appendContactSubmission({
      email,
      interestedProject: "Vanam Villas brochure",
      location: "",
      message: "Brochure download request",
      name,
      phone,
      timestamp: new Date().toISOString(),
    });
    await sendContactNotification();

    return {
      message: "Thank you. Your brochure request has been received.",
      status: "success",
    };
  } catch (error) {
    console.error("Brochure form submission failed:", error);
    return {
      message: "Something went wrong. Please try again.",
      status: "error",
    };
  }
}
