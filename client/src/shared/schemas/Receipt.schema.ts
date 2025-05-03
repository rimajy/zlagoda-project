import { z } from 'zod'
import { optionalString } from '@/shared/utils/zod-helpers'

export const ReceiptProductSchema = z.object({
  upc: z.string().min(12, 'UPC must be 12 characters long').max(12, 'UPC must be 12 characters long'),
  products_number: z.number()
    .min(1, 'Products number must be at least 1'),
  selling_price: z.number()
})

export const ReceiptSchema = z.object({
  card_number: optionalString({
    min: [13, 'Card number must be 13 characters long'],
    max: [13, 'Card number must be 13 characters long'],
  }),
  products: z.array(ReceiptProductSchema).min(1, 'At least one product is required'),
})

export type ReceiptSchemaType = z.infer<typeof ReceiptSchema>