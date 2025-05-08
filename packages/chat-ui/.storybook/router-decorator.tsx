import {
    RouterProvider,
    createMemoryHistory,
    createRootRoute,
    createRoute,
    createRouter
  } from '@tanstack/react-router';

  
  // Create a root route
  const rootRoute = createRootRoute();
  
  // Create a sample index route
  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => <div>Home Page</div>
  });
  
  // Create additional sample routes as needed
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: () => <div>About Page</div>
  });
  
  // Create routes array
  const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);
  
  // Create a decorator factory that allows customizing routes
  export const createRouterDecorator = (customRoutes = []) => {
    // You can merge custom routes with default routes if needed
    const routes = customRoutes.length > 0 
      ? rootRoute.addChildren(customRoutes) 
      : routeTree;
    
    return (Story) => {
      // Create a memory history
      const memoryHistory = createMemoryHistory();
      
      // Create router instance
      const router = createRouter({
        routeTree: routes,
        history: memoryHistory
      });
      
      return (
        <RouterProvider router={router}>
          <Story />
        </RouterProvider>
      );
    };
  };
  
  // Default decorator with sample routes
  export const withRouter = createRouterDecorator();