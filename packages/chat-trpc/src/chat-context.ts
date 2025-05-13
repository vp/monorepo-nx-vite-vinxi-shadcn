import { createServerClient } from '@supabase/ssr';
import { ChannelsService, createChannelsService } from '@workspace/chat-supabase/channels';
import { createMessagesService, MessagesService } from '@workspace/chat-supabase/messages';
import { createSubscriptionsService, SubscriptionsService } from '@workspace/chat-supabase/subscriptions';
import { createUserManagementService, UserManagementService } from '@workspace/chat-supabase/user-management';


export type Context = {
  getUser: () => Promise<{ id: string; } | null>;
  user: { id: string; } | null;
  channelsService: ChannelsService;
  messagesService: MessagesService;
  userManagementService: UserManagementService;
  subscriptionsService: SubscriptionsService;
};


export const createChatTRPCContext = (
  getSupabaseClient: ReturnType<typeof createServerClient>
) => ({
  channelsService: createChannelsService(getSupabaseClient),
  messagesService: createMessagesService(getSupabaseClient),
  userManagementService: createUserManagementService(getSupabaseClient),
  subscriptionsService: createSubscriptionsService(getSupabaseClient),
});
