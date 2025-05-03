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
import { useUpdateEmployee } from '@/shared/hooks/employee/useUpdateEmployee'
import {
  EmployeeSchemaType,
  EmployeeUpdateSchema,
  EmployeeUpdateSchemaType,
} from '@/shared/schemas/employee.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'

export const EditEmployeeDialog = () => {
  const { closeModal, employee, modal } = useEmployeeModal()

  const form = useForm<EmployeeUpdateSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(EmployeeUpdateSchema),
  })

  const { mutateAsync: updateEmployee } = useUpdateEmployee()

  const submitHandler = async (data: EmployeeUpdateSchemaType) => {
    if (!employee) return

    try {
      await updateEmployee({ ...data, id: employee.id_employee })
      toast.success(
        `Employee "${employee.empl_surname} ${employee.empl_name}" updated successfully`,
      )
      form.reset()
      closeModal()
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (employee !== undefined) {
      form.reset({
        ...employee,
        date_of_birth: new Date(employee.date_of_birth),
        date_of_start: new Date(employee.date_of_start),
        salary: +employee.salary,
      })
    }
  }, [form, employee])

  return (
    <Dialog
      modal={false}
      open={modal === 'update'}
      onOpenChange={() => {
        closeModal()
      }}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit employee "{employee!.id_employee}"</DialogTitle>
        </DialogHeader>

        <EmployeeForm
          form={form}
          onSubmit={submitHandler}
          buttonText='Update'
          hideAuthFields
        />
      </DialogContent>
    </Dialog>
  )
}
