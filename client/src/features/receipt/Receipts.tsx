'use client'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'
import { TotalProductSoldCount } from './TotalProductSoldCount'
import { ReceiptList } from './ReceiptList'
import { ReceiptFilter } from './ReceiptFilter'
import { ReceiptDialogs } from './ReceiptDialogs'
import { ReceiptTotalSum } from './ReceiptTotalSum'

export const Receipts = () => {
  const role = useEmployeeRole();

  return (
    <div>
      <ReceiptFilter />
      {role === "MANAGER" ? (
        <>
          <ReceiptTotalSum />
          <TotalProductSoldCount />
        </>
      ) : null}

      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Receipt Number</TableHead>
            <TableHead className='text-center'>Employee</TableHead>
            <TableHead className='text-center'>Customer</TableHead>
            <TableHead className='text-right'>Total Sum</TableHead>
            <TableHead className='text-right'>Vat</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <ReceiptList />
        </TableBody>
      </Table>
      <ReceiptDialogs />
    </div>
  )
}
