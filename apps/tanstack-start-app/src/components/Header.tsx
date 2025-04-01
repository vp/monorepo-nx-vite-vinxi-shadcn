import { ModeSwitcher } from '@workspace/ui/components/blocks/mode-switcher';
import { TopNavigationMenu } from '~/components/TopNavigationMenu';
import { UserNav } from '~/components/UserNav';

export function Header() {
  return (
    <header className="bg-background sticky inset-x-0 top-0 isolate z-10 flex shrink-0 items-center gap-2 border-b">
      <div className="flex h-14 w-full items-center gap-2 px-4">
        <TopNavigationMenu />
        <div className="ml-auto flex items-center gap-2">
          <ModeSwitcher />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
