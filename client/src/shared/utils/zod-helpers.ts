import { z, ZodNullable, ZodString, ZodType, ZodTypeAny } from 'zod'

/**
 * Nullable string schema
 * Automatically converts empty strings to null
 */

interface OptStringOpts {
  min?: [number, string]
  max?: [number, string]
}
export function optionalString(opts: OptStringOpts = {}) {
  let schema: ZodNullable<ZodString> | ZodString = z.string().trim()

  if (opts.min) {
    schema = schema.min(opts.min[0], opts.min[1])
  }
  if (opts.max) {
    schema = schema.max(opts.max[0], opts.max[1])
  }

  schema = schema.nullable()

  return z.preprocess(
    val => ((val + '').trim() === '' ? null : val),
    schema,
  ) as unknown as ZodNullable<ZodString> | ZodString
}
