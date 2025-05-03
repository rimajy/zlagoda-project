'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface CustomerFilterContextType {
  customerSurname: string
  setCustomerSurname: (surname: string) => void
  percent: string
  setPercent: (percent: string) => void
  surnameSort: 'ASC' | 'DESC' | undefined
  setSurnameSort: (sort: 'ASC' | 'DESC' | undefined) => void
  clear: () => void
}

export const CustomerFilterContext = createContext<CustomerFilterContextType>({
  customerSurname: '',
  setCustomerSurname: () => {},
  percent: '',
  setPercent: () => {},
  surnameSort: undefined,
  setSurnameSort: () => {},
  clear: () => undefined,
})

export const CustomerFilterProvider = ({ children }: PropsWithChildren) => {
  const [customerSurname, setCustomerSurname] = useState<string>(
    '',
  )
  const [percent, setPercent] = useState<string>('')
  const [surnameSort, setSurnameSort] = useState<'ASC' | 'DESC' | undefined>(
    undefined,
  )

  const clear = () => {
    setCustomerSurname('')
    setPercent('')
    setSurnameSort(undefined)
  }

  return (
    <CustomerFilterContext.Provider
      value={{
        clear,
        customerSurname,
        setCustomerSurname,
        percent,
        setPercent,
        surnameSort,
        setSurnameSort,
      }}
    >
      {children}
    </CustomerFilterContext.Provider>
  )
}

export const useCustomerFilter = () => {
  const context = useContext(CustomerFilterContext)
  if (!context) {
    throw new Error(
      'useCustomerFilter must be used within a CustomerFilterProvider',
    )
  }
  return context
}
