'use client'

import { Info, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useReceipts } from '@/shared/hooks/receipt/useReceipts'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'
import { useReceiptFilter } from './context/ReceiptFilter.context'

export const ReceiptList = () => {
  const {openModal} = useReceiptModal()
  const {employee_id, startDate, endDate} = useReceiptFilter();
  const { data: receipts, isSuccess: isReceiptsLoaded } = useReceipts({
    employee_id,
    startDate,
    endDate,
  })

  return useMemo(() => {
    if (!isReceiptsLoaded) return []

    // TODO: Make ReceiptTableItem
    return receipts!.map(receipt => (
      <TableRow key={receipt.receipt_number}>
        <TableCell>{receipt.receipt_number}</TableCell>
        <TableCell className='text-center'>{receipt.employee.empl_surname} {receipt.employee.empl_name}</TableCell>
        <TableCell className='text-center'>
          {receipt.customer?.card_number ? `${receipt.customer.cust_surname} ${receipt.customer.cust_name}` : `NULL`}
        </TableCell>
        <TableCell className='text-right truncate max-w-0'>
          {receipt.sum_total}
        </TableCell>
        <TableCell className='text-right truncate max-w-0'>
          {receipt.vat}
        </TableCell>
        <TableCell className='text-right'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              window.history.pushState(null, '', '/dashboard/receipts/' + receipt.receipt_number)
              openModal('info', receipt)
            }}
          >
            <Info />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('delete', receipt)
            }}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }, [receipts, isReceiptsLoaded])
}
