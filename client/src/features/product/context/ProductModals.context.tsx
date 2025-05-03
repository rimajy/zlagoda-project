'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { ProductFilterContext } from '@/features/product/context/ProductFilter.context'
import { Product } from '@/shared/entities/product'
import { GetProductsFilters } from '@/shared/services/product.service'

type ModalTypes = 'add' | 'update' | 'delete' | undefined

interface ProductModalContextType {
  modal: ModalTypes
  openModal(modalType: ModalTypes, product: Product | undefined): void
  closeModal(): void
  product: Product | undefined
}
export const ProductModalContext = createContext<ProductModalContextType>({
  modal: undefined,
  openModal: (modalType, product) => {},
  product: undefined,
  closeModal: () => {},
})

export const ProductModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalTypes>(undefined)
  const [product, setProduct] = useState<Product | undefined>(undefined)

  const openModal = (
    modalType: ModalTypes,
    product: Product | undefined = undefined,
  ) => {
    setProduct(product)
    setModal(modalType)
  }

  const closeModal = () => {
    setModal(undefined)
  }

  return (
    <ProductModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        product,
      }}
    >
      {children}
    </ProductModalContext.Provider>
  )
}

export const useProductModal = () => {
  const context = useContext(ProductModalContext)
  if (!context) {
    throw new Error(
      'useProductModal must be used within a ProductModalProvider',
    )
  }
  return context
}
