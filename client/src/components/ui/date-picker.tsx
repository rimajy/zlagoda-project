import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/shared/utils/utils'
import { DateRange } from 'react-day-picker'

type DataPickerProps =
  {
    date?: Date
    setDate: (date?: Date) => void
    toYear: number,
    mode: 'single',
    className?: string
  } |
  {
    date?: DateRange
    setDate: (date?: DateRange) => void
    toYear: number,
    mode: 'range',
    className?: string
  }

export const DatePicker = ({ date, setDate, toYear, mode, className }: DataPickerProps) => {
  const isDate = date instanceof Date

  let formattedDate: string = ''
  if (date === undefined) {
    formattedDate = 'Pick a date'
  }

  if (isDate) {
    formattedDate = format(date, 'LLL dd, y')
  } else if (date?.from && date?.to) {
    if (date?.from) {
      formattedDate += format(date.from, 'LLL dd, y')
    }

    if (date?.to) {
      formattedDate += ` - ${format(date.to, 'LLL dd, y')}`
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon />
          {formattedDate}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode as never}
          captionLayout="dropdown"
          selected={mode === 'range' ? (date as DateRange) : (date as Date)}
          onSelect={setDate}
          toYear={toYear}
          fromYear={1900}
          classNames={{
            day_hidden: 'invisible',
            dropdown:
              'px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background',
            caption_dropdowns: 'flex gap-3',
            vhidden: 'hidden',
            caption_label: 'hidden',
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
