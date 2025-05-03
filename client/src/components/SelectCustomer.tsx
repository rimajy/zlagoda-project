'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
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
import { useCustomers } from '@/shared/hooks/customer/useCustomers'

interface SelectCustomerProps {
  value: string | null
  onChange(value: string | null): void
}

export function SelectCustomer({ value, onChange }: SelectCustomerProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: customers, isLoading } = useCustomers({ surname: searchValue })

  if (!customers || isLoading) return <></>

  const selectedCustomer = customers.find(
    customer => customer.card_number === value,
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {selectedCustomer
            ? `${selectedCustomer.cust_surname} ${selectedCustomer.cust_name} ${selectedCustomer.card_number}`
            : 'Select customer...'}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <Command>
          <CommandInput
            placeholder='Search customer...'
            className='h-9'
            onValueChange={debounce(
              (value: string) => setSearchValue(value),
              300,
            )}
          />
          <CommandList>
            <CommandEmpty>No customers found.</CommandEmpty>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onChange(null)
                  setOpen(false)
                }}
              >
                NOT SET
                <Check
                  className={cn(
                    value === null
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                />
              </CommandItem>
              {customers.map(customer => (
                <CommandItem
                  key={customer.card_number}
                  onSelect={() => {
                    onChange(customer.card_number)
                    setOpen(false)
                  }}
                >
                  {customer.cust_surname} {customer.cust_name} {customer.card_number}
                  <Check
                    className={cn(
                      value === customer.card_number
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
