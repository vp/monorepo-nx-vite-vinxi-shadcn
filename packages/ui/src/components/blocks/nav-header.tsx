import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@workspace/ui/components/ui/navigation-menu';

export function NavHeader() {
  const pathname:string = '';

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-2 *:data-[slot=navigation-menu-item]:h-7 **:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium">
        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={pathname === '/'}>
            <a href="/">Home</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={pathname === '/charts'}>
            <a href="/charts">Charts</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild data-active={pathname === '/forms'}>
            <a href="/forms">Forms</a>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
