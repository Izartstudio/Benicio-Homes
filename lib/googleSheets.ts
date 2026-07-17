import { createSign } from "node:crypto";

type ContactSubmission = {
  email: string;
  location: string;
  message: string;
  name: string;
  phone: string;
  timestamp: string;
};

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

function requiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name} environment variable.`);
  }

  return value;
}

function base64Url(value: Buffer | string) {
  const buffer = typeof value === "string" ? Buffer.from(value) : value;

  return buffer
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function createGoogleJwt() {
  const serviceAccountEmail = requiredEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  const privateKey = requiredEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
    iss: serviceAccountEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
  };

  const unsignedToken = `${base64Url(JSON.stringify(header))}.${base64Url(
    JSON.stringify(payload),
  )}`;

  const signature = createSign("RSA-SHA256")
    .update(unsignedToken)
    .sign(privateKey);

  return `${unsignedToken}.${base64Url(signature)}`;
}

async function getGoogleAccessToken() {
  const assertion = createGoogleJwt();
  const body = new URLSearchParams({
    assertion,
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
  });

  const response = await fetch("https://oauth2.googleapis.com/token", {
    body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  const data = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        "Unable to authorize Google Sheets request.",
    );
  }

  return data.access_token;
}

export async function appendContactSubmission(submission: ContactSubmission) {
  const sheetId = requiredEnv("GOOGLE_SHEET_ID");
  const range = process.env.GOOGLE_SHEET_RANGE || "Submissions!A:F";
  const accessToken = await getGoogleAccessToken();
  const endpoint = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
      range,
    )}:append`,
  );

  endpoint.searchParams.set("valueInputOption", "USER_ENTERED");
  endpoint.searchParams.set("insertDataOption", "INSERT_ROWS");

  const response = await fetch(endpoint, {
    body: JSON.stringify({
      values: [
        [
          submission.timestamp,
          submission.name,
          submission.phone,
          submission.email,
          submission.location,
          submission.message,
        ],
      ],
    }),
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Unable to append submission to Google Sheet.");
  }
}
