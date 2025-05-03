import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { setUrlSearchParams } from '@/shared/utils/set-url-search-params'
import { Receipt } from '../entities/receipt'
import { ReceiptSchemaType } from '@/shared/schemas/receipt.schema'

export interface GetReceiptsFilters {
  employee_id?: string
  startDate?: Date,
  endDate?: Date
}

export interface GetSoldProductsCountFilters {
  productId: number
  startDate?: Date
  endDate?: Date
}

class ReceiptService {
  async getReceipts(filters: GetReceiptsFilters): Promise<Receipt[]> {
    const url = new URL(`${API_BASE_URL}receipt`)
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
  async deleteReceipt(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}receipt/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
  }
  async createReceipt(receipt: ReceiptSchemaType): Promise<Receipt> {
    const response = await fetch(`${API_BASE_URL}receipt`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(receipt),
    });

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async getTotalSum(filters: GetReceiptsFilters): Promise<{ totalSum: number }> {
    const url = new URL(`${API_BASE_URL}receipt/sum`)
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
  async getSoldProductsCount(filters: GetSoldProductsCountFilters): Promise<{ productCount: number }> {
    const url = new URL(`${API_BASE_URL}receipt/sold-products`)
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
  async getReceiptById(id: string): Promise<Receipt> {
    const response = await fetch(`${API_BASE_URL}receipt/${id}`, {
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
  async getMyRecentReceipts(): Promise<Receipt[]>{
    const response = await fetch(`${API_BASE_URL}receipt/me/last`, {
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
  async getReceiptSummaryByCategories(): Promise<{category_name: string, total_sales: number, category_number: number}[]> {
    const response = await fetch(`${API_BASE_URL}receipt/summary-by-categories`, {
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

export const receiptService = new ReceiptService();