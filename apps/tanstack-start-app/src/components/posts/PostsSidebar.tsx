import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/ui/components/ui/sidebar';
import { Link, LinkProps } from '@tanstack/react-router';

export type PostsSidebarItem = {
  title: string;
} & LinkProps;

export const PostsSidebar = ({ items }: { items: PostsSidebarItem[] }) => {
  return (
    <Sidebar className="mt-14">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Posts</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to} params={item.params}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
