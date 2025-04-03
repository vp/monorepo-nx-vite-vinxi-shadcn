import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ProfileLayout } from '~/features/profile/components/ProfileLayout';
import { ApplicationMenuItem } from '~/features/sidebar/types';
import { MessageSquareIcon, SettingsIcon, UserIcon } from 'lucide-react';

export const Route = createFileRoute('/_authed/profile')({
  component: RouteComponent,
})

const MENU_ITEMS: ApplicationMenuItem[] = [
  {
    to: '/profile',
    title: 'Profile',
    icon: UserIcon,
  },
  {
    to: '/profile/settings',
    title: 'Settings',
    icon: SettingsIcon,
  },
  {
    to: '/profile/notifications',
    title: 'Notifications',
    icon: MessageSquareIcon,
  }
];

function RouteComponent() {
  return <ProfileLayout menuItems={MENU_ITEMS}>Ahoj<Outlet /></ProfileLayout>
}
