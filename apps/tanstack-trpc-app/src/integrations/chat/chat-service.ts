import { getSupabaseBrowserClient } from '@/integrations/supabase/browser-client';
import getSupabaseServerClient from '@/integrations/supabase/server-client';
import { createChannelsService } from '@workspace/chat-supabase/channels';
import { createUserManagementService } from '@workspace/chat-supabase/user-management';
import { createMessagesService } from '@workspace/chat-supabase/messages';
import { createSubscriptionsService } from '@workspace/chat-supabase/subscriptions';

const isServer = typeof window === 'undefined';
const getClient = isServer ? getSupabaseServerClient : getSupabaseBrowserClient;

export const channelsService = createChannelsService(getClient);
export const messagesService = createMessagesService(getClient);
export const userManagementService = createUserManagementService(getClient);
export const subscriptionsService = createSubscriptionsService(getClient);
