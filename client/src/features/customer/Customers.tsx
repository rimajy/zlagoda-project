'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCustomerFilter } from '@/features/customer/context/CustomerFilter.context'
import { CustomerDialogs } from '@/features/customer/CustomerDialogs'
import { CustomerFilter } from '@/features/customer/CustomerFilter'
import { CustomerList } from '@/features/customer/CustomerList'

export const Customers = () => {
  const { surnameSort, setSurnameSort } = useCustomerFilter()

  const nameColumnClickHandler = () => {
    if (surnameSort === undefined) {
      setSurnameSort('ASC')
    } else if (surnameSort === 'ASC') {
      setSurnameSort('DESC')
    } else if (surnameSort === 'DESC') {
      setSurnameSort(undefined)
    }
  }

  return (
    <div>
      <CustomerFilter />
      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Card Number</TableHead>
            <TableHead
              onClick={nameColumnClickHandler}
              className='flex justify-between items-center'
            >
              Surname
              <span>
                {surnameSort !== undefined &&
                  (surnameSort === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
              </span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className='text-center'>Phone</TableHead>
            <TableHead className='text-center'>Percent</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <CustomerList />
        </TableBody>
      </Table>
      <CustomerDialogs />
    </div>
  )
}
