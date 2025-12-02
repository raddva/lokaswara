import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { environment } from "@/configs/environment";

export function createClient() {
  const cookieStore = cookies();
  const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      async getAll() {
        return (await cookieStore).getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(async ({ name, value, options }) =>
          (await cookieStore).set(name, value, options)
        );
      },
    },
  });
}
