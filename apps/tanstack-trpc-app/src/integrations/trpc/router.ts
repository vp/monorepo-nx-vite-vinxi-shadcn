import {
  getTRPCInstance,
} from '@workspace/trpc/init';
import type { TRPCRouterRecord } from '@trpc/server';
import { createUserRouter } from '@workspace/user-trpc/router';
// import { z } from 'zod'

const t = getTRPCInstance();
const createTRPCRouter = t.router;

const userRouter = createUserRouter();

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
});

export type TRPCRouter = typeof trpcRouter;
