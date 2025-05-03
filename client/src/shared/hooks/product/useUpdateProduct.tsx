import { QueryKeys } from '@/shared/constants/query-keys'
import { productService } from '@/shared/services/product.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.updateProduct,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.STORE_PRODUCTS],
        exact: false,
      });
    },
  })
}
