import z from "zod";

export const dictionaryFormSchema = z.object({
  word: z.string().min(1, "Word is required"),
  meaning: z.string().min(1, "Meaning is required"),
  synonym: z.string().min(1, "Synonym is required"),
  pronunciation: z.string().min(1, "Pronunciation is required"),
  language_id: z.string().min(1, "Language is required"),
});

export const dictionarySchema = z.object({
  word: z.string(),
  meaning: z.string(),
  synonym: z.string(),
  pronunciation: z.string(),
  language_id: z.string(),
});

export type DictionaryForm = z.infer<typeof dictionaryFormSchema>;
export type Dictionary = z.infer<typeof dictionarySchema> & { id: string };
