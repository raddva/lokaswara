import z from "zod";

export const videosFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  youtube_url: z.string().min(1, "Link to Video is required"),
  language_id: z.string().min(1, "Language is required"),
  content_id: z.string().min(1, "Content is required"),
  publish_status: z.enum(["draft", "published", "archived"]),
});

export const videosSchema = z.object({
  title: z.string(),
  description: z.string(),
  youtube_url: z.string(),
  language_id: z.string(),
  content_id: z.string(),
  publish_status: z.enum(["draft", "published", "archived"]),
});

export type VideosForm = z.infer<typeof videosFormSchema>;
export type Videos = z.infer<typeof videosSchema> & { id: string };
