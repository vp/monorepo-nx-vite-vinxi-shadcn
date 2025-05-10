import { createServerClient } from '@supabase/ssr';
import { SupabaseClient } from '@supabase/supabase-js';

export function subscribeToMessages(
  supabase: SupabaseClient,
  channelId: number,
  callback: (payload: unknown) => void,
  schema = 'chat_app'
) {
  return supabase
    .channel(`messages:channel_id=${channelId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: schema,
        table: 'messages',
        filter: `channel_id=eq.${channelId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToUserStatus(
  supabase: SupabaseClient,
  callback: (payload: unknown) => void,
  schema = 'chat_app'
) {
  return supabase
    .channel('user_status_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: schema,
        table: 'users',
        filter: `status=eq.ONLINE`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToChannels(
  supabase: SupabaseClient,
  callback: (payload: unknown) => void,
  schema = 'chat_app'
) {
  return supabase
    .channel('channel_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: schema, table: 'channels' },
      callback
    )
    .subscribe();
}

export const createSubscriptionsService = (
  createClient: ReturnType<typeof createServerClient>,
  schema = 'chat_app'
) => ({
  subscribeToMessages: (
    channelId: number,
    callback: (payload: unknown) => void
  ) => {
    const supabase = createClient();
    return subscribeToMessages(supabase, channelId, callback, schema);
  },
  subscribeToUserStatus: (callback: (payload: unknown) => void) => {
    const supabase = createClient();
    return subscribeToUserStatus(supabase, callback, schema);
  },
  subscribeToChannels: (callback: (payload: unknown) => void) => {
    const supabase = createClient();
    return subscribeToChannels(supabase, callback, schema);
  },
});

export type SubscriptionsService = ReturnType<typeof createSubscriptionsService>;