import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { Employee } from '@/shared/entities/employee'
import {
  EmployeeSchemaType,
  EmployeeUpdateSchemaType,
} from '@/shared/schemas/employee.schema'
import { setUrlSearchParams } from '@/shared/utils/set-url-search-params'

export interface GetAllEmployeesFilter {
  sort?: string
  surname?: string
}

class EmployeeService {
  async getCurrentEmployeeInfo(): Promise<Employee> {
    const res = await fetch(API_BASE_URL + 'employee/me', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async getAllEmployees(filters: GetAllEmployeesFilter): Promise<Employee[]> {
    const url = new URL(API_BASE_URL + 'employee')
    setUrlSearchParams(url, filters)

    const res = await fetch(url.toString(), {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async createEmployee(employee: EmployeeSchemaType): Promise<Employee> {
    const res = await fetch(API_BASE_URL + 'employee', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async updateEmployee(
    employee: EmployeeUpdateSchemaType & { id: string },
  ): Promise<Employee> {
    const res = await fetch(API_BASE_URL + 'employee/' + employee.id, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async deleteEmployee(id: string): Promise<void> {
    const res = await fetch(API_BASE_URL + 'employee/' + id, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }

  async getEmployeeThatHaventServedHighDiscountClients(): Promise<Employee[]> {
    const res = await fetch(API_BASE_URL + 'employee/employee-with-no-high-discount-clients', {
      method: 'GET',
      credentials: 'include',
    })
    const data = await res.json()

    if (!res.ok) {
      throw data
    }

    return data
  }
}

export const employeeService = new EmployeeService()
