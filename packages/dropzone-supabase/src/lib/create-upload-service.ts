import { createBrowserClient } from '@supabase/ssr';

type SupabaseUploadOptions = {
  /**
   * Name of bucket to upload files to in your Supabase project
   */
  bucketName: string;
  /**
   * Folder to upload files to in the specified bucket within your Supabase project.
   *
   * Defaults to uploading files to the root of the bucket
   *
   * e.g If specified path is `test`, your file will be uploaded as `test/file_name`
   */
  path?: string;
  /**
   * The number of seconds the asset is cached in the browser and in the Supabase CDN.
   *
   * This is set in the Cache-Control: max-age=<seconds> header. Defaults to 3600 seconds.
   */
  cacheControl?: number;
  /**
   * When set to true, the file is overwritten if it exists.
   *
   * When set to false, an error is thrown if the object already exists. Defaults to `false`
   */
  upsert?: boolean;
};
export type UploadService = ReturnType<typeof createUploadService>;

export const createUploadService = (
  createSupabaseClient: ReturnType<typeof createBrowserClient>,
  options: SupabaseUploadOptions
) => ({
  upload: async (file: File) => {
    const { bucketName, path, cacheControl = 3600, upsert = false } = options;
    const supabase = await createSupabaseClient();
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(path ? `${path}/${file.name}` : file.name, file, {
        cacheControl: cacheControl.toString(),
        upsert: upsert,
      });
    if (error) {
      return { name: file.name, message: error.message };
    } else {
      return { name: file.name, message: undefined };
    }
  },
  getPublicUrl: async (path: string) => {
    const supabase = await createSupabaseClient();

    const { data } = supabase.storage
      .from(options.bucketName)
      .getPublicUrl(path);

    const { publicUrl } = data;

    return publicUrl;
  },
  getThumbUrl: async (path: string) => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase.storage
      .from(options.bucketName)
      .createSignedUrl(path, 60000, {
        transform: {
          width: 200,
          height: 200,
          resize: 'cover', // Options: 'cover', 'contain', 'fill'
        },
      });

    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log(data.signedUrl); // Use this URL to access the resized image
    }

    return data.signedUrl;
  },
  createThumbUrl: async (path: string) => {
    const supabase = await createSupabaseClient();

    const { data, error } = await supabase.storage
      .from(options.bucketName)
      // Valid for 10 years
      .createSignedUrl(path, 315360000 , {
        transform: {
          width: 200,
          height: 200,
          resize: 'cover', // Options: 'cover', 'contain', 'fill'
        },
      });

    if (error) {
      console.error(error);
      throw error;
    } else {
      console.log(data.signedUrl); // Use this URL to access the resized image
    }

    return data.signedUrl;
  }
});
