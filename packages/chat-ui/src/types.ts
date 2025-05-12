import { LinkProps } from '@tanstack/react-router';
import {
  RequestResponse,
  SimpleRequestResponse,
} from '@workspace/core/request';

export type Channel = {
  id: number;
  slug: string;
  created_by: string;
  inserted_at: string;
};

export type ChannelWithLink = Channel & {
  link: LinkProps;
};

export type Role = 'admin' | 'moderator';

export type User = {
  id: string;
  roles: Role[];
};

export type ChannelToAdd = {
  slug: string;
};

export type ChannelToUpdate = {
  id: number;
  slug: string;
};

export type ChannelToDelete = {
  id: number;
};

export type ChannelOnDelete = (
  data: ChannelToDelete
) => Promise<SimpleRequestResponse>;

export type ChannelOnUpdate = (
  channel: ChannelToUpdate
) => Promise<RequestResponse<Channel>>;

export type ChannelOnAdd = (
  channel: ChannelToAdd
) => Promise<RequestResponse<Channel>>;

export type Message = {
  id: number;
  message: string | null;
  channel_id: number;
  user_id: string;
  inserted_at: string;
  author: {
    username: string | null;
  };
};

export type MessageToAdd = {
  message: string;
  channelId: number;
};

export type MessageOnAdd = (
  message: MessageToAdd
) => Promise<RequestResponse<Message>>;

export type MessageToSend = {
  message: string;
};

export type MessageOnSend = (
  message: MessageToSend
) => Promise<RequestResponse<Message>>;

export type MessageToDelete = {
  id: number;
};

export type MessageOnDelete = (
  message: MessageToDelete
) => Promise<SimpleRequestResponse>;
