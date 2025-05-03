import { QueryKeys } from '@/shared/constants/query-keys'
import { customerService } from '@/shared/services/customer.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: customerService.createCustomer,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CUSTOMERS],
        exact: false,
      })
    },
  })
}
