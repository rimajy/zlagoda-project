import { QueryKeys } from '@/shared/constants/query-keys'
import { storeProductService } from '@/shared/services/storeProduct.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateStoreProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: storeProductService.updateStoreProduct,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.STORE_PRODUCTS],
        exact: false,
      })
    },
  })
}
