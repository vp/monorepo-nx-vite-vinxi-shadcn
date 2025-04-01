import { PropsWithChildren } from 'react';
import {
  PostsSidebar,
  PostsSidebarItem,
} from '~/components/posts/PostsSidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/ui/sidebar';

export const PostsSidebarLayout = ({
  children,
  menuItems,
}: PropsWithChildren & { menuItems: PostsSidebarItem[] }) => (
  <SidebarProvider>
    <PostsSidebar items={menuItems} />
    <main>
      <SidebarTrigger />
      <div className="px-6 max-w-[1000px]">{children}</div>
    </main>
  </SidebarProvider>
);
