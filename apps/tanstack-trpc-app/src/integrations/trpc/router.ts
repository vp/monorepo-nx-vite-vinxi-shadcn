import { TRPCError } from '@trpc/server'
import { createTRPCRouter, publicProcedure } from './init'
import type { TRPCRouterRecord } from '@trpc/server'
// import { z } from 'zod'


const peopleRouter = {
  list: publicProcedure.query(async () =>
  [
    { name: 'Luke Skywalker' },
    { name: 'Darth Vader' },
    { name: 'Leia Organa' },
    { name: 'Han Solo' },
    { name: 'Chewbacca' },
  ]
  ),
} satisfies TRPCRouterRecord

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
})
export type TRPCRouter = typeof trpcRouter
