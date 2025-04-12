import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { Button } from '@workspace/ui/components/ui/button';
import { ReactNode, useState } from 'react';
import { ProfileAvatarPreview } from '~/features/profile-avatar/components/ProfileAvatarPreview';
import { ProfileAvatarUpload } from '~/features/profile-avatar/components/ProfileAvatarUpload';
import { Alert, AlertTitle } from '@workspace/ui/components/ui/alert';

export const ProfileAvatar = ({
  onChanged,
  avatarUrl,
  afterSubmit,
}: {
  afterSubmit?: ReactNode;
  avatarUrl?: string;
  onChanged?: (data: { avatarUrl: string }) => void;
}) => {
  const [change, setChange] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Avatar</CardTitle>
        <CardDescription>
          Upload an image to use as your avatar. Maximum size: 4MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        {!change && <ProfileAvatarPreview avatarUrl={`/api/avatar/${avatarUrl}`} />}
        {change && (
          <ProfileAvatarUpload
            onUploaded={(data) => {
              setChange(false);
              if (onChanged) {
                onChanged(data);
              }
            }}
          />
        )}
        {!change && (
          <Button onClick={() => setChange(true)}>Change your avatar</Button>
        )}
        {change && (
          <Button onClick={() => setChange(false)} variant="secondary">
            Discard change{' '}
          </Button>
        )}
        {afterSubmit ? (
          <Alert>
            <AlertTitle>{afterSubmit}</AlertTitle>
          </Alert>
        ) : null}
      </CardContent>
    </Card>
  );
};
