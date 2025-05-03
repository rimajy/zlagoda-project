'use client'

import { PrintButton } from '@/components/PrintButton'

import { Input } from '@/components/ui/input'
import { useCustomerFilter } from '@/features/customer/context/CustomerFilter.context'
import { usePrintCustomer } from '@/shared/hooks/customer/usePrintCustomer'

export const CustomerFilter = () => {
  const { setCustomerSurname, setPercent, percent, customerSurname } = useCustomerFilter()
  const { printCustomers, isLoading } = usePrintCustomer()

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search by surname"
        value={customerSurname}
        onChange={(e) => setCustomerSurname(e.target.value)}
      />
      <Input
        type="number"
        min={0}
        max={100}
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />
      <PrintButton disabled={isLoading} onClick={printCustomers} />
    </div>
  )
}
