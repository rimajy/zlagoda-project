import { QueryKeys } from '@/shared/constants/query-keys'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GetReceiptsFilters, receiptService } from '@/shared/services/receipt.service'

export const useReceipts = (filters?: GetReceiptsFilters) => {
  return useQuery({
    queryKey: [QueryKeys.RECEIPTS, filters],
    staleTime: 1000 * 60,
    queryFn: () => receiptService.getReceipts(filters ?? {}),
    placeholderData: keepPreviousData,
  })
}
