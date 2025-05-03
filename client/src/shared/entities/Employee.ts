export interface Employee {
  id_employee: string
  empl_surname: string
  empl_name: string
  empl_patronymic: string | null
  empl_role: EmployeeRole
  salary: number
  date_of_birth: Date
  date_of_start: Date
  phone_number: string
  city: string
  street: string
  zip_code: string
}

export enum EmployeeRole {
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
}
