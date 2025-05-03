'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useEmployeeFilter } from '@/features/employee/context/EmployeeFilter.context'
import { EmployeeDialogs } from '@/features/employee/EmployeeDialogs'
import { EmployeeFilter } from '@/features/employee/EmployeeFilter'
import { toggleSortByColumn } from '@/shared/utils/toggle-sort-by-column'

import { EmployeeList } from './EmployeeList'

export const Employees = () => {
  const { sortOrder, setSortOrder } = useEmployeeFilter()

  const nameColumnClickHandler = toggleSortByColumn(sortOrder, setSortOrder, [
    'ASC',
    'DESC',
    undefined,
  ])

  return (
    <div>
      <EmployeeFilter />
      <Table className='mt-3'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Employee ID</TableHead>
            {/*TODO: use select-none everywhere*/}
            <TableHead
              className='flex items-center select-none'
              onClick={nameColumnClickHandler}
            >
              Full Name
              <span>
                {sortOrder !== undefined &&
                  (sortOrder === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
              </span>
            </TableHead>
            <TableHead>Role</TableHead>
            <TableHead className='text-center'>Salary</TableHead>
            <TableHead className='text-center'>Phone</TableHead>
            <TableHead className='text-right'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <EmployeeList />
        </TableBody>
      </Table>
      <EmployeeDialogs />
    </div>
  )
}
