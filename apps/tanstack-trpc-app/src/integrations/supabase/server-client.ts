import { parseCookies, setCookie } from '@tanstack/react-start/server';
import { createServerClient } from '@supabase/ssr';


export default function getSupabaseServerClient() {
  return createServerClient(
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
            try {
              setCookie(cookie.name, cookie.value);
            } catch (error) {
              const message = error instanceof Error ? error.message : String(error);
              if (message.includes('headers already sent') || message.includes('Headers already sent')) {
                console.warn(`Failed to set cookie "${cookie.name}": Headers already sent to client`);
              } else {
                // Re-throw if it's a different error
                throw error;
              }
            }
          });
        },
      },
    }
  );
}