import { LinkProps } from '@tanstack/react-router';
import {
  RequestResponse,
  SimpleRequestResponse,
} from '@workspace/core/request';

export type Channel = {
  id: number;
  slug: string;
  created_by: number;
  inserted_at: string;
};

export type ChannelWithLink = Channel & {
  link: LinkProps;
};

export type User = {
  id: number;
  role: string;
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
  message: string;
  channel_id: number;
  user_id: number;
  inserted_at: string;
  author: {
    username: string | null;
  };
};

export type MessageToAdd = {
  message: string;
  channel_id: number;
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
