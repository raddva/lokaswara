import z from "zod";

export const contentRequestFormSchema = z.object({
  content_type: z.string().min(1, "Content Type is required"),
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  user_email: z.string().min(1, "User Email is required"),
  status: z.string().min(1, "Select a status"),
});

export type ContentRequestForm = z.infer<typeof contentRequestFormSchema>;
