import { trpc } from '../lib/trpc'

// @index('./**/index.ts', f => `import { ${f.path.split('/')[1]}TrpcRoute } from '${f.path}'`)
import { getIdeaTrpcRoute } from './getIdea/index'
import { getIdeasTrpcRoute } from './getIdeas/index'
import { newIdeaTrpcRoute } from './newIdea/index'
//@endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/')[1]}: ${f.path.split('/')[1]}TrpcRoute,`)
  getIdea: getIdeaTrpcRoute,
  getIdeas: getIdeasTrpcRoute,
  newIdea: newIdeaTrpcRoute,
  //@endindex
})

export type TrpcRouter = typeof trpcRouter
