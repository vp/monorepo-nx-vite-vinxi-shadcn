import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@workspace/dropzone-supabase/components/Dropzone';
import { useSupabaseUpload } from '@workspace/dropzone-supabase/hooks/use-supabase-upload';
import { avatarUploadService } from '~/utils/avatar-upload-service';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/ui/card';

export const ProfileAvatarUpload = () => {
  const props = useSupabaseUpload(avatarUploadService, {
    allowedMimeTypes: ['image/*'],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 4, // 4MB,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Avatar</CardTitle>
        <CardDescription>
          Upload an image to use as your avatar. Maximum size: 4MB.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <Dropzone {...props}>
          <DropzoneEmptyState />
          <DropzoneContent />
        </Dropzone>
      </CardContent>
    </Card>
  );
};
