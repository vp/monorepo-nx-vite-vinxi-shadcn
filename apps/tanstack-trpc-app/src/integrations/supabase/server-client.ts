import { parseCookies } from '@tanstack/react-start/server';
import { createServerClient } from '@supabase/ssr';

let supabaseClient: ReturnType<typeof createServerClient> | null = null;
let bufferedCookies: { name: string; value: string }[] = [];


/**
 * Creates a Supabase server client instance.
 * This function initializes the Supabase client with the provided URL and anonymous key.
 * It also sets up cookie handling for server-side rendering.
 *
 * @returns {Promise<ReturnType<typeof createServerClient>>} A promise that resolves to the Supabase client instance.
 */
export async function getSupabaseServerClient(): Promise<ReturnType<typeof createServerClient>> {
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

/**
 * Flushes buffered cookies to the response.
 * This function is used to send cookies that were buffered during the request.
 * It iterates over the buffered cookies and sets them using the provided setCookie function.
 * After flushing, it clears the buffer to prevent duplicate setting of cookies.
 *
 * @param setCookieFn - A function to set cookies. It takes a cookie name and value as arguments.
 * This function is typically used to set cookies in the response headers.
 */
export function flushBufferedCookies(
  setCookieFn: (name: string, value: string) => void
) {
  bufferedCookies.forEach((cookie) => {
    setCookieFn(cookie.name, cookie.value);
  });
  bufferedCookies = []; // Clear the buffer after flushing
}
