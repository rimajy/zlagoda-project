import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CategoryForm } from '@/features/category/CategoryForm'
import { useCreateCategory } from '@/shared/hooks/category/useCreateCategory'
import {
  CategorySchema,
  CategorySchemaType,
} from '@/shared/schemas/category.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'

interface CreateCategoryDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export const CreateCategoryDialog = (props: CreateCategoryDialogProps) => {
  const form = useForm<CategorySchemaType>({
    defaultValues: {
      category_name: '',
    },
    mode: 'onChange',
    resolver: zodResolver(CategorySchema),
  })
  const { mutateAsync: createCategory } = useCreateCategory()

  const submitHandler = async (data: CategorySchemaType) => {
    try {
      const newCategory = await createCategory(data)
      toast.success(
        `Category ${newCategory.category_name} created successfully`,
      )
      props.setOpen(false)
    } catch (e) {
      const error = e as ApiError
      toast.error(error.message)
    }
  }

  return (
    <Dialog modal={false} open={props.open} onOpenChange={props.setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create new category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          form={form}
          onSubmit={submitHandler}
          buttonText='Create'
        />
      </DialogContent>
    </Dialog>
  )
}
