"use server";

import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { FormState } from "@/types/general";
import { contentRequestFormSchema } from "@/validations/content-request-validation";

type ContentRequestFormState = FormState & {
  errors: {
    content_type: string[];
    subject: string[];
    body: string[];
    user_email: string[];
    status: string[];
    request_date: string[];
    _form: string[];
  };
};

const emptyContentState: ContentRequestFormState = {
  status: "error",
  errors: {
    content_type: [],
    subject: [],
    body: [],
    user_email: [],
    status: [],
    request_date: [],
    _form: [],
  },
};

async function createContentRequest(
  prevState: ContentRequestFormState,
  formData: FormData
) {
  const subject = formData.get("subject")?.toString() || "Konten Baru";
  const content_type = formData.get("content_type")?.toString() || "artikel";

  const validatedFields = contentRequestFormSchema.safeParse({
    subject,
    content_type,
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
  const result = await supabase.from("content_requests").insert({
    content_type: validatedFields.data.content_type,
    subject: validatedFields.data.subject,
    body: validatedFields.data.body,
    user_email: validatedFields.data.user_email,
    status: "waiting",
    request_date: new Date().toISOString(),
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
  const res = await createContentRequest(emptyContentState, formData);
  return NextResponse.json(res);
}
