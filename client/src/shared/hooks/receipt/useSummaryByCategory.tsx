import { QueryKeys } from '@/shared/constants/query-keys'
import { receiptService } from '@/shared/services/receipt.service'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const useReceiptSummaryByCategory = () => {
  return useQuery({
    queryKey: [QueryKeys.RECEIPT_SUMMARY_BY_CATEGORIES],
    staleTime: 1000 * 60,
    queryFn: () => receiptService.getReceiptSummaryByCategories(),
    placeholderData: keepPreviousData,
  })
}