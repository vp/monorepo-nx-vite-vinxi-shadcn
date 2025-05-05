import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import { Channel } from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';

export async function getChannels(
  supabase: SupabaseClient,
  schema = 'chat_app'
): Promise<RequestResponse<Channel[]>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching channels:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Channels fetched successfully',
    data: data as Channel[],
  };
}

export async function getChannel(
  supabase: SupabaseClient,
  channelId: number,
  schema = 'chat_app'
): Promise<RequestResponse<Channel>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .select('*')
    .eq('id', channelId)
    .single();

  if (error) {
    console.error('Error fetching channel:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Channel fetched successfully',
    data: data as Channel,
  };
}

export async function createChannel(
  supabase: SupabaseClient,
  name: string,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<Channel>> {
  const { data, error } = await supabase
    .schema(schema)
    .from('channels')
    .insert({ name, created_by: userId })
    .select()
    .single();

  if (error) {
    console.error('Error creating channel:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Channel created successfully',
    data: data as Channel,
  };
}

export async function deleteChannel(
  supabase: SupabaseClient,
  channelId: number,
  userId: string,
  schema = 'chat_app'
): Promise<RequestResponse<null>> {
  // Check permission first
  const { data: hasPermission, error: permissionError } = await supabase.rpc(
    'authorize',
    {
      requested_permission: 'channels.delete',
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
      message: 'You do not have permission to delete channels',
    };
  }

  const { error } = await supabase
    .schema(schema)
    .from('channels')
    .delete()
    .eq('id', channelId);

  if (error) {
    console.error('Error deleting channel:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Channel deleted successfully',
    data: null,
  };
}

export const createChannelsService = (
  createClient: ReturnType<typeof createServerClient>,
  schema = 'chat_app'
) => ({
  getChannels: async () => getChannels(await createClient(), schema),
  getChannel: async (channelId: number) =>
    getChannel(await createClient(), channelId, schema),
  createChannel: async (name: string, userId: string) =>
    createChannel(await createClient(), name, userId, schema),
  deleteChannel: async (channelId: number, userId: string) =>
    deleteChannel(await createClient(), channelId, userId, schema),
});

export type ChannelsService = ReturnType<typeof createChannelsService>;