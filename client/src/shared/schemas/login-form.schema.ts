import { z } from 'zod'

export const LoginFormSchema = z.object({
  login: z.string().nonempty('Login is required'),
  password: z.string().nonempty('Password is required'),
})

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>
