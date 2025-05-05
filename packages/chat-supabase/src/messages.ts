import { SupabaseClient } from '@supabase/supabase-js';
import { Message } from '@workspace/chat-supabase/types';

export async function getMessages(
  supabase: SupabaseClient,
  channelId: number,
  limit = 100,
  schema = 'chat_app'
): Promise<Message[]> {
  const { data, error } = await supabase
    .schema(schema)
    .from('messages')
    .select('*')
    .eq('channel_id', channelId)
    .order('inserted_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error(`Error fetching messages for channel ${channelId}:`, error);
    return [];
  }

  return data || [];
}

export async function sendMessage(
  supabase: SupabaseClient,
  channelId: number,
  userId: string,
  message: string,
  schema = 'chat_app'
): Promise<Message | null> {
  const { data, error } = await supabase
    .schema(schema)
    .from('messages')
    .insert({
      channel_id: channelId,
      user_id: userId,
      message,
    })
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return null;
  }

  return data;
}

export async function updateMessage(
  supabase: SupabaseClient,
  messageId: number,
  message: string,
  schema = 'chat_app'
): Promise<Message | null> {
  const { data, error } = await supabase
    .schema(schema)
    .from('messages')
    .update({ message })
    .eq('id', messageId)
    .select()
    .single();

  if (error) {
    console.error(`Error updating message ${messageId}:`, error);
    return null;
  }

  return data;
}

export async function deleteMessage(
  supabase: SupabaseClient,
  messageId: number,
  schema = 'chat_app'
): Promise<boolean> {
  const { error } = await supabase
    .schema(schema)
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) {
    console.error(`Error deleting message ${messageId}:`, error);
    return false;
  }

  return true;
}