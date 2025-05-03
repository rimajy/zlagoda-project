'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { StoreProduct } from '@/shared/entities/store-product'

type ModalTypes = 'add' | 'update' | 'delete' | 'info' | undefined

interface StoreProductModalContextType {
  modal: ModalTypes
  openModal(modalType: ModalTypes, storeProduct: StoreProduct | undefined): void
  closeModal(): void
  storeProduct: StoreProduct | undefined,
  upc: string | undefined, // for search by upc
  setUpc: (upc: string) => void
}
export const StoreProductModalContext =
  createContext<StoreProductModalContextType>({
    modal: undefined,
    openModal: (modalType, storeProduct) => {},
    storeProduct: undefined,
    closeModal: () => {},
    upc: undefined,
    setUpc: () => {},
  })

export const StoreProductModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalTypes>(undefined)
  const [upc, setUpc] = useState<string | undefined>(undefined)
  const [storeProduct, setStoreProduct] = useState<StoreProduct | undefined>(
    undefined,
  )

  const openModal = (
    modalType: ModalTypes,
    storeProduct: StoreProduct | undefined = undefined,
  ) => {
    setStoreProduct(storeProduct)
    setModal(modalType)
  }

  const closeModal = () => {
    setModal(undefined)
  }

  return (
    <StoreProductModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        storeProduct,
        upc,
        setUpc,
      }}
    >
      {children}
    </StoreProductModalContext.Provider>
  )
}

export const useStoreProductModal = () => {
  const context = useContext(StoreProductModalContext)
  if (!context) {
    throw new Error(
      'useStoreProductModal must be used within a StoreProductModalProvider',
    )
  }
  return context
}
