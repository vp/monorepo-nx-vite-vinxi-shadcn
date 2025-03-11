import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@workspace/ui/components/ui/dropdown-menu';
import { Button } from '@workspace/ui/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';
import { Route } from '~/routes/__root';
import { Link } from '@tanstack/react-router';
import { ChevronsUpDownIcon } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@workspace/ui/components/ui/navigation-menu';

export function UserNav() {
  const { user } = Route.useRouteContext();

  return user ? (
    <DropdownMenu>
      {/*<DropdownMenuTrigger asChild>*/}
      {/*  <Button variant="ghost" className="relative h-8 w-8 rounded-full">*/}
      {/*    <Avatar className="h-8 w-8">*/}
      {/*      <AvatarImage src="/avatars/01.png" alt="@shadcn" />*/}
      {/*      <AvatarFallback>SC</AvatarFallback>*/}
      {/*    </Avatar>*/}
      {/*  </Button>*/}
      {/*</DropdownMenuTrigger>*/}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-12 justify-start px-2 md:max-w-[300px]"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user.email}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <ChevronsUpDownIcon className="text-muted-foreground ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem asChild>
          <Link to="/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/login">Login</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link to="/signup">Sign up</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
