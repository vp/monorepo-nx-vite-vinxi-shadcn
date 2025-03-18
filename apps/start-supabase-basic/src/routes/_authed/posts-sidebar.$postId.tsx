import type { ErrorComponentProps } from '@tanstack/react-router';
import { createFileRoute, ErrorComponent } from '@tanstack/react-router';
import { NotFound } from '~/components/NotFound';
import { fetchPost } from '~/utils/posts';
import { PostsArticle } from '~/components/posts/PostsArticle';

export const Route = createFileRoute('/_authed/posts-sidebar/$postId')({
  loader: ({ params: { postId } }) => fetchPost({ data: postId }),
  errorComponent: PostErrorComponent,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

export function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function PostComponent() {
  const post = Route.useLoaderData();

  return <PostsArticle title={post.title} body={post.body} />;
}
