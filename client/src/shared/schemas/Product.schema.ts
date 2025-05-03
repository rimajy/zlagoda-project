import { z } from 'zod'

export const ProductSchema = z.object({
  category_number: z.string().trim().nonempty('Category is required'),
  product_name: z
    .string()
    .trim()
    .min(1, 'Product name must be at least 1 character long')
    .max(50, 'Product name must be at most 50 characters long'),
  characteristics: z
    .string()
    .trim()
    .min(1, 'Category characteristics must be at least 1 character long')
    .max(100, 'Category characteristics must be at most 100 characters long'),
})

export type ProductSchemaType = z.infer<typeof ProductSchema>
