'use client'

import { CirclePlus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useEmployeeModal } from '@/features/employee/context/EmployeeModals.context'
import { CreateEmployeeDialog } from '@/features/employee/dialog/CreateEmployeeDialog'
import { DeleteEmployeeDialog } from '@/features/employee/dialog/DeleteEmployeeDialog'
import { EditEmployeeDialog } from '@/features/employee/dialog/EditEmployeeDialog'

export const EmployeeDialogs = () => {
  const { employee, openModal } = useEmployeeModal()

  return (
    <>
      {employee !== undefined && (
        <>
          <EditEmployeeDialog />
          <DeleteEmployeeDialog />
        </>
      )}

      <CreateEmployeeDialog />

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
