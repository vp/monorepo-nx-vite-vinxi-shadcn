import { createFileRoute } from '@tanstack/react-router';
import { NotFound } from '~/components/NotFound';
import { fetchPost } from '~/utils/posts';
import { PostsArticle } from '~/components/posts/PostsArticle';
import { PostErrorComponent } from '~/components/posts/PostErrorComponent';

export const Route = createFileRoute('/_authed/posts/$postId')({
  loader: ({ params: { postId } }) => fetchPost({ data: postId }),
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

function PostComponent() {
  const post = Route.useLoaderData();

  return <PostsArticle title={post.title} body={post.body} />;
}
