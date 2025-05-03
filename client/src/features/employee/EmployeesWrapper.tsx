import { PropsWithChildren } from 'react'

import { EmployeeFilterProvider } from '@/features/employee/context/EmployeeFilter.context'
import { EmployeeModalProvider } from '@/features/employee/context/EmployeeModals.context'

export const EmployeesWrapper = ({ children }: PropsWithChildren) => {
  return (
    <EmployeeFilterProvider>
      <EmployeeModalProvider>{children}</EmployeeModalProvider>
    </EmployeeFilterProvider>
  )
}
