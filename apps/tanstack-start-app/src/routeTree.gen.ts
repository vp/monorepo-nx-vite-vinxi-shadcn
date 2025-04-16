/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthedImport } from './routes/_authed'
import { Route as AuthImport } from './routes/_auth'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedProfileImport } from './routes/_authed/profile'
import { Route as AuthedPostsSidebarImport } from './routes/_authed/posts-sidebar'
import { Route as AuthedPostsImport } from './routes/_authed/posts'
import { Route as AuthSignupImport } from './routes/_auth.signup'
import { Route as AuthLogoutImport } from './routes/_auth.logout'
import { Route as AuthLoginImport } from './routes/_auth.login'
import { Route as AuthedProfileIndexImport } from './routes/_authed/profile/index'
import { Route as AuthedPostsIndexImport } from './routes/_authed/posts.index'
import { Route as AuthedPostsSidebarIndexImport } from './routes/_authed/posts-sidebar.index'
import { Route as AuthedProfileSettingsImport } from './routes/_authed/profile/settings'
import { Route as AuthedProfileNotificationsImport } from './routes/_authed/profile/notifications'
import { Route as AuthedPostsPostIdImport } from './routes/_authed/posts.$postId'
import { Route as AuthedPostsSidebarPostIdImport } from './routes/_authed/posts-sidebar.$postId'

// Create/Update Routes

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthedProfileRoute = AuthedProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedPostsSidebarRoute = AuthedPostsSidebarImport.update({
  id: '/posts-sidebar',
  path: '/posts-sidebar',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthedPostsRoute = AuthedPostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => AuthedRoute,
} as any)

const AuthSignupRoute = AuthSignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLogoutRoute = AuthLogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const AuthedProfileIndexRoute = AuthedProfileIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedProfileRoute,
} as any)

const AuthedPostsIndexRoute = AuthedPostsIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedPostsRoute,
} as any)

const AuthedPostsSidebarIndexRoute = AuthedPostsSidebarIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthedPostsSidebarRoute,
} as any)

const AuthedProfileSettingsRoute = AuthedProfileSettingsImport.update({
  id: '/settings',
  path: '/settings',
  getParentRoute: () => AuthedProfileRoute,
} as any)

const AuthedProfileNotificationsRoute = AuthedProfileNotificationsImport.update(
  {
    id: '/notifications',
    path: '/notifications',
    getParentRoute: () => AuthedProfileRoute,
  } as any,
)

const AuthedPostsPostIdRoute = AuthedPostsPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => AuthedPostsRoute,
} as any)

