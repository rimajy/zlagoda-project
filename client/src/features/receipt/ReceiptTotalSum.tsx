import { useReceiptTotalSum } from '@/shared/hooks/receipt/useReceiptTotalSum'
import { useReceiptFilter } from './context/ReceiptFilter.context'

export const ReceiptTotalSum = () => {
  const { startDate, endDate, employee_id } = useReceiptFilter()
  const { data, isSuccess } = useReceiptTotalSum({ startDate, endDate, employee_id })


  return isSuccess ? (
    <div className="p-3">
      <p className="text-xl text-center">
        Total Sum: {data?.totalSum ?? '0.0000'}
      </p>
    </div>
  ) : (<></>)
}