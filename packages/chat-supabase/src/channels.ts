import { SupabaseClient } from '@supabase/supabase-js';
import { RequestResponse } from '@workspace/core/request';
import {
  Channel,
  ChannelToAdd,
  ChannelToDelete,
  ChannelToUpdate,
} from '@workspace/chat-supabase/types';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@workspace/chat-supabase/database.types';

export async function getChannels(
  supabase: SupabaseClient<Database>,
  schema = 'chat_app'
): Promise<RequestResponse<Channel[]>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('channels')
    .select('id, slug, inserted_at, created_by')
    .order('inserted_at', { ascending: true });

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
    data,
  };
}

export async function getChannel(
  supabase: SupabaseClient<Database>,
  channelId: number,
  schema = 'chat_app'
): Promise<RequestResponse<Channel>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('channels')
    .select('id, slug, inserted_at, created_by')
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
    data,
  };
}

export async function createChannel(
  supabase: SupabaseClient<Database>,
  { slug, created_by }: ChannelToAdd,
  schema = 'chat_app'
): Promise<RequestResponse<Channel>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('channels')
    .insert({ slug, created_by })
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

export async function updateChannel(
  supabase: SupabaseClient<Database>,
  { id, slug }: ChannelToUpdate,
  schema = 'chat_app'
): Promise<RequestResponse<Channel>> {
  const { data, error } = await supabase
    .schema(schema as keyof Database)
    .from('channels')
    .update({ slug })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating channel:', error);
    return {
      error: true,
      message: error.message,
    };
  }

  return {
    error: false,
    message: 'Channel updated successfully',
    data,
  };
}

export async function deleteChannel(
  supabase: SupabaseClient<Database>,
  { channel_id, user_id }: ChannelToDelete,
  schema = 'chat_app'
): Promise<RequestResponse<null>> {
  // Check permission first
  const { data: hasPermission, error: permissionError } = await supabase
    .schema(schema as keyof Database)
    .rpc('authorize', {
      requested_permission: 'channels.delete',
      user_id,
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
      message: 'You do not have permission to delete channels',
    };
  }

  const { error } = await supabase
    .schema(schema as keyof Database)
    .from('channels')
    .delete()
    .eq('id', channel_id);

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
  createChannel: async (data: ChannelToAdd) =>
    createChannel(await createClient(), data, schema),
  updateChannel: async (data: ChannelToUpdate) =>
    updateChannel(await createClient(), data, schema),
  deleteChannel: async (data: ChannelToDelete) =>
    deleteChannel(await createClient(), data, schema),
});

export type ChannelsService = ReturnType<typeof createChannelsService>;
