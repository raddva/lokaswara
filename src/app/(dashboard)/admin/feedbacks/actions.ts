"use server";

import { createClient } from "@/lib/supabase/server";
import { FormState } from "@/types/general";
import { feedbacksFormSchema } from "@/validations/feedbacks-validation";

type FeedbacksFormState = FormState & {
  errors: {
    content_type: string[];
    subject: string[];
    body: string[];
    user_email: string[];
    status: string[];
    submission_date: string[];
    _form: string[];
  };
};

export async function createFeedback(
  prevState: FeedbacksFormState,
  formData: FormData
): Promise<FeedbacksFormState> {
  const validatedFields = feedbacksFormSchema.safeParse({
    subject: formData.get("subject"),
    content_type: formData.get("content_type"),
    body: formData.get("body"),
    user_email: formData.get("user_email"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        ...validatedFields.error.flatten().fieldErrors,
        _form: [],
      },
    };
  }

  const supabase = await createClient();

  const result = await supabase.from("feedbacks").insert({
    subject: validatedFields.data.subject,
    body: validatedFields.data.body,
    user_email: validatedFields.data.user_email,
    status: "waiting",
    submission_date: new Date().toISOString(),
  });

  if (result.error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [result.error.message],
      },
    };
  }

  return {
    status: "success",
    errors: prevState.errors,
  };
}

export async function updateFeedbackStatus(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id");
  const status = formData.get("status");
  const reviewerId = formData.get("reviewer_id");

  if (typeof id !== "string" || typeof status !== "string" || !reviewerId) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: ["Missing required fields: id, status, or reviewer_id."],
      },
    };
  }

  const supabase = await createClient();
  const updatePayload: { status: string; reviewed_by: string | null } = {
    status,
    reviewed_by: reviewerId as string,
  };

  const { error } = await supabase
    .from("feedbacks")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return {
      status: "error",
      errors: {
        ...prevState.errors,
        _form: [error.message],
      },
    };
  }

  return {
    status: "success",
  };
}
