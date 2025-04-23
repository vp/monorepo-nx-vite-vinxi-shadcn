import { ApplicationTopMenu, AppTopMenuItem } from '@workspace/navigation/ui/application-top-menu';
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
  }
] as AppTopMenuItem[];

export const TopMenu = () => {
    const itemsWithActiveState = useMatchActiveItems({
        menuItems: ITEMS,
      });
    
    return (
        <ApplicationTopMenu items={itemsWithActiveState} />
    );
};
