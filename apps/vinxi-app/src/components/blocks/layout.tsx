import { PropsWithChildren } from 'react';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/ui/sidebar';
import { Separator } from '@workspace/ui/components/ui/separator';
import { NavHeader } from '@/components/blocks/nav-header';
import { ModeSwitcher } from '@workspace/ui/components/blocks/mode-switcher';
import { AppSidebar } from '@workspace/ui/components/blocks/app-sidebar';
import { groups, teams, user } from '@/utils/sidebar-data';
import { AppSidebarHeader } from '@/components/blocks/app-sidebar-header';
import { NavUser } from '@/components/blocks/nav-user';

export function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar
        groups={groups}
        header={<AppSidebarHeader teams={teams} />}
        footer={<NavUser user={user} />}
      />
      <SidebarInset>
        <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
          <div className="flex h-14 w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1.5" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <NavHeader />
            <div className="ml-auto flex items-center gap-2">
              <ModeSwitcher />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
