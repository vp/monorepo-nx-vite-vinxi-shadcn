import { ModeSwitcher } from '@workspace/ui/components/blocks/mode-switcher';
import { AppHeader } from '@workspace/ui/components/blocks/app-header';
import { TopNavigationMenu } from '~/components/TopNavigationMenu';
import { UserNav } from '~/components/UserNav';

export function Header() {
  return (
    <AppHeader
      left={<TopNavigationMenu />}
      right={
        <>
          <ModeSwitcher />
          <UserNav />
        </>
      }
    />
  );
}
