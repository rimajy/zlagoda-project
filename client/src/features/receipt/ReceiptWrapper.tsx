import { PropsWithChildren } from 'react'

import { ReceiptFilterProvider } from '@/features/receipt/context/ReceiptFilter.context'
import { ReceiptModalProvider } from '@/features/receipt/context/ReceiptModals.context'

export const ReceiptWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ReceiptFilterProvider>
      <ReceiptModalProvider>
        {children}
      </ReceiptModalProvider>
    </ReceiptFilterProvider>
  )
}
