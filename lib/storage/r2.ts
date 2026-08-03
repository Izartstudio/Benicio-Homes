import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

const ALLOWED_IMAGE_TYPES = {
  "image/avif": "avif",
  "image/gif": "gif",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
} as const;

const DEFAULT_MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024;
const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";

type ImageMimeType = keyof typeof ALLOWED_IMAGE_TYPES;

type R2Config = {
  accountId: string;
  accessKeyId: string;
  bucketName: string;
  publicUrl: string;
  secretAccessKey: string;
};

export type UploadImageOptions = {
  cacheControl?: string;
  file: File;
  folder: string;
  maxBytes?: number;
};

export type UploadedImage = {
  contentType: ImageMimeType;
  key: string;
  size: number;
  url: string;
};

export class StorageError extends Error {
  constructor(
    message: string,
    public readonly code:
      | "FILE_TOO_LARGE"
      | "INVALID_FILE"
      | "INVALID_FOLDER"
      | "INVALID_OBJECT_KEY"
      | "STORAGE_NOT_CONFIGURED"
      | "STORAGE_OPERATION_FAILED",
    public readonly status: number,
  ) {
    super(message);
    this.name = "StorageError";
  }
}

let r2Client: S3Client | undefined;

function getRequiredEnvironmentVariable(name: keyof NodeJS.ProcessEnv) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new StorageError(
      `Storage is not configured: ${name} is missing.`,
      "STORAGE_NOT_CONFIGURED",
      503,
    );
  }

  return value;
}

function getR2Config(): R2Config {
  const publicUrl = getRequiredEnvironmentVariable("R2_PUBLIC_URL");

  try {
    new URL(publicUrl);
  } catch {
    throw new StorageError(
      "Storage is not configured: R2_PUBLIC_URL must be an absolute URL.",
      "STORAGE_NOT_CONFIGURED",
      503,
    );
  }

  return {
    accountId: getRequiredEnvironmentVariable("R2_ACCOUNT_ID"),
    accessKeyId: getRequiredEnvironmentVariable("R2_ACCESS_KEY_ID"),
    bucketName: getRequiredEnvironmentVariable("R2_BUCKET_NAME"),
    publicUrl,
    secretAccessKey: getRequiredEnvironmentVariable("R2_SECRET_ACCESS_KEY"),
  };
}

function getR2Client(config: R2Config) {
  if (!r2Client) {
    r2Client = new S3Client({
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      region: "auto",
    });
  }

  return r2Client;
}

function normalizeFolder(folder: string) {
  const normalizedFolder = folder.trim().replace(/^\/+|\/+$/g, "");

  if (
    !normalizedFolder ||
    normalizedFolder.length > 160 ||
    !/^[a-zA-Z0-9][a-zA-Z0-9/_-]*$/.test(normalizedFolder) ||
    normalizedFolder.split("/").some((segment) => !segment || segment === "." || segment === "..")
  ) {
    throw new StorageError(
      "The upload folder must be a valid relative path.",
      "INVALID_FOLDER",
      400,
    );
  }

  return normalizedFolder;
}

function normalizeObjectKey(key: string) {
  const normalizedKey = key.trim().replace(/^\/+/, "");

  if (
    !normalizedKey ||
    normalizedKey.length > 1024 ||
    normalizedKey.includes("\\") ||
    normalizedKey.split("/").some((segment) => !segment || segment === "." || segment === "..")
  ) {
    throw new StorageError(
      "The object key must be a valid relative path.",
      "INVALID_OBJECT_KEY",
      400,
    );
  }

  return normalizedKey;
}

function getImageMimeType(file: File): ImageMimeType {
  const contentType = file.type.toLowerCase() as ImageMimeType;

  if (!(contentType in ALLOWED_IMAGE_TYPES)) {
    throw new StorageError(
      "Only AVIF, GIF, JPEG, PNG, and WebP images are supported.",
      "INVALID_FILE",
      415,
    );
  }

  return contentType;
}

export function validateImageFile(
  file: File,
  maxBytes = DEFAULT_MAX_IMAGE_SIZE_BYTES,
) {
  if (file.size === 0) {
    throw new StorageError("The uploaded file is empty.", "INVALID_FILE", 400);
  }

  if (file.size > maxBytes) {
    throw new StorageError(
      `Image uploads must be ${Math.floor(maxBytes / 1024 / 1024)} MB or smaller.`,
      "FILE_TOO_LARGE",
      413,
    );
  }

  return getImageMimeType(file);
}

export function getPublicUrl(key: string) {
  const config = getR2Config();
  const normalizedKey = normalizeObjectKey(key);
  const encodedKey = normalizedKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${config.publicUrl.replace(/\/$/, "")}/${encodedKey}`;
}

export async function uploadImage({
  cacheControl = IMMUTABLE_CACHE_CONTROL,
  file,
  folder,
  maxBytes = DEFAULT_MAX_IMAGE_SIZE_BYTES,
}: UploadImageOptions): Promise<UploadedImage> {
  const contentType = validateImageFile(file, maxBytes);
  const config = getR2Config();
  const key = `${normalizeFolder(folder)}/${crypto.randomUUID()}.${ALLOWED_IMAGE_TYPES[contentType]}`;

  try {
    await getR2Client(config).send(
      new PutObjectCommand({
        Body: Buffer.from(await file.arrayBuffer()),
        Bucket: config.bucketName,
        CacheControl: cacheControl,
        ContentType: contentType,
        Key: key,
      }),
    );
  } catch (error) {
    console.error("R2 image upload failed:", error);
    throw new StorageError(
      "The image could not be stored. Check the R2 bucket and credentials.",
      "STORAGE_OPERATION_FAILED",
      502,
    );
  }

  return {
    contentType,
    key,
    size: file.size,
    url: getPublicUrl(key),
  };
}

export async function deleteObject(key: string) {
  const config = getR2Config();
  const normalizedKey = normalizeObjectKey(key);

  try {
    await getR2Client(config).send(
      new DeleteObjectCommand({
        Bucket: config.bucketName,
        Key: normalizedKey,
      }),
    );
  } catch (error) {
    console.error("R2 object deletion failed:", error);
    throw new StorageError(
      "The stored object could not be deleted. Check the R2 bucket and credentials.",
      "STORAGE_OPERATION_FAILED",
      502,
    );
  }
}
