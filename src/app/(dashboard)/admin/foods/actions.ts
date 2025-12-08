/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { deleteFile, uploadFile } from "@/actions/storage-action";
import { createClient } from "@/lib/supabase/server";
import { FoodsFormState } from "@/types/foods";
import { foodsSchema } from "@/validations/foods-validation";

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

export async function createFoods(
  prevState: FoodsFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const rawFeaturedImage = formData.get("image_url");

  const validatedFields = foodsSchema.safeParse({
    name: formData.get("name"),
    ingredients: formData.get("ingredients"),
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
      "foods",
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

  const { error } = await supabase.from("foods").insert({
    name: validatedFields.data.name,
    ingredients: validatedFields.data.ingredients,
    tutorial: validatedFields.data.tutorial,
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

export async function updateFoods(
  prevState: FoodsFormState,
  formData: FormData
) {
  const categoryId = formData.get("category_id");
  const id = formData.get("id") as string;
  const rawFeaturedImage = formData.get("image_url");

  const validatedFields = foodsSchema.safeParse({
    name: formData.get("name"),
    ingredients: formData.get("ingredients"),
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
    name: validatedFields.data.name,
    ingredients: validatedFields.data.ingredients,
    tutorial: validatedFields.data.tutorial,
    category_id: categoryId,
  };

  if (rawFeaturedImage instanceof File && rawFeaturedImage.size > 0) {
    let prevPublicId = undefined;

    const { data: currentFoods } = await supabase
      .from("foods")
      .select("image_url")
      .eq("id", id)
      .single();

    if (currentFoods?.image_url) {
      const matches = currentFoods.image_url.match(
        /\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+$/
      );
      if (matches) prevPublicId = matches[1];
    }

    const { errors, data } = await uploadFile(
      "images",
      "foods",
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
    .from("foods")
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

export async function deleteFoods(
  prevState: FoodsFormState,
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

  const { error } = await supabase.from("foods").delete().eq("id", id);

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
