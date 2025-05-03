'use client'

import * as React from 'react'
import { useMemo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useCategories } from '@/shared/hooks/category/useCategories'

import * as SelectPrimitive from '@radix-ui/react-select'

export const SelectCategory = ({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) => {
  const { data: categories, isSuccess: isCategoriesLoaded } = useCategories()

  const options = useMemo(() => {
    if (!isCategoriesLoaded) return []

    return categories!.map(category => (
      <SelectItem
        key={category.category_number}
        value={category.category_number + ''}
      >
        {category.category_name}
      </SelectItem>
    ))
  }, [categories, isCategoriesLoaded])

  return (
    <Select {...props} onValueChange={props.onValueChange}>
      <SelectTrigger className='w-full'>
        <SelectValue placeholder='Category' />
      </SelectTrigger>
      <SelectContent>
        {...options}
        {!isCategoriesLoaded && (
          <SelectItem key={props.value} value={props.value ?? '1'} disabled>
            Loading...
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  )
}
