import { createFileRoute, Outlet } from '@tanstack/react-router';
import { ProfileLayout } from '@workspace/profile/ui/profile-layout';
import { ApplicationMenuItem } from '@workspace/navigation/types';
import { MessageSquareIcon, SettingsIcon, UserIcon } from 'lucide-react';

export const Route = createFileRoute('/_authed/profile')({
  component: RouteComponent,
});

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
  },
];

function RouteComponent() {
  return (
    <ProfileLayout menuItems={MENU_ITEMS}>
      <Outlet />
    </ProfileLayout>
  );
}
