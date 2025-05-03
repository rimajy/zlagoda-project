import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/shared/constants/query-keys'
import { GetSoldProductsCountFilters, receiptService } from '@/shared/services/receipt.service'

export const useSoldProductsCount = (filters: GetSoldProductsCountFilters) => {
  return useQuery({
    queryKey: [QueryKeys.RECEIPT_SOLD_PRODUCTS, filters],
    staleTime: 1000 * 60,
    enabled: !!filters.productId,
    queryFn: () => receiptService.getSoldProductsCount(filters),
    placeholderData: keepPreviousData,
  })
}