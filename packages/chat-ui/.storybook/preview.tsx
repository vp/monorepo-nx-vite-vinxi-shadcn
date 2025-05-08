import { ThemeContext } from '@workspace/ui/components/blocks/theme-provider';
import '../../../packages/ui/src/styles/globals.css';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
import { ReactRenderer } from '@storybook/react';
import type { PartialStoryFn } from '@storybook/core-common';

export const decorators = [
  (Story: PartialStoryFn<ReactRenderer>) => (
    <ThemeContext.Provider
      value={{
        theme: 'light',
        setTheme: (theme) => {
          console.log('change theme', theme);
        },
      }}
    >
      <Story />
    </ThemeContext.Provider>
  ),
  (Story: PartialStoryFn<ReactRenderer>) => {
    const router = createRouter({
      history: createMemoryHistory(),
      routeTree: createRootRoute({ component: Story }),
    });
    return <RouterProvider router={router} />;
  },
];

// Add parameters to configure theme switching
export const parameters = {
  backgrounds: {
    default: 'light',
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#111827' },
    ],
  },
  themes: {
    clearable: false,
    list: [
      { name: 'Light', class: 'light', color: '#ffffff' },
      { name: 'Dark', class: 'dark', color: '#111827' },
    ],
  },
};
