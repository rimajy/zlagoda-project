'use client'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { Pencil, Trash2 } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { useEmployeeFilter } from '@/features/employee/context/EmployeeFilter.context'
import { useEmployeeModal } from '@/features/employee/context/EmployeeModals.context'
import { useEmployees } from '@/shared/hooks/employee/useEmployees'

export const EmployeeList = () => {
  const { surname, sortOrder } = useEmployeeFilter()
  const debounceSurname = useDebounce(surname, 300);
  const { data: employees, isSuccess: isEmployeesLoaded } = useEmployees({
    sort: sortOrder,
    surname: debounceSurname,
  })
  const { openModal } = useEmployeeModal()

  return useMemo(() => {
    if (!isEmployeesLoaded) return []

    return employees!.map(employee => (
      <TableRow key={employee.id_employee}>
        <TableCell>{employee.id_employee}</TableCell>
        <TableCell>
          {employee.empl_surname} {employee.empl_name}
          {employee.empl_patronymic ? ' ' + employee.empl_patronymic : ''}
        </TableCell>
        <TableCell>{employee.empl_role}</TableCell>
        <TableCell className='text-center'>{employee.salary}</TableCell>
        <TableCell className='text-center'>{employee.phone_number}</TableCell>
        <TableCell className='text-right'>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('update', employee)
            }}
          >
            <Pencil />
          </Button>
          <Button
            size='icon'
            variant='ghost'
            onClick={() => {
              openModal('delete', employee)
            }}
          >
            <Trash2 />
          </Button>
        </TableCell>
      </TableRow>
    ))
  }, [employees, isEmployeesLoaded])
}
