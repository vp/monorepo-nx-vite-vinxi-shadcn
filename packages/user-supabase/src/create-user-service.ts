import { signUp, SignUpRequest } from './sign-up.js';
import { signOut } from './sign-out.js';
import { createServerClient } from '@supabase/ssr';
import { signIn, SignInRequest } from './sign-in.js';
import { getUser } from './get-user.js';
import { updateUser, UpdateUserRequest } from './update-user.js';
import { updateAvatar, UpdateAvatarRequest } from './update-avatar.js';

export const createUserService = (
  createClient: ReturnType<typeof createServerClient>
) => {
  return {
    signUp: async (data: SignUpRequest) => signUp(await createClient(), data),
    signIn: async (data: SignInRequest) => signIn(await createClient(), data),
    updateUser: async (data: UpdateUserRequest) =>
      updateUser(await createClient(), data),
    updateAvatar: async (data: UpdateAvatarRequest) =>
      updateAvatar(await createClient(), data),
    signOut: async () => signOut(await createClient()),
    getUser: async () => getUser(await createClient()),
  };
};

export type UserService = ReturnType<typeof createUserService>;
