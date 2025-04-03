import { SidebarMenuButton } from '@workspace/ui/components/ui/sidebar';
import { Link, LinkProps } from '@tanstack/react-router';
import {
  AppSidebar,
  AppSidebarItem,
} from '@workspace/ui/components/blocks/app-sidebar';

export type PostsSidebarItem = AppSidebarItem & LinkProps;

const PostsSidebarItemLink = ({ item }: { item: PostsSidebarItem }) => (
  <SidebarMenuButton asChild>
    <Link to={item.to} params={item.params}>
      <span>{item.title}</span>
    </Link>
  </SidebarMenuButton>
);
export const PostsSidebar = ({ items }: { items: PostsSidebarItem[] }) => {
  return (
    <AppSidebar
      className="mt-14"
      items={items}
      itemComponent={PostsSidebarItemLink}
    />
  );
};
