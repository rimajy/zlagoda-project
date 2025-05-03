import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useCustomerModal } from '@/features/customer/context/CustomerModals.context'
import { CustomerForm } from '@/features/customer/CustomerForm'
import { useCreateCustomer } from '@/shared/hooks/customer/useCreateCustomer'
import {
  CustomerCardSchema,
  CustomerCardSchemaType,
} from '@/shared/schemas/customer-card.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'

export const CreateCustomerDialog = () => {
  const { closeModal, modal } = useCustomerModal()
  const { mutateAsync: createCustomer } = useCreateCustomer()

  const form = useForm<CustomerCardSchemaType>({
    defaultValues: {
      cust_surname: '',
      cust_patronymic: null,
      cust_name: '',
      phone_number: '',
      city: null,
      street: null,
      zip_code: null,
      percent: 0,
    },
    mode: 'onChange',
    resolver: zodResolver(CustomerCardSchema),
  })

  const submitHandler = async (data: CustomerCardSchemaType) => {
    try {
      const customer = await createCustomer(data)
      toast.success(`Customer "${customer.cust_name}" created successfully`)
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
          <DialogTitle>Create product</DialogTitle>
        </DialogHeader>
        <CustomerForm
          form={form}
          onSubmit={submitHandler}
          buttonText='Create'
        />
      </DialogContent>
    </Dialog>
  )
}
