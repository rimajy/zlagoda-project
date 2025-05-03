import { QueryKeys } from '@/shared/constants/query-keys'
import {
  customerService,
  GetCustomerFilters,
} from '@/shared/services/customer.service'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useCustomers = (filters?: GetCustomerFilters) => {
  return useQuery({
    queryKey: [QueryKeys.CUSTOMERS, filters],
    staleTime: 1000 * 60,
    queryFn: () => customerService.getCustomers(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}
