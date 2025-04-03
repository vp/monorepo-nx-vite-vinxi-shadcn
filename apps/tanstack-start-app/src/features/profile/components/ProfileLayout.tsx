import { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/ui/sidebar';
import { ApplicationSidebar } from '~/features/sidebar/components/application-sidebar';
import { ApplicationMenuItem } from '~/features/sidebar/types';

export const ProfileLayout = ({
  children,
  menuItems,
}: PropsWithChildren & { menuItems: ApplicationMenuItem[] }) => (
  <SidebarProvider>
    <ApplicationSidebar items={menuItems} />
    <main>
      <SidebarTrigger />
      <div className="px-6 max-w-[1000px]">{children}</div>
    </main>
  </SidebarProvider>
);
