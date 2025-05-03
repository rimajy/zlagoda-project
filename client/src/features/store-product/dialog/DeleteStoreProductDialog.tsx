import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { useDeleteStoreProduct } from '@/shared/hooks/store-products/useDeleteStoreProduct'
import { ApiError } from '@/shared/types/ApiError'

export const DeleteStoreProductDialog = () => {
  const { storeProduct, closeModal, modal } = useStoreProductModal()
  const { mutateAsync: deleteProduct } = useDeleteStoreProduct()
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = async () => {
    if (!storeProduct) return

    try {
      await deleteProduct(storeProduct.upc)
      toast.success(`Store product "#${storeProduct.upc}" deleted successfully`)
      closeModal()
    } catch (e) {
      const error = e as ApiError
      setIsDisabled(true)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setIsDisabled(false)
  }, [modal])

  return (
    <Dialog modal={false} open={modal === 'delete'} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete store product "#{storeProduct?.upc}"</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type='submit' disabled={isDisabled} onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
