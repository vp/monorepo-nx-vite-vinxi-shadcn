import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { PostsSidebarLayout } from '~/components/posts/PostsSidebarLayout';
import { PostsSidebarItem } from '~/components/posts/PostsSidebar';

export const Route = createFileRoute('/_authed/posts-sidebar')({
  loader: () => fetchPosts(),
  component: PostsSidebarComponent,
});

function PostsSidebarComponent() {
  const posts = Route.useLoaderData();
  const menuItems: PostsSidebarItem[] = posts.map((post) => ({
    title: post.title,
    to: `/posts-sidebar/$postId`,
    params: { postId: post.id },
  }));

  return (
    <PostsSidebarLayout menuItems={menuItems}>
      <Outlet />
    </PostsSidebarLayout>
  );
}
