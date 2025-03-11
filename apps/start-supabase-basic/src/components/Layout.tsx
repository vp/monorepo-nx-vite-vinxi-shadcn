import { ReactNode } from 'react';
import { ThemeProvider } from '@workspace/ui/components/blocks/theme-provider';
import { Header } from '~/components/Header';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <div className="flex flex-1 flex-col h-screen">
        <Header />
        {children}
      </div>
    </ThemeProvider>
  );
}
