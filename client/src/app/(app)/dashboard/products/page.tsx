import { Products } from '@/features/product/Products'
import { ProductsWrapper } from '@/features/product/ProductsWrapper'

export default function Page() {
  return (
    <ProductsWrapper>
      <Products />
    </ProductsWrapper>
  )
}
