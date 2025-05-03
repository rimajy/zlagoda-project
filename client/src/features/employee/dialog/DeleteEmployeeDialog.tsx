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
import { useEmployeeModal } from '@/features/employee/context/EmployeeModals.context'
import { useDeleteEmployee } from '@/shared/hooks/employee/useDeleteEmployee'
import { ApiError } from '@/shared/types/ApiError'

export const DeleteEmployeeDialog = () => {
  const { employee, closeModal, modal } = useEmployeeModal()
  const { mutateAsync: deleteEmployee } = useDeleteEmployee()
  const [isDisabled, setIsDisabled] = useState(false)

  const onSubmit = async () => {
    if (!employee) return

    try {
      await deleteEmployee(employee.id_employee)
      toast.success(`Employee "${employee.id_employee}" deleted successfully`)
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
          <DialogTitle>
            Delete employee "{employee?.empl_surname} {employee?.empl_name}"
          </DialogTitle>
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
