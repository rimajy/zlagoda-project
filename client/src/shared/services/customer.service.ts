import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { CustomerCard } from '@/shared/entities/customer-card'
import { CustomerCardSchemaType } from '@/shared/schemas/customer-card.schema'
import { setUrlSearchParams } from '@/shared/utils/set-url-search-params'

export interface GetCustomerFilters {
  percent?: number
  surname?: string
  sort?: 'ASC' | 'DESC'
}

class CustomerService {
  async getCustomers(filters: GetCustomerFilters): Promise<CustomerCard[]> {
    const url = new URL(`${API_BASE_URL}customer-card`)
    setUrlSearchParams(url, filters)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }

  async createCustomer(
    customerCardSchema: CustomerCardSchemaType,
  ): Promise<CustomerCard> {
    const response = await fetch(`${API_BASE_URL}customer-card`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ ...customerCardSchema }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }

  async updateCustomer({
    customerNumber,
    ...customerSchema
  }: {
    customerNumber: string
  } & CustomerCardSchemaType): Promise<CustomerCard> {
    const response = await fetch(
      `${API_BASE_URL}customer-card/${customerNumber}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ ...customerSchema }),
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }

  async deleteCustomer(customerCardNumber: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}customer-card/${customerCardNumber}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }

  async getCustomerById(id: string): Promise<CustomerCard> {
    const response = await fetch(`${API_BASE_URL}customer-card/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
}

export const customerService = new CustomerService()
