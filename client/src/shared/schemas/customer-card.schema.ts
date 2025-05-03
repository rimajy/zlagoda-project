import { z } from 'zod'

import { optionalString } from '@/shared/utils/zod-helpers'

export const CustomerCardSchema = z.object({
  cust_surname: z
    .string()
    .trim()
    .min(3, 'Customer surname must be at least 3 character long')
    .max(50, 'Customer surname must be at most 50 characters long'),
  cust_name: z
    .string()
    .trim()
    .min(3, 'Customer name must be at least 3 character long')
    .max(50, 'Customer name must be at most 50 characters long'),
  cust_patronymic: optionalString({
    min: [3, 'Customer patronymic must be at least 3 character long'],
    max: [50, 'Customer patronymic must be at most 50 characters long'],
  }),
  phone_number: z
    .string()
    .trim()
    .min(3, 'Phone Number must be at least 3 character long')
    .max(13, 'Phone Number must be at most 13 characters long'),
  city: optionalString({
    min: [3, 'City must be at least 3 character long'],
    max: [50, 'City must be at most 50 characters long'],
  }),
  street: optionalString({
    min: [3, 'Street must be at least 3 character long'],
    max: [50, 'Street must be at most 50 characters long'],
  }),
  zip_code: optionalString({
    min: [3, 'Zip Code must be at least 3 character long'],
    max: [9, 'Zip Code must be at most 50 characters long'],
  }),
  percent: z.number().min(0).max(100),
})

export type CustomerCardSchemaType = z.infer<typeof CustomerCardSchema>
