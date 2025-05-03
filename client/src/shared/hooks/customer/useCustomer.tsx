import { QueryKeys } from '@/shared/constants/query-keys'
import { customerService } from '@/shared/services/customer.service'
import { useQuery } from '@tanstack/react-query'

export const useCustomer = (customerCardNumber?: string) => {
  return useQuery({
    queryKey: [QueryKeys.CUSTOMERS, customerCardNumber],
    staleTime: 1000 * 60,
    enabled: customerCardNumber !== undefined,
    queryFn: () => customerService.getCustomerById(customerCardNumber!),
  })
}