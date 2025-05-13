import { parseCookies, setCookie } from '@tanstack/react-start/server';
import { createServerClient, parseCookieHeader } from '@supabase/ssr';

export default function getSupabaseServerClient(request?: Request) {
  // Use provided cookies or get them from the current request
  const cookies = request
    ? parseCookieHeader(request?.headers.get('cookie') || '').reduce((acc, {name, value}) => ({
      ...acc,
      [name]: value as string, 
    }), {} as Record<string, string>)
    : parseCookies();

  
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return Object.entries(cookies).map(([name, value]) => ({
            name,
            value,
          }));
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            try {
              setCookie(cookie.name, cookie.value);
            } catch (error) {
              const message =
                error instanceof Error ? error.message : String(error);
              if (message.toLowerCase().includes('headers already sent')) {
                console.warn(
                  `Failed to set cookie "${cookie.name}": Headers already sent to client`
                );
                throw error;
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
