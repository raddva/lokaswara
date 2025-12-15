"use server";

import { createClient } from "@/lib/supabase/server";

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

export async function getCategories(): Promise<CategoryItem[]> {
  const supabase = await createClient();

  const allowedCategories = ["Makanan", "Kebudayaan", "Tradisi", "Seni"];

  const { data, error } = await supabase
    .from("content_categories")
    .select("id, name, slug, description")
    .in("name", allowedCategories)
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return data;
}
