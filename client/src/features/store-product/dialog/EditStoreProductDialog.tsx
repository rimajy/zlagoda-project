import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { StoreProductForm } from '@/features/store-product/StoreProductForm'
import { useUpdateStoreProduct } from '@/shared/hooks/store-products/useUpdateStoreProduct'
import {
  StoreProductSchema,
  StoreProductSchemaType,
} from '@/shared/schemas/store-product.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'

export const EditStoreProductDialog = () => {
  const { closeModal, modal, storeProduct } = useStoreProductModal()
  const { mutateAsync: updateStoreProduct } = useUpdateStoreProduct()

  const form = useForm({
    defaultValues: {
      id_product: storeProduct!.id_product,
      selling_price: +storeProduct!.selling_price,
      products_number: storeProduct!.products_number,
      promotional_product: storeProduct!.promotional_product,
    },
    mode: 'onChange',
    resolver: zodResolver(StoreProductSchema),
  })
  const submitHandler = async (data: StoreProductSchemaType) => {
    if (!storeProduct) return

    try {
      const updatedStoreProduct = await updateStoreProduct({
        ...data,
        storeProductUPC: storeProduct.upc,
      })
      toast.success(`Store product #${storeProduct.upc} updated successfully`)
      form.reset(updatedStoreProduct)
      closeModal()
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  useEffect(() => {
    console.log(form.getValues())
    if (storeProduct !== undefined) {
      form.reset({
        ...storeProduct,
        selling_price: +storeProduct!.selling_price,
      })
    }
  }, [form, storeProduct])

  return (
    <Dialog
      modal={false}
      open={modal === 'update'}
      onOpenChange={() => {
        closeModal()
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Update store product</DialogTitle>
        </DialogHeader>
        <StoreProductForm
          form={form}
          onSubmit={submitHandler}
          buttonText='Update'
        />
      </DialogContent>
    </Dialog>
  )
}
