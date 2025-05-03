import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { Product } from '@/shared/entities/product'
import { StoreProduct } from '@/shared/entities/store-product'
import { ProductSchemaType } from '@/shared/schemas/product.schema'
import { StoreProductSchemaType } from '@/shared/schemas/store-product.schema'
import { setUrlSearchParams } from '@/shared/utils/set-url-search-params'

export interface GetStoreProductsFilters {
  sortByAmount?: 'ASC' | 'DESC'
  sortByName?: 'ASC' | 'DESC'
  promotionalProduct?: boolean
  name?: string
}

class StoreProductService {
  async getStoreProducts(
    filters: GetStoreProductsFilters,
  ): Promise<StoreProduct[]> {
    const url = new URL(`${API_BASE_URL}store-product`)
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
  async createStoreProduct(
    storeProductSchema: StoreProductSchemaType,
  ): Promise<StoreProduct> {
    const response = await fetch(`${API_BASE_URL}store-product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(storeProductSchema),
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async updateStoreProduct({
    storeProductUPC,
    ...productSchema
  }: {
    storeProductUPC: string
  } & StoreProductSchemaType): Promise<StoreProduct> {
    const response = await fetch(
      `${API_BASE_URL}store-product/${storeProductUPC}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(productSchema),
      },
    )

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async deleteStoreProduct(storeProductUPC: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}store-product/${storeProductUPC}`,
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
  async getStoreProductByUPC(upc: string): Promise<StoreProduct> {
    const response = await fetch(`${API_BASE_URL}store-product/${upc}`, {
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

export const storeProductService = new StoreProductService()
