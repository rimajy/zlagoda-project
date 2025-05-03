'use client'

import { Pencil, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { TableCell, TableRow } from '@/components/ui/table'
import { useProductFilter } from '@/features/product/context/ProductFilter.context'
import { useProductModal } from '@/features/product/context/ProductModals.context'
import { useCategories } from '@/shared/hooks/category/useCategories'
import { useProducts } from '@/shared/hooks/product/useProducts'

export const ProductList = () => {
  const { name, category_number, sort } = useProductFilter()
  const debouncedName = useDebounce(name, 300);
  const { data: products, isSuccess: isProductsLoaded } = useProducts({
    name: debouncedName,
    category_number,
    sort,
  })
  const { data: categories, isSuccess: isCategoriesLoaded } = useCategories()
  const { openModal } = useProductModal()

  return useMemo(() => {
    if (!isProductsLoaded || !isCategoriesLoaded) return []

    const categoriesNameMap = new Map<number, string>()
    categories!.forEach(category => {
      categoriesNameMap.set(category.category_number, category.category_name)
    })

    return products!.map(product => (
      <TableRow key={product.id_product}>
        <TableCell>{product.id_product}</TableCell>
        <TableCell>{product.product_name}</TableCell>
        <TableCell>
          {categoriesNameMap.get(product.category_number) ?? 'Unknown'}
        </TableCell>
        <TableCell className='text-right truncate max-w-0'>
          {product.characteristics}
        </TableCell>
        <TableCell className='text-right'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('update', product)
            }}
          >
            <Pencil />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('delete', product)
            }}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }, [isProductsLoaded, isCategoriesLoaded, categories, products])
}
