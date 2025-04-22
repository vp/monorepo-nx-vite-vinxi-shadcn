import { createUploadService } from '@workspace/dropzone-supabase/lib/create-upload-service';
import { getSupabaseBrowserClient } from '~/utils/supabase-browser';

export const avatarUploadService = createUploadService(
  getSupabaseBrowserClient,
  {
    bucketName: 'avatars',
    upsert: true,
  }
);
