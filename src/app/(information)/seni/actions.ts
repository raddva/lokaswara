"use server";

import { createClient } from "@/lib/supabase/server";

export type ContentT = {
  id: string;
  title: string;
  slug: string;
  body: string;
  featured_image_url: string;
  category_id: string;
  publish_status: string;
  created_at: string;
  videos?: { id: string; youtube_url?: string }[];
};

export async function getContentByCategory(
  categoryName: string
): Promise<ContentT[]> {
  const supabase = await createClient();

  const { data: category, error: categoryError } = await supabase
    .from("content_categories")
    .select("id")
    .eq("name", categoryName)
    .single();

  if (categoryError || !category) {
    console.error(
      `Category "${categoryName}" not found:`,
      categoryError?.message
    );
    return [];
  }

  const { data, error } = await supabase
    .from("content")
    .select(
      `
      *,
      videos(youtube_url)
    `
    )
    .eq("category_id", category.id)
    .eq("publish_status", "published")
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching "${categoryName}" content:`, error.message);
    return [];
  }

  return data as ContentT[];
}

export async function getTari(): Promise<ContentT[]> {
  return await getContentByCategory("Tari");
}

export async function getMusik(): Promise<ContentT[]> {
  return await getContentByCategory("Musik");
}
