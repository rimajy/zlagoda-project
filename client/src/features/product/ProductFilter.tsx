'use client'

import { PrintButton } from '@/components/PrintButton'
import { Button } from '@/components/ui/button'

import { SelectCategory } from '@/components/SelectCategory'
import { Input } from '@/components/ui/input'
import { useProductFilter } from '@/features/product/context/ProductFilter.context'
import { usePrintProduct } from '@/shared/hooks/product/usePrintProduct'

export const ProductFilter = () => {
  const { setSearchName, name, category_number, setCategoryNumber, clear } =
    useProductFilter();
  const { printProducts, isLoading } = usePrintProduct();

  return (
    <div className='flex gap-2'>
      <Input
        placeholder='Search'
        value={name}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <SelectCategory
        value={category_number ? category_number + '' : undefined}
        onValueChange={value => setCategoryNumber(+value)}
      />

      <PrintButton onClick={printProducts} disabled={isLoading} />
      <Button onClick={clear}>
        Reset
      </Button>
    </div>
  )
}
