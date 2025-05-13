import { createServerClient } from '@supabase/ssr';
import { createChannelsService } from '@workspace/chat-supabase/channels';
import { createMessagesService } from '@workspace/chat-supabase/messages';
import { createSubscriptionsService } from '@workspace/chat-supabase/subscriptions';
import { createUserManagementService } from '@workspace/chat-supabase/user-management';

export const createChatTRPCContext = (
  getSupabaseClient: ReturnType<typeof createServerClient>
) => ({
  channelsService: createChannelsService(getSupabaseClient),
  messagesService: createMessagesService(getSupabaseClient),
  userManagementService: createUserManagementService(getSupabaseClient),
  subscriptionsService: createSubscriptionsService(getSupabaseClient),
});
