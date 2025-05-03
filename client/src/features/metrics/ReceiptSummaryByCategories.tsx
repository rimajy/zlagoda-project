import { useReceiptSummaryByCategory } from '@/shared/hooks/receipt/useSummaryByCategory'

export const ReceiptSummaryByCategories = () => {
  const {data: summaries} = useReceiptSummaryByCategory();

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <h2 className="font-bold text-3xl">Sales summary by category</h2>
      {summaries?.map(summary => {
        return (
          <div key={summary.category_number} className="flex gap-2">
            <p>{summary.category_name}</p>
            <p>{summary.total_sales}</p>
          </div>
        )
      })}
    </div>
  )
}