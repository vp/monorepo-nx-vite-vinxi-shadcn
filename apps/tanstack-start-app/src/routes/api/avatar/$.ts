import { createAPIFileRoute } from '@tanstack/react-start/api';
import { serverAvatarUploadService } from '~/utils/server-avatar-upload-service';
import { usersService } from '~/utils/users-service';

export const APIRoute = createAPIFileRoute('/api/avatar/$')({
  GET: async ({ params }) => {
    const { _splat } = params as { _splat: string };
    const user = await usersService.getUser();

    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const result = await serverAvatarUploadService.download(_splat, {
        transform: {
          width: 200,
          height: 200,
          resize: 'cover', // Options: 'cover', 'contain', 'fill'
        },
      });

      if (!result) {
        return new Response(result, { status: 404 });
      }

      return new Response(result, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-control': 'max-age=3600, public',
        },
      });
    } catch (exception) {
      console.error('Error downloading avatar:', exception);
      
      return new Response('Internal Server Error', { status: 500 });
    }
  },
});
