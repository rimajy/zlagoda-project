import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from '@/shared/constants/query-keys'
import { storeProductService } from '@/shared/services/storeProduct.service'

export const useGetStoreProductByUpc = (upc?: string) => {
  return useQuery({
    queryKey: [QueryKeys.STORE_PRODUCTS, "upc", upc],
    staleTime: 1000 * 60,
    enabled: upc !== undefined,
    queryFn: () => storeProductService.getStoreProductByUPC(upc as string),
  })
}