import { todosService } from './todos-service';
import { userService } from '../user/user-service';

export const createTodosTRPCContext = () => ({
  getUser: async () => await userService.getUser(),
  todosService: todosService,
});
