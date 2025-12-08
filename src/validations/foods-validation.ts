import z from "zod";

export const foodsFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image_url: z.string().url("Image must be a valid URL").optional(),
  ingredients: z.string().min(1, "Ingredients is required"),
  tutorial: z.string().min(1, "Tutorial is required"),
  category_id: z.string().min(1, "Category is required"),
});

export const foodsSchema = z.object({
  name: z.string(),
  image_url: z.string().url().optional(),
  ingredients: z.string(),
  tutorial: z.string(),
  category_id: z.string(),
});

export type FoodsForm = z.infer<typeof foodsFormSchema>;
export type Foods = z.infer<typeof foodsSchema> & { id: string };
