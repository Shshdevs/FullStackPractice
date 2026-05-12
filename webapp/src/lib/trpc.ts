import type { TrpcRouter } from '@fullstackpractice/backend/src/router/index'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<TrpcRouter>()
