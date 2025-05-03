import { QueryKeys } from '@/shared/constants/query-keys'
import { CustomerCard } from '@/shared/entities/customer-card'
import { customerService } from '@/shared/services/customer.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: customerService.updateCustomer,
    onSuccess(data: CustomerCard) {
      const queries = queryClient.getQueriesData({
        queryKey: [QueryKeys.CUSTOMERS],
        exact: false,
      })

      for (const [query] of queries) {
        queryClient.setQueryData(query, (oldData: CustomerCard[]) => {
          if (!oldData) return oldData

          const index = oldData.findIndex(
            customer => customer.card_number === data.card_number,
          )
          if (index === -1) return oldData

          const newData = [...oldData]
          newData[index] = data

          return newData
        })
      }
    },
  })
}
