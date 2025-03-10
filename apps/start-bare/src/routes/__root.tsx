import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
  useRouterState,
} from '@tanstack/react-router';
import appCss from '~/styles/app.css?url';
import globalCss from '@workspace/ui/globals.css?url';
import * as React from 'react';
import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from '@workspace/ui/components/ui/navigation-menu';
import { ModeSwitcher } from '@workspace/ui/components/blocks/mode-switcher';

export const Route = createRootRoute({
  head: () => ({
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'stylesheet', href: globalCss },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
            <div className="flex h-14 w-full items-center gap-2 px-4">
              <NavigationMenu>
                <NavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/'}>
                      <Link to="/">Index</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink asChild data-active={pathname === '/about'}>
                      <Link to="/about">About</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              <div className="ml-auto flex items-center gap-2">
                <ModeSwitcher />
              </div>
            </div>
          </header>

          {children}
        </ThemeProvider>
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
