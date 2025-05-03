'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { CustomerCard } from '@/shared/entities/customer-card'

type ModalTypes = 'add' | 'update' | 'delete' | 'info' | undefined

interface CustomerModalContextType {
  modal: ModalTypes
  openModal(modalType: ModalTypes, customer: CustomerCard | undefined): void
  closeModal(): void
  customer: CustomerCard | undefined
}
export const CustomerModalContext = createContext<CustomerModalContextType>({
  modal: undefined,
  openModal: (modalType, customer) => {},
  customer: undefined,
  closeModal: () => {},
})

export const CustomerModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalTypes>(undefined)
  const [customer, setCustomer] = useState<CustomerCard | undefined>(undefined)

  const openModal = (
    modalType: ModalTypes,
    product: CustomerCard | undefined = undefined,
  ) => {
    setCustomer(product)
    setModal(modalType)
  }

  const closeModal = () => {
    setModal(undefined)
  }

  return (
    <CustomerModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        customer,
      }}
    >
      {children}
    </CustomerModalContext.Provider>
  )
}

export const useCustomerModal = () => {
  const context = useContext(CustomerModalContext)
  if (!context) {
    throw new Error(
      'useCustomerModal must be used within a CustomerModalProvider',
    )
  }
  return context
}
