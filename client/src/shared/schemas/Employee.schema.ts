import { z } from 'zod'

import { optionalString } from '@/shared/utils/zod-helpers'

export const EmployeeSchema = z.object({
  login: z
    .string()
    .trim()
    .min(3, 'Login must be at least 3 character long')
    .max(50, 'Login must be at most 50 characters long'),
  password: z
    .string()
    .trim()
    .min(8, 'Password must be at least 8 character long')
    .max(100, 'Password must be at most 100 characters long'),
  empl_surname: z
    .string()
    .trim()
    .min(3, 'Surname must be at least 3 character long')
    .max(50, 'Surname must be at most 50 characters long'),
  empl_name: z
    .string()
    .trim()
    .min(3, 'Name must be at least 3 character long')
    .max(50, 'Name must be at most 50 characters long'),
  empl_patronymic: optionalString({
    min: [1, 'Patronymic must be at least 3 character long'],
    max: [50, 'Patronymic must be at most 50 characters long'],
  }),
  empl_role: z.string().trim(),
  salary: z.number().min(0, 'Salary must be a positive number'),
  date_of_birth: z.date(),
  date_of_start: z.date(),
  phone_number: z
    .string()
    .trim()
    .min(1, 'Phone number must be at least 1 character long')
    .max(13, 'Phone number must be at most 13 characters long'),
  city: z
    .string()
    .trim()
    .min(1, 'City must be at least 1 character long')
    .max(50, 'City must be at most 50 characters long'),
  street: z
    .string()
    .trim()
    .min(1, 'Street must be at least 1 character long')
    .max(50, 'Street must be at most 50 characters long'),
  zip_code: z
    .string()
    .trim()
    .min(1, 'Zip code must be at least 1 character long')
    .max(9, 'Zip code must be at most 9 characters long'),
})

export type EmployeeSchemaType = z.infer<typeof EmployeeSchema>

export const EmployeeUpdateSchema = EmployeeSchema.omit({
  login: true,
  password: true,
}).partial()

export type EmployeeUpdateSchemaType = z.infer<typeof EmployeeUpdateSchema>
