import { createFileRoute } from '@tanstack/react-router'
import { PostsIndex } from '~/features/posts/components/PostsIndex';

export const Route = createFileRoute('/_authed/posts-sidebar/')({
  component: PostsIndex,
})
