import { ApplicationTopMenu, AppTopMenuItem } from '@workspace/navigation/ui/application-top-menu';
import { PropsWithChildren } from 'react';
import { useMatchActiveItems } from '@workspace/navigation/hooks';

const ITEMS = [
  {
    title: 'Home',
    to: '/',
    isActive: true,
  },
  {
    title: 'TanStack Query',
    to: '/demo/tanstack-query',
  },
  {
    title: 'Start - Server functions',
    to: '/demo/start/server-funcs',
  },
  {
    title: 'Start - API Request',
    to: '/demo/start/api-request',
  },
] as AppTopMenuItem[];

export const TopMenu = ({ }: PropsWithChildren) => {
    const itemsWithActiveState = useMatchActiveItems({
        menuItems: ITEMS,
      });
    
    return (
        <ApplicationTopMenu items={itemsWithActiveState} />
    );
};
