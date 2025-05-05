import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import { Message } from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';

export async function getMessages(
  supabase: SupabaseClient,
  channelId: number,
  limit = 100,
  startIndex = 0,
  schema = 'chat_app'
): Promise<RequestResponse<Message[]>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('messages')
    .select('*, users:user_id(username)')
    .eq('channel_id', channelId)
    .order('created_at', { ascending: false })
    .range(startIndex, startIndex + limit - 1);

  if (error) {
    console.error('Error fetching messages:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Messages fetched successfully',
    data: data as Message[],
  };
}

export async function sendMessage(
  supabase: SupabaseClient,
  channelId: number,
  userId: string,
  content: string,
  schema = 'chat_app'
): Promise<RequestResponse<Message>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('messages')
    .insert({
      channel_id: channelId,
      user_id: userId,
      content,
    })
    .select('*, users:user_id(username)')
    .single();

  if (error) {
    console.error('Error sending message:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Message sent successfully',
    data: data as Message,
  };
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
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<null>> {
  // Check if user is the author of the message or has admin privileges
  const { data: message, error: fetchError } = await supabase
    .schema(schema)
    .from('messages')
    .select('user_id')
    .eq('id', messageId)
    .single();

  if (fetchError) {
    console.error('Error fetching message:', fetchError);
    return {
      error: true,
      message: fetchError.message,
    };
  }

  const isAuthor = message.user_id === userId;

  if (!isAuthor) {
    // Check if user has permission to delete others' messages
    const { data: hasPermission, error: permissionError } = await supabase.rpc(
      'authorize',
      {
        requested_permission: 'messages.delete',
        user_id: userId,
        schemaName: schema,
      }
    );

    if (permissionError) {
      console.error('Error checking permission:', permissionError);
      return {
        error: true,
        message: permissionError.message,
      };
    }

    if (!hasPermission) {
      return {
        error: true,
        message: 'You do not have permission to delete this message',
      };
    }
  }

  const { error } = await supabase
    .schema(schema)
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) {
    console.error('Error deleting message:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Message deleted successfully',
    data: null,
  };
}

export const createMessagesService = (
  createClient: ReturnType<typeof createServerClient>,
  schema = 'chat_app'
) => ({
  getMessages: async (channelId: number, limit = 100, startIndex = 0) =>
    getMessages(await createClient(), channelId, limit, startIndex, schema),
  sendMessage: async (channelId: number, userId: string, content: string) =>
    sendMessage(await createClient(), channelId, userId, content, schema),
  updateMessage: async (messageId: number, message: string) =>
    updateMessage(await createClient(), messageId, message, schema),
  deleteMessage: async (messageId: number, userId: string) =>
    deleteMessage(await createClient(), messageId, userId, schema),
});

export type MessagesService = ReturnType<typeof createMessagesService>;
