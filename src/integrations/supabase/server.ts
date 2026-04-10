/**
 * Supabase client untuk Server Components (Cloudflare Edge compatible)
 * Menggunakan @supabase/ssr dengan Web Fetch API
 */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "placeholder";

  return createSupabaseClient<Database>(url, key, {
    auth: {
      persistSession: false,      // server component tidak perlu session
      autoRefreshToken: false,    // tidak perlu refresh di server
    },
    global: {
      fetch: fetch,               // gunakan Web Fetch API (Cloudflare compatible)
    },
  });
}
