'use client'

import { StoreProduct } from '@/shared/entities/store-product'
import { Check, ChevronsUpDown, Percent } from 'lucide-react'
import { useState } from 'react'

import { debounce } from '@/shared/utils/debounce'
import { cn } from '@/shared/utils/utils'

import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

interface SelectStoreProductProps {
  value: StoreProduct | null
  onChange(value: StoreProduct): void,
  className?: string
}

export function SelectStoreProduct({ value, onChange, className }: SelectStoreProductProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: storeProducts, isLoading } = useStoreProducts({ name: searchValue })

  if (!storeProducts || isLoading) return <></>

  const selectedStoreProduct = storeProducts.find(storeProduct => storeProduct.upc === value?.upc)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {selectedStoreProduct ? `${selectedStoreProduct.product?.product_name} (${selectedStoreProduct.upc.slice(-4)})` : 'Select product...'}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search store product..."
            className="h-9"
            onValueChange={debounce(
              (value: string) => setSearchValue(value),
              300,
            )}
          />
          <CommandList>
            <CommandEmpty>No store products found.</CommandEmpty>
            <CommandGroup>
              {storeProducts.map(storeProduct => (
                <CommandItem
                  key={storeProduct.upc}
                  onSelect={() => {
                    onChange(storeProduct)
                    setOpen(false)
                  }}
                >
                  {storeProduct.product?.product_name} ({storeProduct.upc.slice(-4)}) {storeProduct.promotional_product ? <Percent /> : null}
                  <Check
                    className={cn(
                      value?.upc === storeProduct.upc
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
