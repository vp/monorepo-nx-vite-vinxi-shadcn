import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from '@workspace/ui/components/ui/sidebar';
import React, { ElementType } from 'react';
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
  component?: React.ElementType;
  collapsible?: boolean;
};

export type AppSidebarProps = {
  items?: AppSidebarItem[];
  groups?: AppSidebarItem[];
  header?: React.ReactNode;
  footer?: React.ReactNode;
  itemComponent?: React.ElementType;
  subItemComponent?: React.ElementType;
};

const AppSidebarMenuSubLink = ({ item }: { item: AppSidebarItem }) => (
  <SidebarMenuSubButton asChild>
    <a href={item.href || '#'}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </a>
  </SidebarMenuSubButton>
);

const AppSidebarMenuLink = ({ item }: { item: AppSidebarItem }) => (
  <SidebarMenuButton asChild>
    <a href={item.href || '#'}>
      {item.icon && <item.icon />}
      <span>{item.title}</span>
    </a>
  </SidebarMenuButton>
);

const AppSidebarSubMenu = ({
  items,
  subItemComponent,
}: {
  items: AppSidebarItem[];
  subItemComponent?: ElementType;
}) => {
  const SubItemComponent = subItemComponent || AppSidebarMenuSubLink;

  return (
    <SidebarMenuSub>
      {items?.map((item) => (
        <SidebarMenuSubItem key={item.title}>
          {item.component ? (
            <item.component item={item} />
          ) : (
            <SubItemComponent item={item} />
          )}
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
};

const AppSidebarCollapsibleMenuItem = ({
  item,
  subItemComponent,
}: {
  item: AppSidebarItem;
  subItemComponent?: ElementType;
}) => {
  return (
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
          {item.items && (
            <AppSidebarSubMenu
              items={item.items}
              subItemComponent={subItemComponent}
            />
          )}
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
};

const AppSidebarMenuItem = ({
  item,
  itemComponent,
  subItemComponent,
}: {
  item: AppSidebarItem;
  itemComponent?: ElementType;
  subItemComponent?: ElementType;
}) => {
  const Component = itemComponent || AppSidebarMenuLink;

  return (
    <SidebarMenuItem>
      {item.component ? (
        <item.component item={item} />
      ) : (
        <Component item={item} />
      )}
      {item.items && (
        <AppSidebarSubMenu
          items={item.items}
          subItemComponent={subItemComponent}
        />
      )}
    </SidebarMenuItem>
  );
};

const AppSidebarMenu = ({
  items,
  itemComponent,
}: {
  items: AppSidebarItem[];
  itemComponent?: ElementType;
  subItemComponent?: ElementType;
}) => (
  <SidebarMenu>
    {items.map((item) =>
      item.collapsible && item.items && item.items.length > 0 ? (
        <AppSidebarCollapsibleMenuItem item={item} key={item.title} />
      ) : (
        <AppSidebarMenuItem item={item} itemComponent={itemComponent} />
      )
    )}
  </SidebarMenu>
);

const AppSidebarGroupItem = ({ item }: { item: AppSidebarItem }) => (
  <SidebarGroup>
    {item.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
    {item.items && <AppSidebarMenu items={item.items} />}
  </SidebarGroup>
);

const AppSidebarGroups = ({ items }: { items: AppSidebarItem[] }) => (
  <>
    {items.map((item) => (
      <AppSidebarGroupItem key={item.title} item={item} />
    ))}
  </>
);

export function AppSidebar({
  header,
  items,
  groups,
  footer,
  itemComponent = AppSidebarMenuLink,
  subItemComponent = AppSidebarMenuSubLink,
  ...props
}: AppSidebarProps & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      {header && <SidebarHeader>{header}</SidebarHeader>}
      <SidebarContent>
        {groups && <AppSidebarGroups items={groups} />}
        {items && (
          <SidebarGroup>
            <AppSidebarMenu items={items} itemComponent={itemComponent} />
          </SidebarGroup>
        )}
      </SidebarContent>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
      <SidebarRail />;
    </Sidebar>
  );
}
