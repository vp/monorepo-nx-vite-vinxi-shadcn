import { SupabaseClient } from '@supabase/supabase-js';
import { Channel } from '@workspace/chat-supabase/types';

export async function getChannels(
  supabase: SupabaseClient,
  schema = 'chat_app'
): Promise<Channel[]> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .select('*')
    .order('inserted_at', { ascending: true });

  if (error) {
    console.error('Error fetching channels:', error);
    return [];
  }

  return data || [];
}

export async function getChannel(
  supabase: SupabaseClient,
  channelId: number,
  schema = 'chat_app'
): Promise<Channel | null> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .select('*')
    .eq('id', channelId)
    .single();

  if (error) {
    console.error(`Error fetching channel ${channelId}:`, error);
    return null;
  }

  return data;
}

export async function createChannel(
  supabase: SupabaseClient,
  slug: string,
  userId: string,
  schema = 'chat_app'
): Promise<Channel | null> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .insert({ slug, created_by: userId })
    .select()
    .single();

  if (error) {
    console.error('Error creating channel:', error);
    return null;
  }

  return data;
}

export async function deleteChannel(
  supabase: SupabaseClient,
  channelId: number,
  schema = 'chat_app'
): Promise<boolean> {
  const { error } = await supabase
    .schema(schema)
    .from('channels')
    .delete()
    .eq('id', channelId);

  if (error) {
    console.error(`Error deleting channel ${channelId}:`, error);
    return false;
  }

  return true;
}
