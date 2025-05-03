'use client'

import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'
import { ReceiptInfoDialog } from '@/features/receipt/dialog/ReceiptInfoDialog'
import { DeleteReceiptDialog } from '@/features/receipt/dialog/DeleteReceiptDialog'
import { CreateReceiptDialog } from '@/features/receipt/dialog/CreateReceiptDialog'

export const ReceiptDialogs = () => {
  const { receipt, openModal } = useReceiptModal()

  return (
    <>
      {receipt !== undefined && (
        <>
          <ReceiptInfoDialog />
          <DeleteReceiptDialog />
        </>
      )}

      <CreateReceiptDialog />

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
