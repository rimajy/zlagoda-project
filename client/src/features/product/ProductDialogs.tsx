'use client'

import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useProductModal } from '@/features/product/context/ProductModals.context'
import { CreateProductDialog } from '@/features/product/dialog/CreateProductDialog'

import { DeleteProductDialog } from './dialog/DeleteProductDialog'
import { EditProductDialog } from './dialog/EditProductDialog'

export const ProductDialogs = () => {
  const { product, openModal } = useProductModal()

  return (
    <>
      {product !== undefined && (
        <>
          <EditProductDialog />
          <DeleteProductDialog />
        </>
      )}

      <CreateProductDialog />

      <div className='fixed bottom-8 right-8'>
        <Button
          className='w-12 h-12'
          onClick={() => openModal('add', undefined)}
        >
          <CirclePlus />
        </Button>
      </div>
    </>
  )
}
