# @workspace/navigation

This library was generated with [Nx](https://nx.dev).

## Overview

The `@workspace/navigation` package provides reusable components and types for building navigation-related features in your application. It includes:

- **Components**:

  - `ApplicationSidebar`: A sidebar component for application navigation.
  - `NavigationMenuListItem`: A list item component for navigation menus.

- **Types**:
  - Shared types for navigation-related functionality, defined in `types.ts`.

## Running Unit Tests

Run `nx test @workspace/navigation` to execute the unit tests via [Vitest](https://vitest.dev/).

## Usage

### NavigationMenuListItem example usage

You can use the components provided by this package in your application:

```tsx
import { NavigationMenuListItem } from '@workspace/navigation/ui';


const MENU_ITEMS = [
    {
        id: 1,
        title: 'foo'
        description: 'Foo is something else then bar',
        to: 'foo/$fooId',
        params: {
            fooId: 1
        }
    }
];

function App() {
  return (
    <div>
      <NavigationMenu>
        <ul>
          {MENU_ITEMS.map((item) => (
            <NavigationMenuListItem key={item.id} {...item}>
              {item.description}
            </NavigationMenuListItem>
          ))}
        </ul>
      </NavigationMenu>
    </div>
  );
}
```

### ApplicationSidebar example usage

The `ApplicationSidebar` component can be used to create a sidebar for application navigation:

```tsx
import { PropsWithChildren } from 'react';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@workspace/ui/components/ui/sidebar';
import { ApplicationSidebar } from '@workspace/navigation/ui/application-sidebar';
import { ApplicationMenuItem } from '@workspace/navigation/types';


const MENU_ITEMS: ApplicationMenuItem[]  = [
    {
        title: 'foo'
        to: 'foo/$fooId',
        params: {
            fooId: 1
        }
    }
];

function App() {
  return (
    <SidebarProvider>
      <ApplicationSidebar items={menuItems} />
      <main>
        <SidebarTrigger />
        <div className="px-6 max-w-[1000px]">{children}</div>
      </main>
    </SidebarProvider>
  );
}
```
