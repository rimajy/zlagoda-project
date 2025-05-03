import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useGetReceiptById } from '@/shared/hooks/receipt/useGetReceiptById'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useReceiptModal } from '@/features/receipt/context/ReceiptModals.context'

export const ReceiptSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const { openModal, modal } = useReceiptModal()

  // TODO:  move this logic into useSearchReceipt
  const params = useParams<{ searchValue: string[] }>();
  const [receiptId, setReceiptId] = useState<string | undefined>(params.searchValue?.[0])

  const { data: receipt, isSuccess } = useGetReceiptById(receiptId);

  const buttonClickHandler = () => {
    window.history.pushState(null, '', '/dashboard/receipts/' + searchValue);
    setReceiptId(searchValue ? searchValue : undefined);
  }

  useEffect(() => {
    if (params.searchValue && params.searchValue[0]) {
      setSearchValue(params.searchValue[0]);
    }
  }, [params.searchValue?.[0]])

  useEffect(() => {
    if (isSuccess && receipt) {
      openModal("info", receipt);
    }
  }, [isSuccess, receipt])

  useEffect(() => {
    if (modal === "closed") {
      setReceiptId(undefined)
    }
  }, [modal])

  return (
    <div className="flex gap-1">
      <Input
        placeholder="Search by Receipt Number"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <Button onClick={buttonClickHandler}
      >
        Search
      </Button>
    </div>
  )
}