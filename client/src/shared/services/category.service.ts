import { API_BASE_URL } from '@/shared/constants/api-base-url'
import { Category } from '@/shared/entities/category'
import { CategorySchemaType } from '@/shared/schemas/category.schema'

class CategoryService {
  async getAllCategories(sort?: 'ASC' | 'DESC'): Promise<Category[]> {
    const url = new URL(API_BASE_URL + 'category')
    if (sort) {
      url.searchParams.append('sort', sort)
    }

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
  async update(data: {
    category_number: number
    changeData: CategorySchemaType
  }): Promise<Category> {
    const res = await fetch(API_BASE_URL + 'category/' + data.category_number, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.changeData),
    })
    const response = await res.json()

    if (!res.ok) {
      throw response
    }

    return response
  }
  async delete(category_number: number): Promise<Category> {
    const res = await fetch(API_BASE_URL + 'category/' + category_number, {
      method: 'DELETE',
      credentials: 'include',
    })
    const response = await res.json()

    if (!res.ok) {
      throw response
    }

    return response
  }
  async create(data: CategorySchemaType): Promise<Category> {
    const res = await fetch(API_BASE_URL + 'category', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const response = await res.json()

    if (!res.ok) {
      throw response
    }

    return response
  }
}

export const categoryService = new CategoryService()
