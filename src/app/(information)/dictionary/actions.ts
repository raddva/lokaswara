"use server";

import { DictionaryItem } from "@/constants/dictionary-constant";
import { createClient } from "@/lib/supabase/server";

export async function getDictionary(): Promise<DictionaryItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dictionary")
    .select(
      `
      id,
      word,
      meaning,
      synonym,
      pronunciation,
      language_id,
      created_at,
      created_by
    `
    )
    .order("word", { ascending: true });

  if (error) {
    console.error("Error fetching dictionary:", error.message);
    return [];
  }

  return data ?? [];
}

/**
 * Ambil 1 kata berdasarkan word (slug-style)
 */
export async function getDictionaryByWord(
  word: string
): Promise<DictionaryItem | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("dictionary")
    .select(
      `
      id,
      word,
      meaning,
      synonym,
      pronunciation,
      language_id,
      created_at,
      created_by
    `
    )
    .eq("word", word)
    .maybeSingle();

  if (error) {
    console.error("Error fetching dictionary by word:", error.message);
    return null;
  }

  return data;
}
