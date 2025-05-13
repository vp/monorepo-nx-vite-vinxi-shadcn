import { parseCookies } from '@tanstack/react-start/server';

export const getTrpcServerHeaders = () => process.env.COOKIE_HEADER || getHeaders();


function getHeaders() {
    if (typeof window !== 'undefined') return {};

    const cookies = parseCookies();

    // If cookies is already a string, use it directly
    if (typeof cookies === 'string') {
      return {
        Cookie: cookies,  // Use capital C for Cookie header
      };
    }

    // If cookies is an object, convert to string
    const cookieString = Object.entries(cookies)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ');

    return {
      Cookie: cookieString,  // Use capital C for Cookie header
    };
  }
