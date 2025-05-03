'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProductFilter } from '@/features/product/context/ProductFilter.context'
import { ProductDialogs } from '@/features/product/ProductDialogs'
import { ProductFilter } from '@/features/product/ProductFilter'
import { ProductList } from '@/features/product/ProductList'

export const Products = () => {
  const { sort, setSortOrder } = useProductFilter()

  const nameColumnClickHandler = () => {
    if (sort === undefined) {
      setSortOrder('ASC')
    } else if (sort === 'ASC') {
      setSortOrder('DESC')
    } else if (sort === 'DESC') {
      setSortOrder(undefined)
    }
  }

  return (
    <div>
      <ProductFilter />
      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Product ID</TableHead>
            <TableHead
              onClick={nameColumnClickHandler}
              className='flex justify-between items-center'
            >
              Name
              <span>
                {sort !== undefined &&
                  (sort === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
              </span>
            </TableHead>
            <TableHead>Category</TableHead>
            <TableHead className='text-right'>Description</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ProductList />
        </TableBody>
      </Table>
      <ProductDialogs />
    </div>
  )
}
