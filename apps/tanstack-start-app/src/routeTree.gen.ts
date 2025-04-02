/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as SignupImport } from './routes/signup'
import { Route as LogoutImport } from './routes/logout'
import { Route as LoginImport } from './routes/login'
import { Route as AuthedImport } from './routes/_authed'
import { Route as IndexImport } from './routes/index'
import { Route as AuthedPostsSidebarImport } from './routes/_authed/posts-sidebar'
import { Route as AuthedPostsImport } from './routes/_authed/posts'
import { Route as AuthedProfileIndexImport } from './routes/_authed/profile/index'
import { Route as AuthedPostsIndexImport } from './routes/_authed/posts.index'
import { Route as AuthedPostsSidebarIndexImport } from './routes/_authed/posts-sidebar.index'
import { Route as AuthedPostsPostIdImport } from './routes/_authed/posts.$postId'
import { Route as AuthedPostsSidebarPostIdImport } from './routes/_authed/posts-sidebar.$postId'

// Create/Update Routes

const SignupRoute = SignupImport.update({
  id: '/signup',
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const LogoutRoute = LogoutImport.update({
  id: '/logout',
  path: '/logout',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthedRoute = AuthedImport.update({
  id: '/_authed',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
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

const AuthedProfileIndexRoute = AuthedProfileIndexImport.update({
  id: '/profile/',
  path: '/profile/',
  getParentRoute: () => AuthedRoute,
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
    '/_authed': {
      id: '/_authed'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthedImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/logout': {
      id: '/logout'
      path: '/logout'
      fullPath: '/logout'
      preLoaderRoute: typeof LogoutImport
      parentRoute: typeof rootRoute
    }
    '/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupImport
      parentRoute: typeof rootRoute
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
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthedProfileIndexImport
      parentRoute: typeof AuthedImport
    }
  }
}

// Create and export the route tree

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

interface AuthedRouteChildren {
  AuthedPostsRoute: typeof AuthedPostsRouteWithChildren
  AuthedPostsSidebarRoute: typeof AuthedPostsSidebarRouteWithChildren
  AuthedProfileIndexRoute: typeof AuthedProfileIndexRoute
}

const AuthedRouteChildren: AuthedRouteChildren = {
  AuthedPostsRoute: AuthedPostsRouteWithChildren,
  AuthedPostsSidebarRoute: AuthedPostsSidebarRouteWithChildren,
  AuthedProfileIndexRoute: AuthedProfileIndexRoute,
}

const AuthedRouteWithChildren =
  AuthedRoute._addFileChildren(AuthedRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/signup': typeof SignupRoute
  '/posts': typeof AuthedPostsRouteWithChildren
  '/posts-sidebar': typeof AuthedPostsSidebarRouteWithChildren
  '/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/posts-sidebar/': typeof AuthedPostsSidebarIndexRoute
  '/posts/': typeof AuthedPostsIndexRoute
  '/profile': typeof AuthedProfileIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/signup': typeof SignupRoute
  '/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/posts/$postId': typeof AuthedPostsPostIdRoute
  '/posts-sidebar': typeof AuthedPostsSidebarIndexRoute
  '/posts': typeof AuthedPostsIndexRoute
  '/profile': typeof AuthedProfileIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_authed': typeof AuthedRouteWithChildren
  '/login': typeof LoginRoute
  '/logout': typeof LogoutRoute
  '/signup': typeof SignupRoute
  '/_authed/posts': typeof AuthedPostsRouteWithChildren
  '/_authed/posts-sidebar': typeof AuthedPostsSidebarRouteWithChildren
  '/_authed/posts-sidebar/$postId': typeof AuthedPostsSidebarPostIdRoute
  '/_authed/posts/$postId': typeof AuthedPostsPostIdRoute
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
    | '/posts-sidebar/$postId'
    | '/posts/$postId'
    | '/posts-sidebar/'
    | '/posts/'
    | '/profile'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | ''
    | '/login'
    | '/logout'
    | '/signup'
    | '/posts-sidebar/$postId'
    | '/posts/$postId'
    | '/posts-sidebar'
    | '/posts'
    | '/profile'
  id:
    | '__root__'
    | '/'
    | '/_authed'
    | '/login'
    | '/logout'
    | '/signup'
    | '/_authed/posts'
    | '/_authed/posts-sidebar'
    | '/_authed/posts-sidebar/$postId'
    | '/_authed/posts/$postId'
    | '/_authed/posts-sidebar/'
    | '/_authed/posts/'
    | '/_authed/profile/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthedRoute: typeof AuthedRouteWithChildren
  LoginRoute: typeof LoginRoute
  LogoutRoute: typeof LogoutRoute
  SignupRoute: typeof SignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthedRoute: AuthedRouteWithChildren,
  LoginRoute: LoginRoute,
  LogoutRoute: LogoutRoute,
  SignupRoute: SignupRoute,
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
        "/_authed",
        "/login",
        "/logout",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_authed": {
      "filePath": "_authed.tsx",
      "children": [
        "/_authed/posts",
        "/_authed/posts-sidebar",
        "/_authed/profile/"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/logout": {
      "filePath": "logout.tsx"
    },
    "/signup": {
      "filePath": "signup.tsx"
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
    "/_authed/posts-sidebar/$postId": {
      "filePath": "_authed/posts-sidebar.$postId.tsx",
      "parent": "/_authed/posts-sidebar"
    },
    "/_authed/posts/$postId": {
      "filePath": "_authed/posts.$postId.tsx",
      "parent": "/_authed/posts"
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
      "parent": "/_authed"
    }
  }
}
ROUTE_MANIFEST_END */
