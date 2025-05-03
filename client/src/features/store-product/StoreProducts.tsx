'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useStoreProductFilter } from './context/StoreProductFilter.context'
import { StoreProductDialogs } from './StoreProductDialogs'

import { StoreProductList } from './StoreProductList'
import { StoreProductsTopPanel } from './StoreProductsTopPanel'
import { toggleSortByColumn } from '@/shared/utils/toggle-sort-by-column'

export const StoreProducts = () => {
  const {
    sortByAmount,
    sortByName,
    promotionalProduct,
    setSortByAmount,
    setSortByName,
    setPromotionalProduct,
  } = useStoreProductFilter()

  const amountColumnClickHandler = toggleSortByColumn(
    sortByAmount,
    setSortByAmount,
    ['ASC', 'DESC', undefined],
  )
  const nameColumnClickHandler = toggleSortByColumn(sortByName, setSortByName, [
    'ASC',
    'DESC',
    undefined,
  ])
  const promotionalColumnClickHandler = toggleSortByColumn(
    promotionalProduct,
    setPromotionalProduct,
    [true, false, undefined],
  )

  return (
    <div>
      <StoreProductsTopPanel />
      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[130px]'>UPC</TableHead>
            <TableHead
              onClick={nameColumnClickHandler}
              className='flex items-center'
            >
              Product
              <span>
                {sortByName !== undefined &&
                  (sortByName === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
              </span>
            </TableHead>
            <TableHead className='text-center'>Price</TableHead>
            <TableHead
              onClick={amountColumnClickHandler}
              className='text-center flex justify-center items-center'
            >
              Amount
              <span>
                {sortByAmount !== undefined &&
                  (sortByAmount === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
              </span>
            </TableHead>
            <TableHead
              className='text-center'
              onClick={promotionalColumnClickHandler}
            >
              Promotional?
              <span>
                {promotionalProduct !== undefined &&
                  (promotionalProduct ? ' TRUE' : ' FALSE')}
              </span>
            </TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <StoreProductList />
        </TableBody>
      </Table>
      <StoreProductDialogs />
    </div>
  )
}
