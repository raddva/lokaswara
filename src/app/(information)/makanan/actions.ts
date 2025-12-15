"use server";

import { createClient } from "@/lib/supabase/server";

export type FoodsItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
};

export async function getFoods(): Promise<FoodsItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("foods")
    .select("id, name, slug, image_url, description")
    .order("name", { ascending: true });

  if (error) {
    console.error("Error fetching foods:", error.message);
    return [];
  }

  return data;
}
