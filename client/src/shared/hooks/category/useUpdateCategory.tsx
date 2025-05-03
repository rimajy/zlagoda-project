import { QueryKeys } from '@/shared/constants/query-keys'
import { Category } from '@/shared/entities/category'
import { categoryService } from '@/shared/services/category.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: categoryService.update,
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CATEGORIES],
        exact: false,
      })
    },
  })
}
