'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { GetStoreProductsFilters } from '@/shared/services/storeProduct.service'

interface StoreProductFilterContextType
  extends Omit<GetStoreProductsFilters, 'productInfo'> {
  setSortByAmount(order: 'ASC' | 'DESC' | undefined): void
  setSortByName(order: 'ASC' | 'DESC' | undefined): void
  setPromotionalProduct(promotional: boolean | undefined): void
  clear(): void
}
export const StoreStoreProductFilterContext =
  createContext<StoreProductFilterContextType>({
    setSortByAmount: () => {},
    setSortByName: () => {},
    setPromotionalProduct: () => {},
    clear: () => {},
    sortByName: undefined,
    sortByAmount: undefined,
    promotionalProduct: undefined,
  })

export const StoreProductFilterProvider = ({ children }: PropsWithChildren) => {
  const [sortByName, setSortByName] = useState<'ASC' | 'DESC' | undefined>(
    undefined,
  )
  const [sortByAmount, setSortByAmount] = useState<'ASC' | 'DESC' | undefined>(
    undefined,
  )
  const [promotionalProduct, setPromotionalProduct] = useState<
    boolean | undefined
  >(undefined)

  const clear = () => {
    setSortByName(undefined)
    setSortByAmount(undefined)
    setPromotionalProduct(undefined)
  }

  return (
    <StoreStoreProductFilterContext.Provider
      value={{
        clear,
        sortByAmount,
        sortByName,
        promotionalProduct,
        setSortByAmount,
        setSortByName,
        setPromotionalProduct,
      }}
    >
      {children}
    </StoreStoreProductFilterContext.Provider>
  )
}

export const useStoreProductFilter = () => {
  const context = useContext(StoreStoreProductFilterContext)
  if (!context) {
    throw new Error(
      'useStoreProductFilter must be used within a StoreProductFilterProvider',
    )
  }
  return context
}
