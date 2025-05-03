'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'

import { useProducts } from '@/shared/hooks/product/useProducts'
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

interface SelectProductProps {
  value: number
  onChange(value: number): void,
  className?: string
}

export function SelectProduct({ value, onChange, className }: SelectProductProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: products, isLoading } = useProducts({ name: searchValue })

  if (!products || isLoading) return <></>
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn('w-full justify-between', className)}
        >
          {value
            ? products.find(product => product.id_product === value)
                ?.product_name
            : 'Select product...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput
            placeholder='Search product...'
            className='h-9'
            onValueChange={debounce(
              (value: string) => setSearchValue(value),
              300,
            )}
          />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {products.map(product => (
                <CommandItem
                  key={product.id_product}
                  onSelect={() => {
                    onChange(product.id_product)
                    setOpen(false)
                  }}
                >
                  {product.product_name}
                  <Check
                    className={cn(
                      value === product.id_product
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
