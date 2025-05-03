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
import { useProductModal } from '@/features/product/context/ProductModals.context'
import { useDeleteProduct } from '@/shared/hooks/product/useDeleteProduct'
import { ApiError } from '@/shared/types/ApiError'

export const DeleteProductDialog = () => {
  const { product, closeModal, modal } = useProductModal()
  const { mutateAsync: deleteProduct } = useDeleteProduct()
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = async () => {
    if (!product) return

    try {
      await deleteProduct(product.id_product)
      toast.success(`Product "${product.product_name}" deleted successfully`)
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
          <DialogTitle>Delete product "{product?.product_name}"</DialogTitle>
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
