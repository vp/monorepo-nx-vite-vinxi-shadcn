import { createUploadService } from '@workspace/dropzone-supabase/lib/create-upload-service';
import { getSupabaseServerClient } from '~/utils/supabase';

export const serverAvatarUploadService = createUploadService(
  getSupabaseServerClient,
  {
    bucketName: 'avatars',
    upsert: true,
  }
);
