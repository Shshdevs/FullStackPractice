import { z } from 'zod'

export const zCreateIdeaTrpcInput = z.object({
  name: z.string().min(1, 'Name can not be empty').max(20, 'Name is too long!'),
  nick: z
    .string()
    .min(1, 'Nick can not be empty')
    .regex(/^[a-z0-9-]+$/, 'Nick may contains only lowercase latters, numbers and dashers'),
  description: z.string().min(1, 'Description can not be empty'),
  text: z.string().min(10, 'Text mush contain at least 10 characters'),
})
