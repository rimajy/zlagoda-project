import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/shared/constants/query-keys'
import { receiptService } from '@/shared/services/receipt.service'

export const useGetReceiptById = (id?: string) => {
  return useQuery({
    queryKey: [QueryKeys.RECEIPTS, "receipt", id],
    staleTime: 1000 * 60,
    enabled: id !== undefined,
    queryFn: () => receiptService.getReceiptById(id as string),
  })
}