import { parseCookies } from '@tanstack/react-start/server';
import { createServerClient } from '@supabase/ssr';

let supabaseClient: ReturnType<typeof createServerClient> | null = null;
let bufferedCookies: { name: string; value: string }[] = [];

export async function getSupabaseServerClient() {
  if (!supabaseClient) {
    supabaseClient = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return Object.entries(parseCookies()).map(([name, value]) => ({
              name,
              value,
            }));
          },
          setAll(cookies) {
            cookies.forEach((cookie) => {
              // setCookie(cookie.name, cookie.value);
              // Buffer cookies to be set later
              bufferedCookies.push(cookie);
            });
          },
        },
      }
    );
  }
  return supabaseClient;
}

// Export a function to flush buffered cookies
export function flushBufferedCookies(
  setCookieFn: (name: string, value: string) => void
) {
  bufferedCookies.forEach((cookie) => {
    setCookieFn(cookie.name, cookie.value);
  });
  bufferedCookies = []; // Clear the buffer after flushing
}
