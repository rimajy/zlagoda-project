import { useReceiptFilter } from './context/ReceiptFilter.context'
import { useSoldProductsCount } from '@/shared/hooks/receipt/useSoldProductsCount'

export const TotalProductSoldCount = () => {
  const { startDate, endDate, productId } = useReceiptFilter()
  const { data, isSuccess } = useSoldProductsCount({ startDate, endDate, productId: productId ?? 0 })


  return isSuccess ? (
    <div className="p-3">
      <p className="text-xl text-center">
        Total Product Count: {data?.productCount ?? '0'}
      </p>
    </div>
  ) : (<></>)
}