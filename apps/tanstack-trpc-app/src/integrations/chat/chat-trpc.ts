import { userService } from '../user/user-service';
import {
  channelsService,
  messagesService,
  subscriptionsService,
  userManagementService,
} from './chat-service';

export const createChatTRPCContext = () => ({
  getUser: async () => await userService.getUser(),
  channelsService,
  messagesService,
  userManagementService,
  subscriptionsService
});
