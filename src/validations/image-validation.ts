import z from "zod";

export const imagesFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  image_url: z.string().url("Image must be a valid URL").optional(),
  category_id: z.string().min(1, "Category is required"),
});

export const imagesSchema = z.object({
  title: z.string(),
  description: z.string(),
  image_url: z.string().url().optional(),
  category_id: z.string(),
});

export type ImagesForm = z.infer<typeof imagesFormSchema>;
export type Images = z.infer<typeof imagesSchema> & { id: string };
