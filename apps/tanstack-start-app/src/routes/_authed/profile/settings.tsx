import { createFileRoute } from '@tanstack/react-router';
import { useMutation } from '~/hooks/useMutation';
import { useServerFn } from '@tanstack/react-start';
import { CardHeader, CardTitle } from '@workspace/ui/components/ui/card';
import { updateUser } from '~/libs/user/update-user';
import { UpdateForm } from '@workspace/users-ui/components/update-form';
import { ProfileAvatarUpload } from '~/features/profile/components/ProfileAvatarUpload';

export const Route = createFileRoute('/_authed/profile/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const updateMutation = useMutation({
    fn: useServerFn(updateUser),
  });

  return (
    <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
      <div className="w-full lg:w-[400px]">
        <UpdateForm
          data={user}
          actionText="Edit user"
          status={updateMutation.status}
          onSubmit={(data) => {
            console.log(data);
            void updateMutation.mutate({
              data,
            });
          }}
          afterSubmit={
            updateMutation.data?.error ? (
              <div className="text-red-400">{updateMutation.data.message}</div>
            ) : null
          }
          header={
            <CardHeader>
              <CardTitle>Update user</CardTitle>
            </CardHeader>
          }
        />
      </div>
      <div className="w-full lg:w-[400px]">
        <ProfileAvatarUpload />
      </div>
    </div>
  );
}
