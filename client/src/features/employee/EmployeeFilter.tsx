'use client'

import { PrintButton } from '@/components/PrintButton'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEmployeeFilter } from '@/features/employee/context/EmployeeFilter.context'
import { usePrintEmployee } from '@/shared/hooks/employee/usePrintEmployee'

export const EmployeeFilter = () => {
  const { setSurname, surname, clear } = useEmployeeFilter()
  const { printEmployee, isLoading } = usePrintEmployee()

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search by surname"
        value={surname ?? ''}
        onChange={(e) => setSurname(e.target.value)}
      />
      <div className="flex gap-2">
        <PrintButton disabled={isLoading} onClick={printEmployee} />
        <Button onClick={clear}>
          Reset
        </Button>
      </div>
    </div>
  )
}
