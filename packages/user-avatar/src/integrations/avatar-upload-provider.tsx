import { createContext, PropsWithChildren, useContext } from 'react';
import { UploadService } from '@workspace/dropzone-supabase/lib/create-upload-service';


// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AvatarUploadContext = createContext<UploadService>(null!);

export const AvatarUploadProvider = ({
  children,
  uploadService,
}: PropsWithChildren & { uploadService: UploadService }) => (
  <AvatarUploadContext.Provider value={uploadService}>
    {children}
  </AvatarUploadContext.Provider>
);

export const useAvatarUpload = () => {
  const context = useContext(AvatarUploadContext);

  if (!context) {
    throw new Error('useAvatarUpload must be used within an AvatarUploadProvider');
  }

  return context;
};
