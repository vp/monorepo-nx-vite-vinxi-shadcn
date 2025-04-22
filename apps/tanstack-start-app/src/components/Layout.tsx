import { ReactNode } from 'react';
import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import { AppLayout } from '@workspace/ui/components/blocks/app-layout';
import { Header } from '~/components/Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AppLayout>
        <Header />
        {children}
      </AppLayout>
    </ThemeProvider>
  );
}
