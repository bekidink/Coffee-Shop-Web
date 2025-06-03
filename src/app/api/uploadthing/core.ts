import {
  createUploadthing,
  type FileRouter,
  
} from "uploadthing/next";
import { type NextRequest } from "next/server";

const f = createUploadthing();

// Define the shape of the metadata (if any) and the return type for onUploadComplete
interface UploadMetadata {
  // Add metadata fields if used (e.g., userId: string)
  [key: string]: any;
}

interface UploadResponse {
  uploadedBy: string;
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter: FileRouter = {
  imageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "bb" } satisfies UploadResponse;
    }
  ),

  productImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "bb" } satisfies UploadResponse;
    }
  ),

  communityImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "bb" } satisfies UploadResponse;
    }
  ),

  farmerImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "bb" } satisfies UploadResponse;
    }
  ),

  customerImageUploader: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    ({ metadata, file }) => {
      console.log("file url", file.url, metadata);
      return { uploadedBy: "bb" } satisfies UploadResponse;
    }
  ),

  multiProductsUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 4 },
  }).onUploadComplete(({ metadata, file }) => {
    console.log("file url", file.url, metadata);
    return { uploadedBy: "bb" } satisfies UploadResponse;
  }),
};

export type OurFileRouter = typeof ourFileRouter;
