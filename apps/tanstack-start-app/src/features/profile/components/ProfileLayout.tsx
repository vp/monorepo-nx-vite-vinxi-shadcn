import { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/ui/sidebar';
import { ApplicationSidebar } from '@workspace/navigation/ui/application-sidebar';
import { ApplicationMenuItem } from '@workspace/navigation/types';

export const ProfileLayout = ({
  children,
  menuItems,
}: PropsWithChildren & { menuItems: ApplicationMenuItem[] }) => (
  <SidebarProvider>
    <ApplicationSidebar items={menuItems} className="inset-y-14"/>
    <main>
      <SidebarTrigger />
      <div className="px-6 max-w-[1000px]">{children}</div>
    </main>
  </SidebarProvider>
);
