import { QueryKeys } from '@/shared/constants/query-keys'
import {
  GetProductsFilters,
  productService,
} from '@/shared/services/product.service'
import { serializeFilters } from '@/shared/utils/serialize-filters'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useProducts = (filters?: GetProductsFilters) => {
  return useQuery({
    queryKey: [QueryKeys.PRODUCTS, serializeFilters(filters)],
    staleTime: 1000 * 60,
    queryFn: () => productService.getProducts(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}
