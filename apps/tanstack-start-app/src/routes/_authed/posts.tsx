import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { PostsLayout } from '@workspace/posts-ui/components/PostsLayout';
import { useQuery } from '@tanstack/react-query';
import {
  PostsMenu,
  postsToMenuItems,
} from '@workspace/posts-ui/components/PostsMenu';

export const Route = createFileRoute('/_authed/posts')({
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery({
      queryKey: ['posts'], // Use a unique query key
      queryFn: () => fetchPosts(), // Fetch function
    });
  },
  component: PostsComponent,
});

function PostsComponent() {
  const { data: posts } = useQuery({
    queryKey: ['posts'], // Use a unique query key
    queryFn: () => fetchPosts(), // Fetch function
  });

  return (
    posts && (
      <PostsLayout>
        <PostsMenu postsMenuItems={postsToMenuItems(posts)} />
        <div className="md:w-4/5 flex flex-wrap mb-5 pb-4 border-b-2 md:border-b-0">
          <Outlet />
        </div>
      </PostsLayout>
    )
  );
}
