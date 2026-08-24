"use server";

import { appendContactSubmission } from "@/lib/googleSheets";

export type ContactFormErrors = Partial<
  Record<
    | "email"
    | "interestedProject"
    | "location"
    | "message"
    | "name"
    | "phone",
    string
  >
>;

export type ContactFormState = {
  errors?: ContactFormErrors;
  message?: string;
  status: "error" | "idle" | "success";
};

function getField(formData: FormData, name: string) {
  const value = formData.get(name);

  return typeof value === "string" ? value.trim() : "";
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = getField(formData, "name");
  const phone = getField(formData, "phone");
  const email = getField(formData, "email");
  const location = getField(formData, "location");
  const interestedProject = getField(formData, "interestedProject");
  const message = getField(formData, "message");
  const errors: ContactFormErrors = {};

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!phone) {
    errors.phone = "Phone number is required.";
  }

  if (!email) {
    errors.email = "Email address is required.";
  } else if (!validateEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: "Please check the highlighted fields.",
      status: "error",
    };
  }

  try {
    await appendContactSubmission({
      email,
      interestedProject,
      location,
      message,
      name,
      phone,
      timestamp: new Date().toISOString(),
    });

    return {
      message: "Thank you. Your enquiry has been sent.",
      status: "success",
    };
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return {
      message: "Something went wrong. Please try again.",
      status: "error",
    };
  }
}
