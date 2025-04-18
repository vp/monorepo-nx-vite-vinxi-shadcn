import { createFileRoute } from '@tanstack/react-router'
import { PostsIndex } from '@workspace/posts-ui/components/PostsIndex';

export const Route = createFileRoute('/_authed/posts/')({
  component: PostsIndex,
})
