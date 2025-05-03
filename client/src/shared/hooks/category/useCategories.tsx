import { QueryKeys } from '@/shared/constants/query-keys'
import { categoryService } from '@/shared/services/category.service'

import { useQuery } from '@tanstack/react-query'

export const useCategories = (sortOrder?: 'ASC' | 'DESC') => {
  return useQuery({
    queryFn: () => categoryService.getAllCategories(sortOrder),
    queryKey: [QueryKeys.CATEGORIES, sortOrder],
    staleTime: 1000 * 60 * 1,
  })
}
