'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { GetProductsFilters } from '@/shared/services/product.service'

interface ProductFilterContextType extends GetProductsFilters {
  setCategoryNumber(categoryNumber: number): void
  setSearchName(name: string): void
  setSortOrder(order: 'ASC' | 'DESC' | undefined): void
  clear(): void
}
export const ProductFilterContext = createContext<ProductFilterContextType>({
  setCategoryNumber: () => {},
  setSearchName: () => {},
  setSortOrder: () => {},
  clear: () => {},
  category_number: undefined,
  name: '',
  sort: undefined,
})

export const ProductFilterProvider = ({ children }: PropsWithChildren) => {
  const [categoryNumber, setCategoryNumber] = useState<number | undefined>(
    undefined,
  )
  const [name, setName] = useState<string>('')
  const [sort, setSort] = useState<'ASC' | 'DESC' | undefined>(undefined)

  const clear = () => {
    setCategoryNumber(undefined)
    setName('')
    setSort(undefined)
  }

  return (
    <ProductFilterContext.Provider
      value={{
        category_number: categoryNumber,
        name,
        sort,
        setCategoryNumber,
        setSearchName: setName,
        setSortOrder: setSort,
        clear,
      }}
    >
      {children}
    </ProductFilterContext.Provider>
  )
}

export const useProductFilter = () => {
  const context = useContext(ProductFilterContext)
  if (!context) {
    throw new Error(
      'useProductFilter must be used within a ProductFilterProvider',
    )
  }
  return context
}
