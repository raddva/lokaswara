/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/lib/supabase/server";
import { VideosFormState } from "@/types/videos";
import { videosSchema } from "@/validations/videos-validation";

export type LanguageSelectItem = {
  value: string;
  label: string;
};

export type ContentSelectItem = {
  value: string;
  label: string;
};

export async function getLanguages(): Promise<LanguageSelectItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("languages")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) return [];

  return data.map((lang) => ({
    value: lang.id,
    label: lang.name,
  }));
}

export async function getContents(): Promise<ContentSelectItem[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("content")
    .select("id, title")
    .order("title", { ascending: true });

  if (error) return [];

  return data.map((content) => ({
    value: content.id,
    label: content.title,
  }));
}

export async function createVideos(
  prevState: VideosFormState,
  formData: FormData
) {
  const languageId = formData.get("language_id");

  const validatedFields = videosSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    youtube_url: formData.get("youtube_url"),
    language_id: languageId,
    content_id: formData.get("content_id"),
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

  const { error } = await supabase.from("videos").insert({
    title: validatedFields.data.title,
    description: validatedFields.data.description,
    youtube_url: validatedFields.data.youtube_url,
    language_id: languageId,
    content_id: validatedFields.data.content_id,
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

export async function updateVideos(
  prevState: VideosFormState,
  formData: FormData
) {
  const languageId = formData.get("language_id");
  const id = formData.get("id") as string;

  const validatedFields = videosSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    youtube_url: formData.get("youtube_url"),
    language_id: languageId,
    content_id: formData.get("content_id"),
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
    description: validatedFields.data.description,
    youtube_url: validatedFields.data.youtube_url,
    language_id: languageId,
    content_id: validatedFields.data.content_id,
    publish_status: validatedFields.data.publish_status,
  };

  const { error } = await supabase
    .from("videos")
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

export async function deleteVideos(
  prevState: VideosFormState,
  formData: FormData
) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("videos").delete().eq("id", id);

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
