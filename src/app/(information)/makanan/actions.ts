"use server";
import { createClient } from "@/lib/supabase/server";

export type FoodsItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  ingredients: string;
  tutorial: string;
};

export async function getFoods(): Promise<FoodsItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, slug, image_url, description, ingredients, tutorial")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching foods:", error.message);
    return [];
  }

  return data;
}

export async function getFoodBySlug(slug: string): Promise<FoodsItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, slug, description, ingredients, tutorial, image_url")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error fetching food by slug:", error.message);
    return null;
  }
  console.log("slug:", slug, "data:", data);

  return data;
}
