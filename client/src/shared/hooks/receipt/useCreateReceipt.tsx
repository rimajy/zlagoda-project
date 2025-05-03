import { QueryKeys } from '@/shared/constants/query-keys'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { receiptService } from '@/shared/services/receipt.service'

export const useCreateReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: receiptService.createReceipt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.RECEIPTS],
        exact: false,
      })
    },
  })
}
