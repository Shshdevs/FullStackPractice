import type { TrpcRouter } from '@fullstackpractice/backend/src/trpc'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<TrpcRouter>()
