import { QueryKeys } from '@/shared/constants/query-keys'
import { employeeService } from '@/shared/services/exployee.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useEmployeesWithNoHighDiscountClients = () => {
  return useQuery({
    queryKey: [QueryKeys.EMPLOYEES_NO_HIGH_DISCOUNT_CLIENTS],
    staleTime: 1000 * 60,
    queryFn: () => employeeService.getEmployeeThatHaventServedHighDiscountClients(),
    placeholderData: keepPreviousData,
  })
}