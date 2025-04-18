import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { CardHeader, CardTitle } from '@workspace/ui/components/ui/card';
import { updateUser } from '~/libs/user/update-user';
import { UpdateForm } from '@workspace/users-ui/components/update-form';
import { ProfileAvatar } from '@workspace/user-avatar/ui/profile-avatar';
import { updateAvatar } from '~/libs/user/update-avatar';
import { useMutation } from '@tanstack/react-query';
import { AvatarUploadProvider } from '@workspace/user-avatar/integrations/avatar-upload-provider';
import { avatarUploadService } from '~/utils/avatar-upload-service';

export const Route = createFileRoute('/_authed/profile/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  const router = useRouter();
  const updateMutation = useMutation({
    mutationFn: useServerFn(updateUser),
    mutationKey: ['user/profile'],
    onSuccess: () => {
      router.invalidate(); // Forces page remount
    },
  });

  const updateAvatarMutation = useMutation({
    mutationFn: useServerFn(updateAvatar),
    mutationKey: ['user/avatar'],
    onSuccess: () => {
      router.invalidate(); // Forces page remount
    },
  });

  return (
    user && (
      <AvatarUploadProvider uploadService={avatarUploadService}>
        <div className="flex flex-col gap-y-8 lg:flex-row lg:gap-x-8">
          <div className="w-full lg:w-[400px]">
            <UpdateForm
              data={user}
              actionText="Edit user"
              status={updateMutation.status}
              onSubmit={(data) => {
                void updateMutation.mutate({
                  data,
                });
              }}
              afterSubmit={
                updateMutation.data?.error ? (
                  <div className="text-red-400">
                    {updateMutation.data.message}
                  </div>
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
            <ProfileAvatar
              avatarUrl={user?.avatarUrl}
              onChanged={(data) => {
                void updateAvatarMutation.mutate({
                  data: {
                    avatarUrl: data.avatarUrl,
                  },
                });
              }}
              afterSubmit={
                updateAvatarMutation.data?.error ? (
                  <div className="text-red-400">
                    {updateAvatarMutation.data.message}
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      </AvatarUploadProvider>
    )
  );
}
