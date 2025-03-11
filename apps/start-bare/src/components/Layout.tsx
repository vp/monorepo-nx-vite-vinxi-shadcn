import { ReactNode } from 'react';
import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import { Header } from '~/components/Header';

export function Layout({ children }: { children: ReactNode }) {
  return <ThemeProvider>
    <Header />
    {children}
  </ThemeProvider>;
}
