'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { ReactElement, useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useStoreProductFilter } from '@/features/store-product/context/StoreProductFilter.context'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

export const StoreProductList = () => {
  const { sortByAmount, sortByName, promotionalProduct } =
    useStoreProductFilter()
  const { openModal } = useStoreProductModal()
  const { data: storeProducts, isSuccess: isStoreProductsLoaded } =
    useStoreProducts({
      sortByName,
      sortByAmount,
      promotionalProduct,
    })

  return useMemo(() => {
    if (!isStoreProductsLoaded) return []

    return storeProducts!.map(storeProduct => (
      <TableRow key={storeProduct.upc}>
        <TableCell>#{storeProduct.upc}</TableCell>
        <TableCell>{storeProduct.product?.product_name ?? 'Unknown'}</TableCell>
        <TableCell className='text-center'>
          {storeProduct.selling_price}
        </TableCell>
        <TableCell className='text-center'>
          {storeProduct.products_number}
        </TableCell>
        <TableCell className='text-center'>
          {storeProduct.promotional_product ? 'TRUE' : 'FALSE'}
        </TableCell>
        <TableCell className='text-right'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('update', storeProduct)
            }}
          >
            <Pencil />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('delete', storeProduct)
            }}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }, [isStoreProductsLoaded, storeProducts, openModal])
}
