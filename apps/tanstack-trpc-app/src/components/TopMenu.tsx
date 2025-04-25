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
  },
  {
    title: 'Login',
    to: '/sign-in',
  },
  {
    title: 'Sign Up',
    to: '/sign-up',
  },
  {
    title: 'User',
    to: '/user',
  },
  {
    title: 'Sign out',
    to: '/sign-out'
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
