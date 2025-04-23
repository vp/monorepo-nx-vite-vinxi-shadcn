import { ApplicationTopMenu } from '@workspace/navigation/ui/application-top-menu';
import { useMatchActiveItems } from '@workspace/navigation/hooks';

const ITEMS = [
  {
    title: 'Home',
    to: '/',
    match: /^\/?$/,
  },
  {
    title: 'Posts',
    to: '/posts',
    match: /^\/posts(?:\/.*)?$/,
  },
  {
    title: 'Posts with sidebar',
    to: '/posts-sidebar',
    match: /^\/posts-sidebar(?:\/.*)?$/,
  },
];

export function TopNavigationMenu() {
  const itemsWithActiveState = useMatchActiveItems({
    menuItems: ITEMS,
  });

  return <ApplicationTopMenu items={itemsWithActiveState} />;
}
