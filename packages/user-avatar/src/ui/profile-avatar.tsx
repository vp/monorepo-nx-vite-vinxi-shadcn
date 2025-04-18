import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';
import { Button } from '@workspace/ui/components/ui/button';
import { ReactNode, useState } from 'react';
import { AvatarPreview } from '@workspace/user-avatar/ui/avatar-preview';
import { AvatarUpload } from '@workspace/user-avatar/ui/avatar-upload';
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
        {!change && (
          <AvatarPreview avatarUrl={`/api/avatar/${avatarUrl}`} />
        )}
        {change && (
          <AvatarUpload
            onUploaded={(data) => {
              setChange(false);
              if (onChanged) {
                onChanged(data);
              }
            }}
          />
        )}
        <div className="mt-4 flex flex-col">
          {!change && (
            <Button onClick={() => setChange(true)}>Change your avatar</Button>
          )}
          {change && (
            <Button onClick={() => setChange(false)} variant="secondary">
              Discard change
            </Button>
          )}
          {afterSubmit ? (
            <Alert>
              <AlertTitle>{afterSubmit}</AlertTitle>
            </Alert>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
};
