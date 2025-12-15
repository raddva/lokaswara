"use server";

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
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

const emptyFeedbackState: FeedbacksFormState = {
  status: "error",
  errors: {
    content_type: [],
    subject: [],
    body: [],
    user_email: [],
    status: [],
    submission_date: [],
    _form: [],
  },
};

async function createFeedback(
  prevState: FeedbacksFormState,
  formData: FormData
) {
  const subject = formData.get("subject")?.toString() || "Feedback";

  const validatedFields = feedbacksFormSchema.safeParse({
    subject,
    body: formData.get("body")?.toString() || "",
    user_email: formData.get("user_email")?.toString() || "",
    status: "waiting",
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
      errors: { ...prevState.errors, _form: [result.error.message] },
    };
  }

  return { status: "success", errors: prevState.errors };
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const res = await createFeedback(emptyFeedbackState, formData);
  return NextResponse.json(res);
}
