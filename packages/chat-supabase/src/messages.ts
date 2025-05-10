import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import {
  Message,
  MessageChangeEvent,
  MessageToAdd,
  MessageToDelete,
  MessageToUpdate,
} from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@workspace/chat-supabase/database.types';

export async function getMessages(
  supabase: SupabaseClient<Database>,
  channel_id: number,
  limit = 100,
  startIndex = 0,
  schema = 'chat_app'
): Promise<RequestResponse<Message[]>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('messages')
    .select(
      'id, message, channel_id, inserted_at, user_id, author:user_id(username)'
    )
    .eq('channel_id', channel_id)
    .order('inserted_at', { ascending: true })
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
    data,
  };
}

export async function getMessage(
  supabase: SupabaseClient<Database>,
  messageId: number,
  schema = 'chat_app'
): Promise<RequestResponse<Message>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('messages')
    .select(
      'id, message, channel_id, inserted_at, user_id, author:user_id(username)'
    )
    .eq('id', messageId)
    .single();
  if (error) {
    console.error('Error fetching message:', error);
    return {
      error: true,
      message: error.message,
    };
  }
  return {
    error: false,
    message: 'Message fetched successfully',
    data,
  };
}

export async function sendMessage(
  supabase: SupabaseClient<Database>,
  { channel_id, message, user_id }: MessageToAdd,
  schema = 'chat_app'
): Promise<RequestResponse<Message>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('messages')
    .insert({
      channel_id,
      user_id,
      message,
    })
    .select(
      'id, message, channel_id, inserted_at, user_id, author:user_id(username)'
    )
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
    data,
  };
}

export async function updateMessage(
  supabase: SupabaseClient<Database>,
  { id: messageId, message }: MessageToUpdate,
  schema = 'chat_app'
): Promise<RequestResponse<Message>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('messages')
    .update({ message })
    .eq('id', messageId)
    .select(
      'id, message, channel_id, inserted_at, user_id, author:user_id(username)'
    )
    .single();

  if (error) {
    console.error('Error updating message:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Message updated successfully',
    data,
  };
}

export async function deleteMessage(
  supabase: SupabaseClient<Database>,
  { message_id: messageId, user_id: userId }: MessageToDelete,
  schema = 'chat_app'
): Promise<RequestResponse<null>> {
  // Check if user is the author of the message or has admin privileges
  const { data: message, error: fetchError } = await supabase
    .schema(schema as keyof Database)
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
    const { data: hasPermission, error: permissionError } = await supabase
      .schema(schema as keyof Database)
      .rpc('authorize', {
        requested_permission: 'messages.delete',
        user_id: userId,
      });

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
    .schema(schema as keyof Database)
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

export function listenToMessages(
  supabase: SupabaseClient<Database>,
  channelId: number,
  callback: (payload: MessageChangeEvent) => void,
  schema = 'chat_app'
): {
  unsubscribe: () => void;
} {
  const messageListener = supabase
    .channel(`${schema}:messages:channel_id=${channelId}`) // Use schema to create a unique channel name
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema,
        table: 'messages',
        filter: `channel_id=eq.${channelId}`,
      },
      (payload) => callback({ event: 'INSERT', data: payload.new as Message })
    )
    .on(
      'postgres_changes',
      {
        event: 'DELETE',
        schema,
        table: 'messages',
        filter: `channel_id=eq.${channelId}`,
      },
      (payload) => callback({ event: 'DELETE', data: payload.old as Message })
    )
    .subscribe();

  return {
    unsubscribe: () => messageListener.unsubscribe(),
  };
}

export const createMessagesService = (
  createClient: ReturnType<typeof createServerClient>,
  schema = 'chat_app'
) => ({
  getMessages: async (channelId: number, limit = 100, startIndex = 0) =>
    getMessages(await createClient(), channelId, limit, startIndex, schema),
  getMessage: async (messageId: number) =>
    getMessage(await createClient(), messageId, schema),
  sendMessage: async (data: MessageToAdd) =>
    sendMessage(await createClient(), data, schema),
  updateMessage: async (data: MessageToUpdate) =>
    updateMessage(await createClient(), data, schema),
  deleteMessage: async (data: MessageToDelete) =>
    deleteMessage(await createClient(), data, schema),
  listenToMessages: async (
    channelId: number,
    callback: (payload: MessageChangeEvent) => void
  ) => listenToMessages(await createClient(), channelId, callback, schema),
});

export type MessagesService = ReturnType<typeof createMessagesService>;
