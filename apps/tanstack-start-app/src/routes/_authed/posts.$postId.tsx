import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/NotFound';
import { fetchPost } from '~/utils/posts';
import { PostsArticle } from '~/features/posts/components/PostsArticle';
import { PostErrorComponent } from '~/features/posts/components/PostErrorComponent';
import { useQuery } from '@tanstack/react-query';

export const Route = createFileRoute('/_authed/posts/$postId')({
  loader: async ({ context, params: { postId } }) => {
    await context.queryClient.prefetchQuery({
      queryKey: ['posts', postId], // Use a unique query key
      queryFn: () => fetchPost({ data: postId }), // Fetch function
    });
  },
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

function PostComponent() {
  const { postId } = Route.useParams();

 // Use the loader data as the initial data for the query
  const { data: post } = useQuery({
    queryKey: ['posts', postId], // Use a unique query key
    queryFn: () => fetchPost({ data: postId }), // Fetch function
  });

  if (!post) {
    return <div>Post not found</div>;
  }
  

  return <PostsArticle title={post.title} body={post.body} />;
}
