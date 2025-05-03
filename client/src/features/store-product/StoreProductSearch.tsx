import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useStoreProductModal } from '@/features/store-product/context/StoreProductModals.context'

export const StoreProductSearch = () => {
  const [searchValue, setSearchValue] = useState('')
  const { openModal, setUpc } = useStoreProductModal()
  const params = useParams<{ searchValue: string[] }>();

  useEffect(() => {
    if (params.searchValue && params.searchValue[0]) {
      setSearchValue(params.searchValue[0]);
      setUpc(params.searchValue[0]);
      openModal("info", undefined);
    }
  }, [params.searchValue?.[0]])

  const buttonClickHandler = () => {
    window.history.pushState(null, '', '/dashboard/store-products/' + searchValue);
    setUpc(searchValue);
    openModal("info", undefined);
  }

  return (
    <div className="flex gap-1">
      <Input
        placeholder="Search by UPC"
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