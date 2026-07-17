type ResendEmailResponse = {
  message?: string;
  name?: string;
};

const notificationBody = `You have received a new enquiry from the Benicio website.

A new submission has been added to your Google Sheet.

Please review the sheet for the complete details.`;

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

export async function sendContactNotification() {
  const apiKey = requiredEnv("RESEND_API_KEY");
  const recipient = requiredEnv("CONTACT_NOTIFICATION_EMAIL");
  const from = process.env.CONTACT_FROM_EMAIL || "Benicio Website <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from,
      subject: "New Benicio Website Submission",
      text: notificationBody,
      to: [recipient],
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as
      | ResendEmailResponse
      | null;

    throw new Error(
      error?.message || error?.name || "Unable to send contact notification.",
    );
  }
}
