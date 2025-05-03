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
import { useEmployees } from '@/shared/hooks/employee/useEmployees'

interface SelectEmployeeProps {
  value: string
  onChange(value: string): void
  className?: string
}

export function SelectEmployee({ value, onChange, className }: SelectEmployeeProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const { data: employees, isLoading } = useEmployees({ surname: searchValue })

  if (!employees || isLoading) return <></>

  const selectedEmployee = employees.find(employee => employee.id_employee === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {
            selectedEmployee ?
              `${selectedEmployee.empl_surname} ${selectedEmployee.empl_name} ${selectedEmployee.id_employee}` :
              'Select employee...'
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder="Search employee..."
            className="h-9"
            onValueChange={debounce(
              (value: string) => setSearchValue(value),
              300,
            )}
          />
          <CommandList>
            <CommandEmpty>No products found.</CommandEmpty>
            <CommandGroup>
              {employees.map(employee => (
                <CommandItem
                  key={employee.id_employee}
                  onSelect={() => {
                    onChange(employee.id_employee)
                    setOpen(false)
                  }}
                >
                  {employee.empl_surname} {employee.empl_name} {employee.id_employee}
                  <Check
                    className={cn(
                      value === employee.id_employee
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
