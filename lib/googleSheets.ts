export type ContactSubmission = {
  email: string;
  interestedProject: string;
  location: string;
  message: string;
  name: string;
  phone: string;
  timestamp: string;
};

export type BrochureSubmission = Pick<
  ContactSubmission,
  "email" | "name" | "phone" | "timestamp"
>;

type AppsScriptResponse = {
  error?: string;
  ok?: boolean;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

async function postToAppsScript(
  urlEnvironmentVariable: string,
  secretEnvironmentVariable: string,
  submission: ContactSubmission | BrochureSubmission,
) {
  const endpoint = requiredEnv(urlEnvironmentVariable);
  const secret = requiredEnv(secretEnvironmentVariable);
  const response = await fetch(endpoint, {
    body: JSON.stringify({ ...submission, secret }),
    cache: "no-store",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    method: "POST",
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script returned HTTP ${response.status}.`);
  }

  const result = (await response.json()) as AppsScriptResponse;

  if (!result.ok) {
    throw new Error(result.error || "Unable to save the form submission.");
  }
}

export function appendContactSubmission(submission: ContactSubmission) {
  return postToAppsScript(
    "CONTACT_APPS_SCRIPT_URL",
    "CONTACT_APPS_SCRIPT_SECRET",
    submission,
  );
}

export function appendBrochureSubmission(submission: BrochureSubmission) {
  return postToAppsScript(
    "BROCHURE_APPS_SCRIPT_URL",
    "BROCHURE_APPS_SCRIPT_SECRET",
    submission,
  );
}
