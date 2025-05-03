import { StoreProducts } from '@/features/store-product/StoreProducts'
import { StoreProductsWrapper } from '@/features/store-product/StoreProductsWrapper'

export default function Page() {
  return (
    <StoreProductsWrapper>
      <StoreProducts />
    </StoreProductsWrapper>
  )
}
