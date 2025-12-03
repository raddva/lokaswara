import z from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  parent_id: z.string().nullable().optional(),
});

export const categorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  parent_id: z.string().nullable().optional(),
});

export type CategoryForm = z.infer<typeof categoryFormSchema>;
export type Category = z.infer<typeof categorySchema> & { id: string };
