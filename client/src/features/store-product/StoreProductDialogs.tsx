'use client'

import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { CreateStoreProductDialog } from '@/features/store-product/dialog/CreateStoreProductDialog'

import { DeleteStoreProductDialog } from './dialog/DeleteStoreProductDialog'
import { EditStoreProductDialog } from './dialog/EditStoreProductDialog'
import { InfoStoreProductDialog } from '@/features/store-product/dialog/InfoStoreProductDialog'

export const StoreProductDialogs = () => {
  const { storeProduct, openModal } = useStoreProductModal()

  return (
    <>
      {storeProduct !== undefined && (
        <>
          <EditStoreProductDialog />
          <DeleteStoreProductDialog />
        </>
      )}

      <CreateStoreProductDialog />
      <InfoStoreProductDialog />

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
