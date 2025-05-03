import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useEmployeeModal } from '@/features/employee/context/EmployeeModals.context'
import { EmployeeForm } from '@/features/employee/EmployeeForm'
import { useCreateEmployee } from '@/shared/hooks/employee/useCreateEmployee'
import {
  EmployeeSchema,
  EmployeeSchemaType,
  EmployeeUpdateSchemaType,
} from '@/shared/schemas/employee.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'

export const CreateEmployeeDialog = () => {
  const { closeModal, modal } = useEmployeeModal()

  const minBirthDate = new Date()
  minBirthDate.setFullYear(new Date().getFullYear() - 18)

  const form = useForm<EmployeeSchemaType>({
    defaultValues: {
      empl_surname: '',
      empl_name: '',
      empl_patronymic: null,
      salary: 0,
      date_of_birth: minBirthDate,
      date_of_start: new Date(),
      phone_number: '',
      city: '',
      street: '',
      zip_code: '',
      login: '',
      password: '',
    },
    mode: 'onChange',
    resolver: zodResolver(EmployeeSchema),
  })
  const { mutateAsync: createEmployee } = useCreateEmployee()

  const submitHandler = async (data: EmployeeSchemaType) => {
    try {
      const employee = await createEmployee(data)
      toast.success(
        `Employee "${employee.empl_surname} ${employee.empl_name}" created successfully`,
      )
      form.reset()
      closeModal()
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  useEffect(() => {
    const surname = form.watch('empl_surname')
    const name = form.watch('empl_name')
    const role = form.watch('empl_role')

    console.log(form.getValues())

    if (!surname || !name || !role) {
      return
    }

    form.setValue(
      'login',
      `${role.toLowerCase()}-${surname.toLowerCase()}-${name.toLowerCase()}`,
    )
  }, [
    form.watch('empl_surname'),
    form.watch('empl_name'),
    form.watch('empl_role'),
  ])

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
          <DialogTitle>Create employee</DialogTitle>
        </DialogHeader>
        <EmployeeForm
          form={form as never}
          onSubmit={submitHandler as never}
          buttonText={'Create'}
          hideAuthFields={false}
        />
      </DialogContent>
    </Dialog>
  )
}
