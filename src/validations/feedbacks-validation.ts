import z from "zod";

export const feedbacksFormSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  body: z.string().min(1, "Body is required"),
  user_email: z.string(),
  status: z.string().min(1, "Select a status"),
});

export type FeedbacksForm = z.infer<typeof feedbacksFormSchema>;
