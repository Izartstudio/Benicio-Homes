import { NextResponse } from "next/server";

import { StorageError, uploadImage } from "@/lib/storage/r2";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // This route writes directly to the production media bucket. Keep the token
  // server-side and send it only from trusted CMS or administrative tooling.
  const uploadApiToken = process.env.UPLOAD_API_TOKEN?.trim();

  if (!uploadApiToken) {
    return NextResponse.json(
      {
        error: {
          code: "UPLOAD_NOT_CONFIGURED",
          message: "The upload API is not configured.",
        },
      },
      { status: 503 },
    );
  }

  if (request.headers.get("authorization") !== `Bearer ${uploadApiToken}`) {
    return NextResponse.json(
      {
        error: {
          code: "UNAUTHORIZED",
          message: "A valid upload token is required.",
        },
      },
      {
        headers: { "WWW-Authenticate": "Bearer" },
        status: 401,
      },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        { error: { code: "MISSING_FILE", message: "An image file is required." } },
        { status: 400 },
      );
    }

    if (typeof folder !== "string") {
      return NextResponse.json(
        { error: { code: "MISSING_FOLDER", message: "An upload folder is required." } },
        { status: 400 },
      );
    }

    const image = await uploadImage({ file, folder });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    if (error instanceof StorageError) {
      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: error.status },
      );
    }

    if (error instanceof TypeError) {
      return NextResponse.json(
        {
          error: {
            code: "INVALID_MULTIPART_FORM",
            message: "The request must contain multipart form data.",
          },
        },
        { status: 400 },
      );
    }

    console.error("Unexpected upload route failure:", error);

    return NextResponse.json(
      {
        error: {
          code: "UPLOAD_FAILED",
          message: "The upload could not be completed.",
        },
      },
      { status: 500 },
    );
  }
}
