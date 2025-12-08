import z from "zod";

export const contentFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  body: z.string().min(1, "Body is required"),
  category_id: z.string().min(1, "Category is required"),
  featured_image_url: z
    .string()
    .url("Featured image must be a valid URL")
    .optional(),
  publish_status: z.enum(["draft", "published", "archived"]),
});

export const contentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  body: z.string(),
  category_id: z.string(),
  featured_image_url: z.string().url().optional(),
  publish_status: z.enum(["draft", "published", "archived"]),
});

export type ContentForm = z.infer<typeof contentFormSchema>;
export type Content = z.infer<typeof contentSchema> & { id: string };
