import { QueryKeys } from '@/shared/constants/query-keys'
import { categoryService } from '@/shared/services/category.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryService.delete,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CATEGORIES],
        exact: false,
      })
    },
  })
}
