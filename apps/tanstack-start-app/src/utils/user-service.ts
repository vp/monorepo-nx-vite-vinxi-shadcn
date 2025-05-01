import { getSupabaseServerClient } from '~/utils/supabase';
import { createUserService } from '@workspace/user-supabase/create-user-service';

export const userService = createUserService(getSupabaseServerClient);
