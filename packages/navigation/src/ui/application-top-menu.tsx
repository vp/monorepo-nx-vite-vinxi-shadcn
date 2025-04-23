import { Link, LinkProps } from '@tanstack/react-router';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@workspace/ui/components/ui/navigation-menu';

export type AppTopMenuItem = {
  title: string;
  isActive?: boolean;
} & LinkProps;

export const ApplicationTopMenu = ({ items }: { items: AppTopMenuItem[] }) => {
  return (
    <NavigationMenu>
       <NavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
        
        {items.map((item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                asChild
                data-active={item.isActive}
              >
                <Link to={item.to} params={item.params}>
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
       
      </NavigationMenuList>
    </NavigationMenu>
  );
};
