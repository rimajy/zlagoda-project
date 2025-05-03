'use client'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { Pencil, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'
import { useCustomerFilter } from '@/features/customer/context/CustomerFilter.context'
import { useCustomerModal } from '@/features/customer/context/CustomerModals.context'
import { useCustomers } from '@/shared/hooks/customer/useCustomers'

export const CustomerList = () => {
  const { percent, surnameSort, customerSurname } = useCustomerFilter()
  const { openModal } = useCustomerModal()

  const debouncedCustomerSurname = useDebounce(customerSurname, 300);
  const debouncedPercent = useDebounce(percent, 300);

  const {
    data: customers,
    isSuccess: isCustomersLoaded,
    isLoading,
  } = useCustomers({
    percent: +debouncedPercent || undefined,
    sort: surnameSort,
    surname: debouncedCustomerSurname,
  })


  return useMemo(() => {
    if (isLoading || !isCustomersLoaded)
      // TODO: Move to a separated component
      return [
        <TableRow key='loading1'>
          <TableCell colSpan={6} className='text-center'>
            <Skeleton className='h-[40px]' />
          </TableCell>
        </TableRow>,
        <TableRow key='loading2'>
          <TableCell colSpan={6} className='text-center'>
            <Skeleton className='h-[40px]' />
          </TableCell>
        </TableRow>,
        <TableRow key='loading3'>
          <TableCell colSpan={6} className='text-center'>
            <Skeleton className='h-[40px]' />
          </TableCell>
        </TableRow>,
      ]

    // TODO: Move to a separated component
    return customers!.map(customer => (
      <TableRow key={customer.card_number}>
        <TableCell>{customer.card_number}</TableCell>
        <TableCell>{customer.cust_surname}</TableCell>
        <TableCell>{customer.cust_name}</TableCell>
        <TableCell className='text-center'>{customer.phone_number}</TableCell>
        <TableCell className='text-center'>{customer.percent}</TableCell>
        <TableCell className='text-right'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('update', customer)
            }}
          >
            <Pencil />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('delete', customer)
            }}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }, [isLoading, customers, isCustomersLoaded])
}
