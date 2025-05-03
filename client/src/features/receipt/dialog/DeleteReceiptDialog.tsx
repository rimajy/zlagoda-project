import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ApiError } from '@/shared/types/ApiError'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'
import { useDeleteReceipt } from '@/shared/hooks/receipt/useDeleteReceipt'

export const DeleteReceiptDialog = () => {
  const { receipt, closeModal, modal } = useReceiptModal()
  const { mutateAsync: deleteReceipt } = useDeleteReceipt()
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = async () => {
    if (!receipt) return

    try {
      await deleteReceipt(receipt.receipt_number)
      toast.success(`Receipt "${receipt.receipt_number}" deleted successfully`)
      closeModal()
    } catch (e) {
      const error = e as ApiError
      setIsDisabled(true)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    setIsDisabled(false)
  }, [modal])

  return (
    <Dialog modal={false} open={modal === 'delete'} onOpenChange={closeModal}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Delete receipt "{receipt?.receipt_number}"</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button type='submit' disabled={isDisabled} onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
