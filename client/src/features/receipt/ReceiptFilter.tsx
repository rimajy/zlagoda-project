'use client'

import { Button } from '@/components/ui/button'
import { useReceiptFilter } from '@/features/receipt/context/ReceiptFilter.context'
import { SelectEmployee } from '@/components/SelectEmployee'
import { DatePicker } from '@/components/ui/date-picker'
import { ReceiptSearch } from '@/features/receipt/ReceiptSearch'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'
import { DateRange } from 'react-day-picker'
import { usePrintReceipt } from '@/shared/hooks/receipt/usePrintReceipt'
import { SelectProduct } from 'src/components/SelectProduct'
import { PrintButton } from '@/components/PrintButton'

export const ReceiptFilter = () => {
  const {
    employee_id,
    setEmployeeId,
    startDate,
    endDate,
    setEndDate,
    setStartDate,
    productId,
    setProductId,
    clear,
  } = useReceiptFilter();
  const {printReceipt, isLoading} = usePrintReceipt();
  const role = useEmployeeRole();

  const setDate = (date?: DateRange) => {
    setStartDate(date?.from);
    setEndDate(date?.to);
  }

  return (
    <div className='flex gap-2 w-full'>
      <div className="flex gap-2">
        <DatePicker
          className="w-100"
          mode="range"
          date={{
            from: startDate,
            to: endDate,
          }}
          setDate={setDate}
          toYear={new Date().getFullYear()}
        />
        {role === "MANAGER" ? <SelectEmployee value={employee_id ?? ''}
                        onChange={setEmployeeId}
                        className="w-full shrink-1"
        /> : null}
      </div>
      <div className="ml-auto">
        <SelectProduct value={productId ?? 0} onChange={setProductId}/>
      </div>
      <ReceiptSearch />
      <PrintButton disabled={isLoading} onClick={printReceipt} />
      <Button onClick={clear}>
        Reset
      </Button>
    </div>
  )
}
