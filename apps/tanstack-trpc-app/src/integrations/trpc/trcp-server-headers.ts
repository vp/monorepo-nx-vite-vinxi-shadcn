import { getRequestHeader } from '@tanstack/react-start/server';

export const getTrpcServerHeaders = () => process.env.COOKIE_HEADER || getRequestHeader('Cookie');
