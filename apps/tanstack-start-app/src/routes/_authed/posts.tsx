import { createFileRoute, Outlet } from '@tanstack/react-router';
import { fetchPosts } from '~/utils/posts';
import { NavigationMenu } from '@workspace/ui/components/ui/navigation-menu';
import { NavigationMenuListItem } from '~/components/NavigationMenuListItem';
import { PostsLayout } from '~/components/posts/PostsLayout';

export const Route = createFileRoute('/_authed/posts')({
  loader: () => fetchPosts(),
  component: PostsComponent,
});

function PostsComponent() {
  const posts = Route.useLoaderData();

  return (
    <PostsLayout>
      <NavigationMenu className="md:w-1/5">
        <ul className="p-0 m-0">
          {[
            ...posts,
            { id: 'i-do-not-exist', title: 'Non-existent Post', body: '' },
          ].map((post) => (
            <NavigationMenuListItem
              key={post.id}
              title={post.title.substring(0, 20)}
              to="/posts/$postId"
              params={{
                postId: post.id,
              }}
            >
              {post.body.substring(0, 120)}
            </NavigationMenuListItem>
          ))}
        </ul>
      </NavigationMenu>
      <div className="md:w-4/5 flex flex-wrap mb-5 pb-4 border-b-2 md:border-b-0">
        <Outlet />
      </div>
    </PostsLayout>
  );
}
