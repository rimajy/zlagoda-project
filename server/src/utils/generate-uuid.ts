import * as crypto from "node:crypto";

export function generateUuid(length: number) {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
}
