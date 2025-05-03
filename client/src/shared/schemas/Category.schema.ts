import { z } from 'zod'

export const CategorySchema = z.object({
  category_name: z
    .string()
    .trim()
    .min(1, 'Category name must be at least 1 character long')
    .max(50, 'Category name must be at most 50 characters long'),
})

export type CategorySchemaType = z.infer<typeof CategorySchema>
