import { ReactNode } from 'react';
import { Link, LinkProps } from '@tanstack/react-router';
import { NavigationMenuLink } from '@workspace/ui/components/ui/navigation-menu';
import { cn } from '@workspace/ui/lib/utils';

export const NavigationMenuListItem = ({
                           className,
                           title,
                           children,
                           ...props
                         }: {
  className?: string;
  title: string;
  children: ReactNode;
} & LinkProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            'block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};
