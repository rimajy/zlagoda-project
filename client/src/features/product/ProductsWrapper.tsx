import { PropsWithChildren } from 'react'

import { ProductFilterProvider } from '@/features/product/context/ProductFilter.context'
import { ProductModalProvider } from '@/features/product/context/ProductModals.context'

export const ProductsWrapper = ({ children }: PropsWithChildren) => {
  return (
    <ProductFilterProvider>
      <ProductModalProvider>{children}</ProductModalProvider>
    </ProductFilterProvider>
  )
}
