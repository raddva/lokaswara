import { updateSession } from "@/lib/supabase/middleware";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return updateSession(request);
}
