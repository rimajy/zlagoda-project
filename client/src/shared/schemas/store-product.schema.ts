import { z } from 'zod'

export const StoreProductSchema = z.object({
  id_product: z.number().min(0, 'Product id must be set'),
  selling_price: z.number().min(0, 'Selling price must be >= 0'),
  products_number: z.number().min(0, 'Products number must be >= 0'),
  promotional_product: z.boolean(),
})

export type StoreProductSchemaType = z.infer<typeof StoreProductSchema>
