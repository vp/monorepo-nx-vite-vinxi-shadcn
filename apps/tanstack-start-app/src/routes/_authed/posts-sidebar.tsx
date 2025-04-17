import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { PostsSidebarLayout } from '~/features/posts/components/PostsSidebarLayout';
import { ApplicationMenuItem } from '~/features/sidebar/types';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_authed/posts-sidebar')({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery({
      queryKey: ['posts'], // Use a unique query key
      queryFn: () => fetchPosts(), // Fetch function
    });
  },
  component: PostsSidebarComponent,
});

function PostsSidebarComponent() {
  const { data: posts } = useQuery({
    queryKey: ['posts'], // Use a unique query key
    queryFn: () => fetchPosts(), // Fetch function
  });

  const menuItems: ApplicationMenuItem[] =
    posts?.map((post) => ({
      title: post.title,
      to: `/posts-sidebar/$postId`,
      params: { postId: post.id },
    })) ?? [];

  return (
    <PostsSidebarLayout menuItems={menuItems}>
      <Outlet />
    </PostsSidebarLayout>
  );
}
