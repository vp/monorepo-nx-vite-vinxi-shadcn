import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@workspace/dropzone-supabase/components/dropzone';
import { useSupabaseUpload } from '@workspace/dropzone-supabase/hooks/use-supabase-upload';
import { avatarUploadService } from '~/utils/avatar-upload-service';
import { useEffect, useState } from 'react';

export const ProfileAvatarUpload = ({
  onUploaded,
}: {
  onUploaded?: (data: { avatarUrl: string }) => void;
}) => {
  const [publicUrl, setPublicUrl] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);

  const props = useSupabaseUpload(avatarUploadService, {
    allowedMimeTypes: ['image/*'],
    maxFiles: 1,
    maxFileSize: 1000 * 1000 * 4, // 4MB,
  });
  const { isSuccess, setFiles } = props;

  useEffect(() => {
    const fetchPublicUrl = async () => {
      if (isSuccess) {
        setFetching(true);
        const file = props.files[0];

        if (file) {
          console.log('file', file);
          try {
            const publicUrl = await avatarUploadService.getPublicUrl(file.name);
            setPublicUrl(publicUrl);
            setFetching(false);
          } catch (error) {
            console.error('Error fetching public URL:', error);
          }
        }
      }
    };

    if (isSuccess && !publicUrl && !fetching) {
      void fetchPublicUrl();
    }
  }, [fetching, isSuccess, onUploaded, props, publicUrl]);

  useEffect(() => {
    if (publicUrl && onUploaded) {
      onUploaded({ avatarUrl: publicUrl });
      setPublicUrl(null); // Clear public URL after upload
      setFiles([]); // Clear files after upload
    }
  }, [onUploaded, publicUrl, setFiles]);

  return (
    <Dropzone {...props}>
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
};
