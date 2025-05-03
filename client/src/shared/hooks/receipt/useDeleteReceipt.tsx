import { QueryKeys } from '@/shared/constants/query-keys'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { receiptService } from '@/shared/services/receipt.service'

export const useDeleteReceipt = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: receiptService.deleteReceipt,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.RECEIPTS],
        exact: false,
      })
    },
  })
}
