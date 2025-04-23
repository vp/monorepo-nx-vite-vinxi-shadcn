import { ApplicationTopMenu } from '@workspace/navigation/ui/application-top-menu';

const ITEMS = [
  {
    title: 'Home',
    to: '/',
  },
  {
    title: 'Posts',
    to: '/posts',
  },
  {
    title: 'Posts with sidebar',
    to: '/posts-sidebar',
  }
]

export function TopNavigationMenu() {
  return (
    <ApplicationTopMenu items={ITEMS} />
  );
}
