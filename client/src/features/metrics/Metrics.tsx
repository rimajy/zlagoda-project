'use client'

import { NotSoldProducts } from '@/features/metrics/NotSoldProducts'
import { ReceiptSummaryByCategories } from '@/features/metrics/ReceiptSummaryByCategories'
import { RecentReceipts } from '@/features/metrics/RecentReceipts'
import { UserInfo } from '@/features/metrics/UserInfo'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'
import { EmployeeWithNoHighDiscountClients } from './EmployeeWithNoHighDiscountClients'

export const Metrics = () => {
  const role = useEmployeeRole();

  return (
    <div>
      <UserInfo />
      {role === "CASHIER" ? <RecentReceipts/> : null}
      {role === "MANAGER" ? <>
        <EmployeeWithNoHighDiscountClients />
        <ReceiptSummaryByCategories />
        <NotSoldProducts />
      </>: null}
    </div>
  );
}