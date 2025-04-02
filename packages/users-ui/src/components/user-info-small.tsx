import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@workspace/ui/components/ui/avatar';

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export const UserInfoSmall = ({ user }: { user: UserInfo }) => (
  <>
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Shadcn" />
      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
    </Avatar>
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold">
        {user.firstName} {user.lastName}
      </span>
      <span className="text-muted-foreground truncate text-xs">
        {user.email}
      </span>
    </div>
  </>
);
