import { createFileRoute } from '@tanstack/react-router'
import { PostsIndex } from '~/components/posts/PostsIndex';

export const Route = createFileRoute('/_authed/posts-sidebar/')({
  component: PostsIndex,
})
