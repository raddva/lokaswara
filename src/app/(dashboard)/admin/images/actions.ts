/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteFile, uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { ImagesFormState } from "@/types/images";
import { imagesSchema } from "@/validations/image-validation";

export type CategorySelectItem = {
  value: string;
  label: string;
};

export async function getCategoriesForSelect(): Promise<CategorySelectItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_categories")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories for select:", error.message);
    return [];
  }

  return data.map((category) => ({
    value: category.id,
    label: category.name,
  }));
}

export async function createImages(
  prevState: ImagesFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const rawFeaturedImage = formData.get("image_url");

  const validatedFields = imagesSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    tutorial: formData.get("tutorial"),
    category_id: categoryId,
    image_url: undefined,
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  let finalImageUrl = null;

  if (rawFeaturedImage instanceof File && rawFeaturedImage.size > 0) {
    const { errors, data } = await uploadFile(
      "images",
      "images",
      rawFeaturedImage
    );

    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }
    finalImageUrl = data.url;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      status: "error",
      errors: { ...prevState.errors, _form: ["Authentication required"] },
    };
  }

  const { error } = await supabase.from("images").insert({
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    category_id: categoryId,
    image_url: finalImageUrl,
    created_by: user.id,
  });

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function updateImages(
  prevState: ImagesFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const id = formData.get("id") as string;
  const rawFeaturedImage = formData.get("image_url");

  const validatedFields = imagesSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    tutorial: formData.get("tutorial"),
    category_id: categoryId,
    image_url: undefined,
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: { ...validatedFields.error.flatten().fieldErrors, _form: [] },
    };
  }

  const supabase = await createClient();

  const updatePayload: any = {
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    category_id: categoryId,
  };

  if (rawFeaturedImage instanceof File && rawFeaturedImage.size > 0) {
    let prevPublicId = undefined;

    const { data: currentImages } = await supabase
      .from("images")
      .select("image_url")
      .eq("id", id)
      .single();

    if (currentImages?.image_url) {
      const matches = currentImages.image_url.match(
        /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/
      );
      if (matches) prevPublicId = matches[1];
    }

    const { errors, data } = await uploadFile(
      "images",
      "images",
      rawFeaturedImage,
      prevPublicId
    );

    if (errors) {
      return {
        status: "error",
        errors: {
          ...prevState.errors,
          _form: [...errors._form],
        },
      };
    }

    updatePayload.image_url = data.url;
  }

  const { error } = await supabase
    .from("images")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}

export async function deleteImages(
  prevState: ImagesFormState,
  formData: FormData
) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const imageUrl = formData.get("image_url") as string;

  if (imageUrl) {
    const publicIdMatch = imageUrl.match(
      /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/
    );
    const publicId = publicIdMatch ? publicIdMatch[1] : null;

    if (publicId) {
      const { status, errors } = await deleteFile(publicId);

      if (status === "error") {
        return {
          status: "error",
          errors: {
            ...prevState.errors,
            _form: [errors?._form?.[0] ?? "Failed to delete image"],
          },
        };
      }
    }
  }

  const { error } = await supabase.from("images").delete().eq("id", id);

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return { status: "success" };
}
