"use server";

import { INITIAL_STATE_SIGNIN_FORM } from "@/constants/auth-constant";
import { createClient } from "@/lib/supabase/server";
import { AuthFormState } from "@/types/auth";
import { signinSchemaForm } from "@/validations/auth-validation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(
  prevState: AuthFormState,
  formData: FormData | null
): Promise<AuthFormState> {
  if (!formData) return INITIAL_STATE_SIGNIN_FORM;

  const validated = signinSchemaForm.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      status: "error",
      errors: validated.error.flatten().fieldErrors,
    } as const;
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(
    validated.data
  );

  if (error) {
    return {
      status: "error",
      errors: {
        _form: [error.message],
      },
    } as const;
  }

  const user = data.user;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const cookieStore = cookies();
  (await cookieStore).set("user_profile", JSON.stringify(profile), {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect("/admin");
}
