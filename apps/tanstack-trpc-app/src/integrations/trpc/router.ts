import { createTRPCRouter, publicProcedure } from '@workspace/trpc/init';
import type { TRPCRouterRecord } from '@trpc/server';
import { createUserRouter } from '@workspace/user-trpc/router';
import { usersService } from '../user/users-service';
// import { z } from 'zod'

const peopleRouter = {
  list: publicProcedure.query(async () =>
    fetch('https://swapi.info/api/people')
      .then((res) => res.json())
      .then((d) => d as Array<{ name: string }>)
  ),
} satisfies TRPCRouterRecord;

const userRouter = createUserRouter(usersService);


export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
  user: userRouter,
});

export type TRPCRouter = typeof trpcRouter;