import { useRouterState } from '@tanstack/react-router';
import { useMemo } from 'react';

export type MenuItem = {
  to: string;
  match?: RegExp;
  isActive?: boolean;
};

export const useMatchActiveItems = <T extends MenuItem>({
  menuItems,
}: {
  menuItems: T[];
}): T[] => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return useMemo(
    () =>
      menuItems.map((item) => ({
        ...item,
        isActive: item?.match
          ? item.match.test(pathname)
          : pathname === item.to,
      })),
    [menuItems, pathname]
  );
};
