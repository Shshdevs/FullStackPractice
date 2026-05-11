import { initTRPC } from '@trpc/server'

const ideas = [
  {
    nick: 'first-idea',
    name: 'Idea 1',
    desription: 'Some first idea description',
  },
  {
    nick: 'second-idea',
    name: 'Idea 2',
    desription: 'Some second idea description',
  },
  {
    nick: 'third-idea',
    name: 'Idea 3',
    desription: 'Some third idea description',
  },
]

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => {
    return { ideas }
  }),
})

export type TrpcRouter = typeof trpcRouter
