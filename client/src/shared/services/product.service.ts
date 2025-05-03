import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { Product } from '@/shared/entities/product'
import { ProductSchemaType } from '@/shared/schemas/product.schema'
import { setUrlSearchParams } from '@/shared/utils/set-url-search-params'

export interface GetProductsFilters {
  category_number?: number
  name?: string
  sort?: 'ASC' | 'DESC'
}

class ProductService {
  async getProducts(filters: GetProductsFilters): Promise<Product[]> {
    const url = new URL(`${API_BASE_URL}product`)
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
  async createProduct(productSchema: ProductSchemaType): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...productSchema,
        category_number: Number(productSchema.category_number),
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async updateProduct({
    productId,
    ...productSchema
  }: { productId: number } & ProductSchemaType): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}product/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        ...productSchema,
        category_number: Number(productSchema.category_number),
      }),
    })

    const data = await response.json()
    if (!response.ok) {
      throw data
    }
    return data
  }
  async deleteProduct(productId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}product/${productId}`, {
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
    return data
  }
  async getNotSoldProducts(): Promise<{ id_product: number, product_name: string }[]> {
    const url = new URL(`${API_BASE_URL}product/not-sold`)

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
}

export const productService = new ProductService()
