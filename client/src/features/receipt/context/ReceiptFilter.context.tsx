'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'


interface ReceiptFilterContextType {
  employee_id?: string
  startDate?: Date
  endDate?: Date,
  productId?: number,
  setProductId: (productId?: number) => void
  setEmployeeId: (employee_id?: string) => void
  setStartDate: (startDate?: Date) => void
  setEndDate: (endDate?: Date) => void
  clear(): void
}
export const ReceiptFilterContext = createContext<ReceiptFilterContextType>({
  employee_id: undefined,
  startDate: undefined,
  endDate: undefined,
  productId: undefined,
  setProductId: () => {},
  setEmployeeId: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  clear: () => {},
})

export const ReceiptFilterProvider = ({ children }: PropsWithChildren) => {
  const [employeeId, setEmployeeId] = useState<string | undefined>(
    undefined,
  )
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [productId, setProductId] = useState<number | undefined>(undefined)

  const clear = () => {
    setStartDate(undefined)
    setEndDate(undefined)
    setEmployeeId(undefined)
    setProductId(undefined)
  }

  return (
    <ReceiptFilterContext.Provider
      value={{
        employee_id: employeeId,
        productId,
        setProductId,
        startDate,
        endDate,
        setEmployeeId,
        setStartDate,
        setEndDate,
        clear,
      }}
    >
      {children}
    </ReceiptFilterContext.Provider>
  )
}

export const useReceiptFilter = () => {
  const context = useContext(ReceiptFilterContext)
  if (!context) {
    throw new Error(
      'useReceiptFilter must be used within a ReceiptFilterProvider',
    )
  }
  return context
}
