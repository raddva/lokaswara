"use server";

import { createClient } from "@/lib/supabase/server";
import { CategoryFormState } from "@/types/category";
import { categorySchema } from "@/validations/category-validation";

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

export async function createCategory(
  prevState: CategoryFormState,
  formData: FormData
) {
  const rawParentId = formData.get("parent_id");
  const parentId =
    rawParentId === "" || rawParentId === "null" ? null : rawParentId;

  const validatedFields = categorySchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    slug: formData.get("slug"),
    parent_id: parentId,
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

  const supabase = await createClient();

  const { error } = await supabase.from("content_categories").insert({
    name: validatedFields.data.name,
    slug: validatedFields.data.slug,
    description: validatedFields.data.description,
    parent_id: parentId,
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

export async function updateCategory(
  prevState: CategoryFormState,
  formData: FormData
) {
  const rawParentId = formData.get("parent_id");
  const parentId =
    rawParentId === "" || rawParentId === "null" ? null : rawParentId;

  const validatedFields = categorySchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    description: formData.get("description"),
    parent_id: parentId,
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

  const supabase = await createClient();

  const { error } = await supabase
    .from("content_categories")
    .update({
      name: validatedFields.data.name,
      slug: validatedFields.data.slug,
      description: validatedFields.data.description,
      parent_id: parentId,
    })
    .eq("id", formData.get("id"));

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

export async function deleteCategory(
  prevState: CategoryFormState,
  formData: FormData
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("content_categories")
    .delete()
    .eq("id", formData.get("id"));

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
