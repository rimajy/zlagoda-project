import { PropsWithChildren } from 'react'

import { CustomerFilterProvider } from '@/features/customer/context/CustomerFilter.context'
import { CustomerModalProvider } from '@/features/customer/context/CustomerModals.context'

export const CustomersWrapper = ({ children }: PropsWithChildren) => {
  return (
    <CustomerFilterProvider>
      <CustomerModalProvider>{children}</CustomerModalProvider>
    </CustomerFilterProvider>
  )
}
