import { RecentReceiptItem } from '@/features/metrics/RecentReceiptItem'
import { useMyRecentReceipts } from '@/shared/hooks/receipt/useMyRecentReceipts'


// TODO: Move it into receipt feature22
export const RecentReceipts = () => {
  const {data: recentReceipts, isLoading, isError, isSuccess} = useMyRecentReceipts()
  return (
    <div className="text-center">
      <h2 className="font-bold text-3xl">Your recent receipts</h2>
      {isLoading && (<p>Loading...</p>)}
      {isError && (<p>Error</p>)}
      <div className="mt-2 mx-auto flex flex-col gap-y-2 justify-center w-[600px] items-stretch">
        {isSuccess && recentReceipts?.length > 0 && recentReceipts.map((recentReceipt) => (
          <RecentReceiptItem receipt={recentReceipt} key={recentReceipt.receipt_number} />
        ))}
      </div>
      {recentReceipts?.length === 0 && (
        <p>No receipts today</p>
      )}
    </div>
  )
}