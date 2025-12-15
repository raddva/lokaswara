"use server";

import { createClient } from "@/lib/supabase/server";

export type Profiles = {
  id: string;
  title: string;
  image_url: string;
  description: string;
};

export async function getProfiles(): Promise<Profiles[]> {
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("content_categories")
    .select("id")
    .eq("name", "Anggota Kelompok")
    .single();

  if (categoryError || !category) {
    console.error("Category not found:", categoryError?.message);
    return [];
  }

  const { data, error } = await supabase
    .from("images")
    .select("id, title, image_url, description")
    .eq("category_id", category.id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching profiles:", error.message);
    return [];
  }

  return data as Profiles[];
}
