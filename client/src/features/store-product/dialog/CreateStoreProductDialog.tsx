import * as React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { SelectProduct } from '@/components/SelectProduct'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { useCreateStoreProduct } from '@/shared/hooks/store-products/useCreateStoreProduct'
import {
  StoreProductSchema,
  StoreProductSchemaType,
} from '@/shared/schemas/store-product.schema'
import { ApiError } from '@/shared/types/ApiError'

import { StoreProductForm } from '../StoreProductForm'
import { zodResolver } from '@hookform/resolvers/zod'

export const CreateStoreProductDialog = () => {
  const { modal, closeModal } = useStoreProductModal()

  const form = useForm({
    defaultValues: {
      id_product: undefined,
      selling_price: undefined,
      products_number: undefined,
      promotional_product: false,
    },
    mode: 'onChange',
    resolver: zodResolver(StoreProductSchema),
  })
  const { mutateAsync: createStoreProduct } = useCreateStoreProduct()

  const submitHandler = async (data: StoreProductSchemaType) => {
    try {
      await createStoreProduct(data)
      toast.success(`Store product created successfully`)
      form.reset()
      closeModal()
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  return (
    <Dialog
      modal={false}
      open={modal === 'add'}
      onOpenChange={() => {
        closeModal()
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create store product</DialogTitle>
        </DialogHeader>
        <StoreProductForm
          form={form}
          onSubmit={submitHandler}
          buttonText='Create'
        />
      </DialogContent>
    </Dialog>
  )
}
