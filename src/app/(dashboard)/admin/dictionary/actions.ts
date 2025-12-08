/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "@/lib/supabase/server";
import { DictionaryFormState } from "@/types/dictionary";
import { dictionarySchema } from "@/validations/dictionary-validation";

export type LanguageSelectItem = {
  value: string;
  label: string;
};

export async function getLanguages(): Promise<LanguageSelectItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("languages")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching languages:", error.message);
    return [];
  }

  return data.map((category) => ({
    value: category.id,
    label: category.name,
  }));
}

export async function createDictionary(
  prevState: DictionaryFormState,
  formData: FormData
) {
  const languageId = formData.get("language_id");

  const validatedFields = dictionarySchema.safeParse({
    word: formData.get("word"),
    meaning: formData.get("meaning"),
    synonym: formData.get("synonym"),
    pronunciation: formData.get("pronunciation"),
    language_id: languageId,
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

  const { error } = await supabase.from("dictionary").insert({
    word: validatedFields.data.word,
    meaning: validatedFields.data.meaning,
    synonym: validatedFields.data.synonym,
    pronunciation: validatedFields.data.pronunciation,
    language_id: languageId,
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

export async function updateDictionary(
  prevState: DictionaryFormState,
  formData: FormData
) {
  const languageId = formData.get("language_id");
  const id = formData.get("id") as string;

  const validatedFields = dictionarySchema.safeParse({
    word: formData.get("word"),
    meaning: formData.get("meaning"),
    synonym: formData.get("synonym"),
    pronunciation: formData.get("pronunciation"),
    language_id: languageId,
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: { ...validatedFields.error.flatten().fieldErrors, _form: [] },
    };
  }

  const supabase = await createClient();

  const updatePayload: any = {
    word: validatedFields.data.word,
    meaning: validatedFields.data.meaning,
    synonym: validatedFields.data.synonym,
    pronunciation: validatedFields.data.pronunciation,
    language_id: languageId,
  };

  const { error } = await supabase
    .from("dictionary")
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

export async function deleteDictionary(
  prevState: DictionaryFormState,
  formData: FormData
) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  const { error } = await supabase.from("dictionary").delete().eq("id", id);

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
