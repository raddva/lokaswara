"use server";

import { createClient } from "@/lib/supabase/server";

export type KebudayaanT = {
  id: string;
  title: string;
  slug: string;
  body: string;
  featured_image_url: string;
};

export async function getKebudayaan(): Promise<KebudayaanT[]> {
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("content_categories")
    .select("id")
    .eq("name", "Kebudayaan")
    .single();

  if (categoryError || !category) {
    console.error("Category not found:", categoryError?.message);
    return [];
  }

  const { data, error } = await supabase
    .from("content")
    .select("*")
    .eq("category_id", category.id)
    .eq("publish_status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching Kebudayaan:", error.message);
    return [];
  }

  return data as KebudayaanT[];
}
