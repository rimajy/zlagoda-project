import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Receipt } from '@/shared/entities/receipt'
import { SquareArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const RecentReceiptItem = ({receipt}: {receipt: Receipt}) => {
  const router = useRouter();

  return (
    <Card className="py-2 px-6 flex flex-row items-center gap-4">
      <h3 className="text-xl">#{receipt.receipt_number}</h3>
      <p>Total sum: {receipt.sum_total}</p>
      <div>
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/receipts/" + receipt.receipt_number)}>
          <SquareArrowRight />
        </Button>
      </div>
    </Card>
  )
}