import { QueryKeys } from '@/shared/constants/query-keys'
import { productService } from '@/shared/services/product.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: productService.deleteProduct,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PRODUCTS],
        exact: false,
      })
    },
  })
}
