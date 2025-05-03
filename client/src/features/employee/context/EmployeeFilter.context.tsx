'use client'

import { createContext, PropsWithChildren, useContext, useState } from 'react'

interface EmployeeFilterContextType {
  sortOrder?: 'ASC' | 'DESC'
  setSortOrder(order: 'ASC' | 'DESC' | undefined): void

  surname?: string
  setSurname(name: string | undefined): void

  clear(): void
}
export const EmployeeFilterContext = createContext<EmployeeFilterContextType>({
  sortOrder: undefined,
  setSortOrder: () => {},
  surname: undefined,
  setSurname: () => {},
  clear: () => {},
})

export const EmployeeFilterProvider = ({ children }: PropsWithChildren) => {
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>(
    undefined,
  )
  const [surname, setSurname] = useState<string | undefined>(undefined)

  const clear = () => {
    setSortOrder(undefined)
    setSurname(undefined)
  }

  return (
    <EmployeeFilterContext.Provider
      value={{
        sortOrder,
        surname,
        setSortOrder,
        setSurname,
        clear,
      }}
    >
      {children}
    </EmployeeFilterContext.Provider>
  )
}

export const useEmployeeFilter = () => {
  const context = useContext(EmployeeFilterContext)
  if (!context) {
    throw new Error(
      'useEmployeeFilter must be used within a EmployeeFilterProvider',
    )
  }
  return context
}
