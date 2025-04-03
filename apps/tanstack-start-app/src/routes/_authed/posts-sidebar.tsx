import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { PostsSidebarLayout } from '~/features/posts/components/PostsSidebarLayout';
import { ApplicationMenuItem } from '~/features/sidebar/types';

export const Route = createFileRoute('/_authed/posts-sidebar')({
  loader: () => fetchPosts(),
  component: PostsSidebarComponent,
});

function PostsSidebarComponent() {
  const posts = Route.useLoaderData();
  const menuItems: ApplicationMenuItem[] = posts.map((post) => ({
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
