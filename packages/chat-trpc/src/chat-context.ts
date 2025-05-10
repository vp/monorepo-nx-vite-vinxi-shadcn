import { ChannelsService } from '@workspace/chat-supabase/channels';
import { MessagesService } from '@workspace/chat-supabase/messages';
import { SubscriptionsService } from '@workspace/chat-supabase/subscriptions';
import { UserManagementService } from '@workspace/chat-supabase/user-management';


export type Context = {
  getUser: () => Promise<{ id: string; } | null>;
  user: { id: string; } | null;
  channelsService: ChannelsService;
  messagesService: MessagesService;
  userManagementService: UserManagementService;
  subscriptionsService: SubscriptionsService;
};
