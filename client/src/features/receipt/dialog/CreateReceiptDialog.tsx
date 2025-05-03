import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { ApiError } from '@/shared/types/ApiError'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReceiptForm } from '@/features/receipt/ReceiptForm'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'
import { ReceiptSchema, ReceiptSchemaType } from '@/shared/schemas/receipt.schema'
import { useCreateReceipt } from '@/shared/hooks/receipt/useCreateReceipt'

export const CreateReceiptDialog = () => {
  const { closeModal, modal } = useReceiptModal()

  const form = useForm({
    defaultValues: {
      card_number: null,
      products: [],
    },
    mode: 'onChange',
    resolver: zodResolver(ReceiptSchema),
  })
  const { mutateAsync: createReceipt } = useCreateReceipt()

  const submitHandler = async (data: ReceiptSchemaType) => {
    try {
      const receipt = await createReceipt(data)
      toast.success(`Receipt "${receipt.receipt_number}" created successfully`)
      form.reset()
      closeModal()
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  return (
    <Dialog
      modal={false}
      open={modal === 'add'}
      onOpenChange={() => {
        closeModal()
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create receipt</DialogTitle>
        </DialogHeader>
        <ReceiptForm
          form={form}
          onSubmit={submitHandler}
          buttonText={'Create'}
        />
      </DialogContent>
    </Dialog>
  )
}
