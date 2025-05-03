'use client'

import { PrintButton } from '@/components/PrintButton'
import { useEmployeeRole } from '@/shared/hooks/useEmployeeRole'
import { ChevronDown, ChevronUp, CirclePlus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Category } from '@/features/category/Category'
import { CreateCategoryDialog } from '@/features/category/dialog/CreateCategoryDialog'
import { DeleteCategoryDialog } from '@/features/category/dialog/DeleteCategoryDialog'
import { EditCategoryDialog } from '@/features/category/dialog/EditCategoryDialog'
import { Category as CategoryType } from '@/shared/entities/category'
import { useCategories } from '@/shared/hooks/category/useCategories'
import { usePrintCategory } from '@/shared/hooks/category/usePrintCategory'

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  )
  const [openedDialog, setOpenedDialog] = useState<
    'update' | 'create' | 'delete' | null
  >(null)
  const closeDialog = () => setOpenedDialog(null)
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC' | undefined>(
    undefined,
  )
  const { data: categories } = useCategories(sortOrder)
  const { printCategories, isLoading } = usePrintCategory()
  const role = useEmployeeRole()

  const handleOpenEditDialog = (category: CategoryType) => {
    setSelectedCategory(category)
    setOpenedDialog('update')
  }

  const handleOpenDeleteDialog = (category: CategoryType) => {
    setSelectedCategory(category)
    setOpenedDialog('delete')
  }

  const handleSortOrderChange = () => {
    setSortOrder(prev => {
      if (prev === undefined || prev === 'DESC') {
        return 'ASC'
      } else if (prev === 'ASC') {
        return 'DESC'
      }
      return undefined
    })
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={handleSortOrderChange} className="flex items-center">
          Sort by name{' '}
          {sortOrder !== undefined &&
            (sortOrder === 'ASC' ? <ChevronUp /> : <ChevronDown />)}
        </Button>
        <PrintButton onClick={printCategories} disabled={isLoading} />
      </div>

      <div className="flex flex-col gap-4 mt-4 h-auto">
        {categories?.map(category => (
          <Category
            category={category}
            key={category.category_number}
            handleOpenEditDialog={handleOpenEditDialog}
            handleOpenDeleteDialog={handleOpenDeleteDialog}
          />
        ))}
      </div>

      {selectedCategory !== null && (
        <>
          <EditCategoryDialog
            category={selectedCategory}
            open={openedDialog === 'update'}
            setOpen={closeDialog}
          />
          <DeleteCategoryDialog
            category={selectedCategory}
            open={openedDialog === 'delete'}
            setOpen={closeDialog}
          />
        </>
      )}

      <CreateCategoryDialog
        open={openedDialog === 'create'}
        setOpen={closeDialog}
      />

      <div className="fixed bottom-8 right-8">
        <Button className="w-12 h-12" onClick={() => setOpenedDialog('create')}>
          <CirclePlus />
        </Button>
      </div>
    </div>
  )
}
