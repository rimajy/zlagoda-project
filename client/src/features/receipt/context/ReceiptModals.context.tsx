'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { Receipt } from '@/shared/entities/receipt'

// 'closed' modal type is needed to handle state in <ReceiptSearch />
// undefined - default state
// 'closed' - when modal was opened and then closed
type ModalTypes = 'add' | 'info' | 'delete' | undefined | 'closed'

interface ReceiptModalContextType {
  modal: ModalTypes
  openModal(modalType: ModalTypes, receipt: Receipt | undefined): void
  closeModal(): void
  receipt: Receipt | undefined
}
export const ReceiptModalContext = createContext<ReceiptModalContextType>({
  modal: undefined,
  openModal: () => {},
  receipt: undefined,
  closeModal: () => {},
})

export const ReceiptModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalTypes>(undefined)
  const [receipt, setReceipt] = useState<Receipt | undefined>(undefined)

  const openModal = (
    modalType: ModalTypes,
    receipt: Receipt | undefined = undefined,
  ) => {
    setReceipt(receipt)
    setModal(modalType)
  }

  const closeModal = () => {
    setModal('closed')
  }

  return (
    <ReceiptModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        receipt,
      }}
    >
      {children}
    </ReceiptModalContext.Provider>
  )
}

export const useReceiptModal = () => {
  const context = useContext(ReceiptModalContext)
  if (!context) {
    throw new Error(
      'useReceiptModal must be used within a ReceiptModalProvider',
    )
  }
  return context
}
