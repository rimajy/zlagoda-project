import { Pencil, Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Category as CategoryType } from '@/shared/entities/category'

interface CategoryProps {
  category: CategoryType
  handleOpenEditDialog: (category: CategoryType) => void
  handleOpenDeleteDialog: (category: CategoryType) => void
}

export const Category = ({
  category,
  handleOpenDeleteDialog,
  handleOpenEditDialog,
}: CategoryProps) => {
  return (
    <Card className='p-3 flex flex-row justify-between items-center'>
      <h1 className='text-xl'>{category.category_name}</h1>
      <div className='flex gap-2'>
        <Button
          variant='outline'
          size='icon'
          onClick={() => handleOpenEditDialog(category)}
        >
          <Pencil />
        </Button>
        <Button
          variant='destructive'
          size='icon'
          onClick={() => handleOpenDeleteDialog(category)}
        >
          <Trash2 />
        </Button>
      </div>
    </Card>
  )
}
