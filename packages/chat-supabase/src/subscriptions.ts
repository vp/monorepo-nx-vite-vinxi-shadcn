import { SupabaseClient } from '@supabase/supabase-js';

export function subscribeToMessages(
  supabase: SupabaseClient,
  channelId: number,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`messages:channel_id=${channelId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'chat_app',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToUserStatus(
  supabase: SupabaseClient,
  callback: (payload: any) => void
) {
  return supabase
    .channel('user_status_changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'chat_app',
        table: 'users',
        filter: `status=eq.ONLINE`,
      },
      callback
    )
    .subscribe();
}

export function subscribeToChannels(
  supabase: SupabaseClient,
  callback: (payload: any) => void
) {
  return supabase
    .channel('channel_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'chat_app', table: 'channels' },
      callback
    )
    .subscribe();
}
