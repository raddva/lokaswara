/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { v2 as cloudinary, UploadApiOptions } from "cloudinary";
import { environment } from "@/configs/environment";

cloudinary.config({
  cloud_name: environment.CLOUDINARY_CLOUD_NAME,
  api_key: environment.CLOUDINARY_API_KEY,
  api_secret: environment.CLOUDINARY_API_SECRET,
  secure: true,
});

async function fileToDataUri(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  return `data:${file.type};base64,${base64}`;
}

export async function uploadFile(
  folder: string,
  path: string,
  file: File,
  prevPublicId?: string
) {
  const fileUri = await fileToDataUri(file);
  const fileName = file.name.replace(/[^a-zA-Z0-9-.]/g, "_");
  const uniqueIdentifier = Date.now();
  const newPublicId = `${folder}/${uniqueIdentifier}-${fileName}`;

  if (prevPublicId) {
    try {
      await cloudinary.uploader.destroy(prevPublicId);
    } catch (error) {
      console.error("Cloudinary deletion error:", error);
    }
  }

  try {
    const uploadOptions: UploadApiOptions = {
      public_id: newPublicId,
      overwrite: true,
    };

    const result = await cloudinary.uploader.upload(fileUri, uploadOptions);

    return {
      status: "success",
      data: {
        url: result.secure_url,
        path: result.public_id,
      },
    };
  } catch (error: any) {
    return {
      status: "error",
      errors: {
        _form: [error.message || "Cloudinary upload failed"],
      },
    };
  }
}

export async function deleteFile(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "not found" || result.result === "ok") {
      return {
        status: "success",
      };
    } else {
      return {
        status: "error",
        errors: {
          _form: [
            `Failed to delete file. Cloudinary response: ${result.result}`,
          ],
        },
      };
    }
  } catch (error: any) {
    return {
      status: "error",
      errors: {
        _form: [error.message || "Cloudinary deletion failed"],
      },
    };
  }
}
