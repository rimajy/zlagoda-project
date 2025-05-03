import { PropsWithChildren } from 'react'

import { StoreProductFilterProvider } from '@/features/store-product/context/StoreProductFilter.context'
import { StoreProductModalProvider } from '@/features/store-product/context/StoreProductModals.context'

export const StoreProductsWrapper = ({ children }: PropsWithChildren) => {
  return (
    <StoreProductFilterProvider>
      <StoreProductModalProvider>{children}</StoreProductModalProvider>
    </StoreProductFilterProvider>
  )
}
