import { PrintButton } from '@/components/PrintButton'
import { Button } from '@/components/ui/button'
import { useStoreProductFilter } from '@/features/store-product/context/StoreProductFilter.context'
import { usePrintStoreProduct } from '@/shared/hooks/store-products/usePrintStoreProduct'
import { StoreProductSearch } from '@/features/store-product/StoreProductSearch'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

export const StoreProductsTopPanel = () => {
  const {printStoreProduct} = usePrintStoreProduct()
  const {clear} = useStoreProductFilter()
  const {isLoading} = useStoreProducts()

  return (
    <div className="flex gap-2 justify-between">
      <StoreProductSearch />
      <div className="flex gap-2">
        <PrintButton onClick={printStoreProduct} disabled={isLoading} />
        <Button onClick={clear}>
          Reset
        </Button>
      </div>
    </div>
  )
}