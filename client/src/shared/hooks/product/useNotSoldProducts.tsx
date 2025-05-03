import { QueryKeys } from '@/shared/constants/query-keys'
import {
  GetProductsFilters,
  productService,
} from '@/shared/services/product.service'

import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useNotSoldProducts = () => {
  return useQuery({
    queryKey: [QueryKeys.NOT_SOLD_PRODUCTS],
    staleTime: 1000 * 60,
    queryFn: () => productService.getNotSoldProducts(),
    placeholderData: keepPreviousData,
  })
}
