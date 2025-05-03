import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { useGetStoreProductByUpc } from '@/shared/hooks/store-products/useGetStoreProductByUpc'
import { Skeleton } from '@/components/ui/skeleton'

export const InfoStoreProductDialog = () => {
  const { closeModal, modal, upc } = useStoreProductModal()
  const { data: storeProduct, isLoading, isSuccess, isError } = useGetStoreProductByUpc(upc)

  const openChangeHandler = (open: boolean) => {
    if (!open) {
      window.history.pushState(null, '', '/dashboard/store-products')
      closeModal()
    }
  }

  return (
    <Dialog modal={false} open={modal === 'info'} onOpenChange={openChangeHandler}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Store product</DialogTitle>
        </DialogHeader>
        {isSuccess && (
          <div className="flex flex-col gap-2 justify-start">
            <p>
              Store Product ID:&nbsp;
              <span className="text-gray-600">{storeProduct!.upc}</span>
            </p>
            <p>
              Product:&nbsp;
              {storeProduct!.product!.product_name} <span
              className="text-gray-600">{storeProduct!.product!.id_product}</span>
            </p>
            <p>
              Selling Price:&nbsp;
              {storeProduct!.selling_price}
            </p>
            <p>
              Products Number:&nbsp;
              {storeProduct!.products_number}
            </p>
            <p>
              Promotional:&nbsp;
              {storeProduct!.promotional_product ? 'TRUE' : 'FALSE'}
            </p>
          </div>
        )}
        {isLoading && (<Skeleton className="h-[250px] w-full rounded-2xl"/>)}
        {isError && (<h1 className="text-2xl h-[250px] flex items-center justify-center">404 Not Found</h1>)}
      </DialogContent>
    </Dialog>
  )
}