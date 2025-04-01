import { getSupabaseServerClient } from '~/utils/supabase';
import { createUsersService } from '@workspace/users-supabase/create-users-service';

export const usersService = createUsersService(getSupabaseServerClient);
