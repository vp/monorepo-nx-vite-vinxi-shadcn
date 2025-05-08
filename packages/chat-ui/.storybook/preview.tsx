import { ThemeContext } from '@workspace/ui/components/blocks/theme-provider';
import '../../../packages/ui/src/styles/globals.css';
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from '@tanstack/react-router';
// If you're having issues with the CSS import, try using a relative path:
// import '../../../packages/ui/globals.css';

export const decorators = [
  (Story) => (
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
  (Story) => {
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