const AuthedPostsSidebarPostIdRoute = AuthedPostsSidebarPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => AuthedPostsSidebarRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/logout': {
      id: '/_auth/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof AuthLogoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/signup': {
      id: '/_auth/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof AuthSignupImport
      parentRoute: typeof AuthImport
    }
    '/_authed/posts': {
      id: '/_authed/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof AuthedPostsImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/posts-sidebar': {
      id: '/_authed/posts-sidebar'
      path: '/posts-sidebar'
      fullPath: '/posts-sidebar'
      preLoaderRoute: typeof AuthedPostsSidebarImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/profile': {
      id: '/_authed/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthedProfileImport
      parentRoute: typeof AuthedImport
    }
    '/_authed/posts-sidebar/$postId': {
      id: '/_authed/posts-sidebar/$postId'
      path: '/$postId'
      fullPath: '/posts-sidebar/$postId'
      preLoaderRoute: typeof AuthedPostsSidebarPostIdImport
      parentRoute: typeof AuthedPostsSidebarImport
    }
    '/_authed/posts/$postId': {
      id: '/_authed/posts/$postId'
      path: '/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof AuthedPostsPostIdImport
      parentRoute: typeof AuthedPostsImport
    }
    '/_authed/profile/notifications': {
      id: '/_authed/profile/notifications'
      path: '/notifications'
      fullPath: '/profile/notifications'
      preLoaderRoute: typeof AuthedProfileNotificationsImport
      parentRoute: typeof AuthedProfileImport
    }
    '/_authed/profile/settings': {
      id: '/_authed/profile/settings'
      path: '/settings'
      fullPath: '/profile/settings'
      preLoaderRoute: typeof AuthedProfileSettingsImport
      parentRoute: typeof AuthedProfileImport
    }
    '/_authed/posts-sidebar/': {
      id: '/_authed/posts-sidebar/'
      path: '/'
      fullPath: '/posts-sidebar/'
      preLoaderRoute: typeof AuthedPostsSidebarIndexImport
      parentRoute: typeof AuthedPostsSidebarImport
    }
    '/_authed/posts/': {
      id: '/_authed/posts/'
      path: '/'
      fullPath: '/posts/'
      preLoaderRoute: typeof AuthedPostsIndexImport
      parentRoute: typeof AuthedPostsImport
    }
    '/_authed/profile/': {
      id: '/_authed/profile/'
      path: '/'
      fullPath: '/profile/'
      preLoaderRoute: typeof AuthedProfileIndexImport
      parentRoute: typeof AuthedProfileImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthLogoutRoute: typeof AuthLogoutRoute
  AuthSignupRoute: typeof AuthSignupRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthLogoutRoute: AuthLogoutRoute,
  AuthSignupRoute: AuthSignupRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface AuthedPostsRouteChildren {
  AuthedPostsPostIdRoute: typeof AuthedPostsPostIdRoute
  AuthedPostsIndexRoute: typeof AuthedPostsIndexRoute
}

const AuthedPostsRouteChildren: AuthedPostsRouteChildren = {
  AuthedPostsPostIdRoute: AuthedPostsPostIdRoute,
  AuthedPostsIndexRoute: AuthedPostsIndexRoute,
}

const AuthedPostsRouteWithChildren = AuthedPostsRoute._addFileChildren(
  AuthedPostsRouteChildren,
)

interface AuthedPostsSidebarRouteChildren {
  AuthedPostsSidebarPostIdRoute: typeof AuthedPostsSidebarPostIdRoute
  AuthedPostsSidebarIndexRoute: typeof AuthedPostsSidebarIndexRoute
}

const AuthedPostsSidebarRouteChildren: AuthedPostsSidebarRouteChildren = {
  AuthedPostsSidebarPostIdRoute: AuthedPostsSidebarPostIdRoute,
  AuthedPostsSidebarIndexRoute: AuthedPostsSidebarIndexRoute,
}

const AuthedPostsSidebarRouteWithChildren =
  AuthedPostsSidebarRoute._addFileChildren(AuthedPostsSidebarRouteChildren)

interface AuthedProfileRouteChildren {
  AuthedProfileNotificationsRoute: typeof AuthedProfileNotificationsRoute
  AuthedProfileSettingsRoute: typeof AuthedProfileSettingsRoute
  AuthedProfileIndexRoute: typeof AuthedProfileIndexRoute
}

const AuthedProfileRouteChildren: AuthedProfileRouteChildren = {
  AuthedProfileNotificationsRoute: AuthedProfileNotificationsRoute,
  AuthedProfileSettingsRoute: AuthedProfileSettingsRoute,
  AuthedProfileIndexRoute: AuthedProfileIndexRoute,
}

const AuthedProfileRouteWithChildren = AuthedProfileRoute._addFileChildren(
  AuthedProfileRouteChildren,
)

interface AuthedRouteChildren {
  AuthedPostsRoute: typeof AuthedPostsRouteWithChildren
  AuthedPostsSidebarRoute: typeof AuthedPostsSidebarRouteWithChildren
  AuthedProfileRoute: typeof AuthedProfileRouteWithChildren
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedPostsRoute: AuthedPostsRouteWithChildren,
  AuthedPostsSidebarRoute: AuthedPostsSidebarRouteWithChildren,
  AuthedProfileRoute: AuthedProfileRouteWithChildren,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/logout': typeof AuthLogoutRoute
  '/signup': typeof AuthSignupRoute
  '/posts': typeof AuthedPostsRouteWithChildren
  '/posts-sidebar': typeof AuthedPostsSidebarRouteWithChildren
  '/profile': typeof AuthedProfileRouteWithChildren
  '/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/notifications': typeof AuthedProfileNotificationsRoute
  '/profile/settings': typeof AuthedProfileSettingsRoute
  '/posts-sidebar/': typeof AuthedPostsSidebarIndexRoute
  '/posts/': typeof AuthedPostsIndexRoute
  '/profile/': typeof AuthedProfileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof AuthLoginRoute
  '/logout': typeof AuthLogoutRoute
  '/signup': typeof AuthSignupRoute
  '/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/profile/notifications': typeof AuthedProfileNotificationsRoute
  '/profile/settings': typeof AuthedProfileSettingsRoute
  '/posts-sidebar': typeof AuthedPostsSidebarIndexRoute
  '/posts': typeof AuthedPostsIndexRoute
  '/profile': typeof AuthedProfileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_authed': typeof AuthedRouteWithChildren
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/logout': typeof AuthLogoutRoute
  '/_auth/signup': typeof AuthSignupRoute
  '/_authed/posts': typeof AuthedPostsRouteWithChildren
  '/_authed/posts-sidebar': typeof AuthedPostsSidebarRouteWithChildren
  '/_authed/profile': typeof AuthedProfileRouteWithChildren
  '/_authed/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/_authed/posts/$postId': typeof AuthedPostsPostIdRoute
  '/_authed/profile/notifications': typeof AuthedProfileNotificationsRoute
  '/_authed/profile/settings': typeof AuthedProfileSettingsRoute
  '/_authed/posts-sidebar/': typeof AuthedPostsSidebarIndexRoute
  '/_authed/posts/': typeof AuthedPostsIndexRoute
  '/_authed/profile/': typeof AuthedProfileIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/signup'
    | '/posts'
    | '/posts-sidebar'
    | '/profile'
    | '/posts-sidebar/$postId'
    | '/posts/$postId'
    | '/profile/notifications'
    | '/profile/settings'
    | '/posts-sidebar/'
    | '/posts/'
    | '/profile/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/signup'
    | '/posts-sidebar/$postId'
    | '/posts/$postId'
    | '/profile/notifications'
    | '/profile/settings'
    | '/posts-sidebar'
    | '/posts'
    | '/profile'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_authed'
    | '/_auth/login'
    | '/_auth/logout'
    | '/_auth/signup'
    | '/_authed/posts'
    | '/_authed/posts-sidebar'
    | '/_authed/profile'
    | '/_authed/posts-sidebar/$postId'
    | '/_authed/posts/$postId'
    | '/_authed/profile/notifications'
    | '/_authed/profile/settings'
    | '/_authed/posts-sidebar/'
    | '/_authed/posts/'
    | '/_authed/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  AuthedRoute: typeof AuthedRouteWithChildren
}

export const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  AuthedRoute: AuthedRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/_authed"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/logout",
        "/_auth/signup"
      ]
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/posts",
        "/_authed/posts-sidebar",
        "/_authed/profile"
      ]
    },
    "/_auth/login": {
      "filePath": "_auth.login.tsx",
      "parent": "/_auth"
    },
    "/_auth/logout": {
      "filePath": "_auth.logout.tsx",
      "parent": "/_auth"
    },
    "/_auth/signup": {
      "filePath": "_auth.signup.tsx",
      "parent": "/_auth"
    },
    "/_authed/posts": {
      "filePath": "_authed/posts.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/posts/$postId",
        "/_authed/posts/"
      ]
    },
    "/_authed/posts-sidebar": {
      "filePath": "_authed/posts-sidebar.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/posts-sidebar/$postId",
        "/_authed/posts-sidebar/"
      ]
    },
    "/_authed/profile": {
      "filePath": "_authed/profile.tsx",
      "parent": "/_authed",
      "children": [
        "/_authed/profile/notifications",
        "/_authed/profile/settings",
        "/_authed/profile/"
      ]
    },
    "/_authed/posts-sidebar/$postId": {
      "filePath": "_authed/posts-sidebar.$postId.tsx",
      "parent": "/_authed/posts-sidebar"
    },
    "/_authed/posts/$postId": {
      "filePath": "_authed/posts.$postId.tsx",
      "parent": "/_authed/posts"
    },
    "/_authed/profile/notifications": {
      "filePath": "_authed/profile/notifications.tsx",
      "parent": "/_authed/profile"
    },
    "/_authed/profile/settings": {
      "filePath": "_authed/profile/settings.tsx",
      "parent": "/_authed/profile"
    },
    "/_authed/posts-sidebar/": {
      "filePath": "_authed/posts-sidebar.index.tsx",
      "parent": "/_authed/posts-sidebar"
    },
    "/_authed/posts/": {
      "filePath": "_authed/posts.index.tsx",
      "parent": "/_authed/posts"
    },
    "/_authed/profile/": {
      "filePath": "_authed/profile/index.tsx",
      "parent": "/_authed/profile"
    }
  }
}
ROUTE_MANIFEST_END */
