import { SupabaseClient } from '@supabase/supabase-js';

export function subscribeToMessages(
  supabase: SupabaseClient,
  channelId: number,
  callback: (payload: any) => void,
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
  callback: (payload: any) => void,
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
  callback: (payload: any) => void,
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