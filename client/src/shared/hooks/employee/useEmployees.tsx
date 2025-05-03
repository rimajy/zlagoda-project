import { QueryKeys } from '@/shared/constants/query-keys'
import {
  employeeService,
  GetAllEmployeesFilter,
} from '@/shared/services/exployee.service'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useEmployees = (filters?: GetAllEmployeesFilter) => {
  return useQuery({
    queryKey: [QueryKeys.EMPLOYEES, filters],
    staleTime: 1000 * 60,
    queryFn: () => employeeService.getAllEmployees(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}
