'use client'

// Todo: Repeated code, refactor to a shared context
import { createContext, PropsWithChildren, useContext, useState } from 'react'

import { Employee } from '@/shared/entities/employee'

type ModalTypes = 'add' | 'update' | 'delete' | undefined

interface EmployeeModalContextType {
  modal: ModalTypes
  openModal(modalType: ModalTypes, employee: Employee | undefined): void
  closeModal(): void
  employee: Employee | undefined
}
export const EmployeeModalContext = createContext<EmployeeModalContextType>({
  modal: undefined,
  openModal: (modalType, employee) => {},
  employee: undefined,
  closeModal: () => {},
})

export const EmployeeModalProvider = ({ children }: PropsWithChildren) => {
  const [modal, setModal] = useState<ModalTypes>(undefined)
  const [employee, setEmployee] = useState<Employee | undefined>(undefined)

  const openModal = (
    modalType: ModalTypes,
    employee: Employee | undefined = undefined,
  ) => {
    setEmployee(employee)
    setModal(modalType)
  }

  const closeModal = () => {
    setModal(undefined)
  }

  return (
    <EmployeeModalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        employee,
      }}
    >
      {children}
    </EmployeeModalContext.Provider>
  )
}

export const useEmployeeModal = () => {
  const context = useContext(EmployeeModalContext)
  if (!context) {
    throw new Error(
      'useEmployeeModal must be used within a EmployeeModalProvider',
    )
  }
  return context
}
