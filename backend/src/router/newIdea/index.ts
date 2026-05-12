import { ideas } from '../../lib/ideas'
import { trpc } from '../../lib/trpc'
import { zCreateIdeaTrpcInput } from './input'

export const newIdeaTrpcRoute = trpc.procedure.input(zCreateIdeaTrpcInput).mutation(({ input }) => {
  if (ideas.find((idea) => idea.nick === input.nick)) {
    throw Error('Idea with this nick already exists')
  }
  {
    ideas.unshift({
      name: input.name,
      nick: input.nick,
      description: input.description,
      text: input.text,
    })
  }
  return true
})
