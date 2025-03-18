import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { PostsSidebarLayout } from '~/components/posts/PostsSidebarLayout';

export const Route = createFileRoute('/_authed/posts-sidebar')({
  loader: () => fetchPosts(),
  component: PostsSidebarComponent,
});

function PostsSidebarComponent() {
  const posts = Route.useLoaderData();
  const menuItems = posts.map((post) => ({
    title: post.title,
    to: `/posts-sidebar/${post.id}`,
    params: { postId: post.id },
  }));

  return (
    <PostsSidebarLayout menuItems={menuItems}>
      <Outlet />
    </PostsSidebarLayout>
  );
}
