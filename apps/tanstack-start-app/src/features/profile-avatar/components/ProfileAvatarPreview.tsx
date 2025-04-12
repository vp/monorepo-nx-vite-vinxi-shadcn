import { avatarUploadService } from '~/utils/avatar-upload-service';
import { useEffect, useState } from 'react';

export const ProfileAvatarPreview = ({ avatarUrl }: { avatarUrl?: string }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (avatarUrl) {
      avatarUploadService.getThumbUrl(avatarUrl).then((url) => {
        setThumbnailUrl(url);
      });
    }
  }, [avatarUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          alt="Profile Avatar"
          className="h-60 w-60 rounded-full object-cover"
        />
      )}
    </div>
  );
};
