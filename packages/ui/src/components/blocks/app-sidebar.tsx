import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@workspace/ui/components/ui/sidebar';
import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@workspace/ui/components/ui/collapsible';
import { ChevronRightIcon } from 'lucide-react';

export type AppSidebarItem = {
  title: string;
  icon?: React.ElementType;
  isActive?: boolean;
  items?: AppSidebarItem[];
  href?: string;
  to?: string;
  params?: Record<string, unknown>;
  component?: React.ElementType;
};

export type AppSidebarProps = {
  items?: AppSidebarItem[];
  groups?: AppSidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebarItemComponent?: React.ElementType;
};

const ItemHref = ({ item }: { item: AppSidebarItem }) => (
  <a href={item.href || '#'}>
    {item.icon && <item.icon />}
    <span>{item.title}</span>
  </a>
);

export function AppSidebar({
  header,
  items,
  groups,
  footer,
  sidebarItemComponent: SidebarItemComponent = ItemHref,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {header && <SidebarHeader>{header}</SidebarHeader>}
      <SidebarContent>
        {groups &&
          groups.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          {subItem.component ? (
                            <subItem.component item={subItem} />
                          ) : (
                            <SidebarItemComponent item={subItem} />
                          )}
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      <SidebarRail />
    </Sidebar>
  );
}
