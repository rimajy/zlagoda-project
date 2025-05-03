import 'express'

declare module 'express' {
  interface Request {
    id_employee: string,
    employee: Employee,
  }
}
