import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import TanstackQueryLayout from '../integrations/tanstack-query/layout';

import appCss from '@workspace/ui/globals.css?url';

import type { QueryClient } from '@tanstack/react-query';

import type { TRPCRouter } from '@/integrations/trpc/router';
import type { TRPCOptionsProxy } from '@trpc/tanstack-react-query';

import { AppLayout } from '@workspace/ui/components/blocks/app-layout';
import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import { AppHeader } from '@workspace/ui/components/blocks/app-header';
import { TopMenu } from '@/components/TopMenu';
import { ModeSwitcher } from '@workspace/ui/components/blocks/mode-switcher';
import { TRPCClient } from '@/integrations/trpc/client';
import { NotFound } from '@/components/NotFound';
import { DefaultCatchBoundary } from '@workspace/tanstack-router/ui/default-catch-boundary';
import { UserNav } from '@/components/UserNav';
import { getUserInfo } from '@/integrations/user/fn/get-user-info';
import { logger } from '@/utils';

interface MyRouterContext {
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
  trpcClient: TRPCClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async ({ context }) => {
    // Use stale-while-revalidate pattern with caching
    const user = await getUserInfo();

    logger.log('user', user);
    return { user };
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Router TRPC',
        description: `TanStack Start is a type-safe, client-first, full-stack React framework. `,
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),

  component: () => (
    <RootDocument>
      <ThemeProvider>
        <AppLayout>
          <AppHeader
            left={<TopMenu />}
            right={
              <>
                <ModeSwitcher />
                <UserNav />
              </>
            }
          />
          <Outlet />
        </AppLayout>
      </ThemeProvider>
      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </RootDocument>
  ),

  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background overscroll-none font-sans antialiased theme-default">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
