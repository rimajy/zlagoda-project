import { QueryKeys } from '@/shared/constants/query-keys'
import { receiptService } from '@/shared/services/receipt.service'
import { useQuery } from '@tanstack/react-query'

export const useMyRecentReceipts = () => {
  return useQuery({
    queryKey: [QueryKeys.MY_RECENT_RECEIPTS],
    queryFn: () => receiptService.getMyRecentReceipts(),
  })
}