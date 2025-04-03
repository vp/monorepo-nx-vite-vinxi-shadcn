import React from 'react';
import {
  SidebarMenuButton,
  SidebarMenuSubButton,
} from '@workspace/ui/components/ui/sidebar';
import { AppSidebar } from '@workspace/ui/components/blocks/app-sidebar';
import { Link } from '@tanstack/react-router';
import { ApplicationMenuItem } from '../types';

const SidebarItemLink = ({ item }: { item: ApplicationMenuItem }) => (
  <SidebarMenuButton asChild>
    <Link to={item.to} params={item.params}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </Link>
  </SidebarMenuButton>
);

const SidebarSubItemLink = ({ item }: { item: ApplicationMenuItem }) => (
  <SidebarMenuSubButton asChild>
    <Link to={item.to} params={item.params}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </Link>
  </SidebarMenuSubButton>
);

export const ApplicationSidebar = (
  props: React.ComponentProps<typeof AppSidebar>
) => (
  <AppSidebar
    className="mt-14"
    subItemComponent={SidebarSubItemLink}
    itemComponent={SidebarItemLink}
    {...props}
  />
);
