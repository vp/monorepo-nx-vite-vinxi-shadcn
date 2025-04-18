import { NavigationMenu } from '@workspace/ui/components/ui/navigation-menu';
import { NavigationMenuListItem } from '@workspace/navigation/ui/navigation-menu-list-item';
import { ApplicationMenuItem } from '@workspace/navigation/types';

export type PostMenuItem = ApplicationMenuItem & {
  description: string;
  id: string;
};

export const postsToMenuItems = (
  posts: { id: string; title: string; body: string }[]
): PostMenuItem[] =>
  posts.map((post) => ({
    id: post.id,
    title: post.title,
    to: `/posts/$postId`,
    params: { postId: post.id },
    description: post.body.substring(0, 120),
  }));

export const PostsMenu = ({
  postsMenuItems,
}: {
  postsMenuItems: PostMenuItem[];
}) => (
  <NavigationMenu className="md:w-1/5">
    <ul className="p-0 m-0">
      {postsMenuItems.map((item) => (
        <NavigationMenuListItem key={item.id} {...item}>
          {item.description}
        </NavigationMenuListItem>
      ))}
    </ul>
  </NavigationMenu>
);
