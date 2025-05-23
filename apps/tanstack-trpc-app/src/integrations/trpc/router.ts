import {
  getTRPCInstance,
} from '@workspace/trpc/init';
import type { TRPCRouterRecord } from '@trpc/server';
import { createUserRouter } from '@workspace/user-trpc/router';
import { createTodosRouter } from '@workspace/todos-trpc/router';
import { createChatRouter } from '@workspace/chat-trpc/router';
// import { z } from 'zod'

const t = getTRPCInstance();
const createTRPCRouter = t.router;

const userRouter = createUserRouter();
const todosRouter = createTodosRouter();
const chatRouter = createChatRouter();

const peopleRouter = {
  list: t.procedure.query(async () =>
    fetch('https://swapi.info/api/people')
      .then((res) => res.json())
      .then((d) => d as Array<{ name: string }>)
  ),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
  user: userRouter,
  todos: todosRouter,
  chat: chatRouter,
});

export type TRPCRouter = typeof trpcRouter;
