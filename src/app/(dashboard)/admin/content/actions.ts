/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteFile, uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { ContentFormState } from "@/types/content";
import { contentSchema } from "@/validations/content-validation";

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

export async function createContent(
  prevState: ContentFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const rawFeaturedImage = formData.get("featured_image_url");

  const validatedFields = contentSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    body: formData.get("body"),
    category_id: categoryId,
    featured_image_url: undefined,
    publish_status: formData.get("publish_status"),
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
      "content",
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

  const { error } = await supabase.from("content").insert({
    title: validatedFields.data.title,
    slug: validatedFields.data.slug,
    body: validatedFields.data.body,
    category_id: categoryId,
    featured_image_url: finalImageUrl,
    publish_status: validatedFields.data.publish_status,
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

export async function updateContent(
  prevState: ContentFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const id = formData.get("id") as string;
  const rawFeaturedImage = formData.get("featured_image_url");

  const validatedFields = contentSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    body: formData.get("body"),
    category_id: categoryId,
    featured_image_url: undefined,
    publish_status: formData.get("publish_status"),
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
    slug: validatedFields.data.slug,
    body: validatedFields.data.body,
    category_id: categoryId,
    publish_status: validatedFields.data.publish_status,
  };

  if (rawFeaturedImage instanceof File && rawFeaturedImage.size > 0) {
    let prevPublicId = undefined;

    const { data: currentContent } = await supabase
      .from("content")
      .select("featured_image_url")
      .eq("id", id)
      .single();

    if (currentContent?.featured_image_url) {
      const matches = currentContent.featured_image_url.match(
        /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/
      );
      if (matches) prevPublicId = matches[1];
    }

    const { errors, data } = await uploadFile(
      "images",
      "content",
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

    updatePayload.featured_image_url = data.url;
  }

  const { error } = await supabase
    .from("content")
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

export async function deleteContent(
  prevState: ContentFormState,
  formData: FormData
) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  const imageUrl = formData.get("featured_image_url") as string;

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

  const { error } = await supabase.from("content").delete().eq("id", id);

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
