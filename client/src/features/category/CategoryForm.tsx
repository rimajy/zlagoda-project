import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CategorySchemaType } from '@/shared/schemas/category.schema'
import { FormProps } from '@/shared/types/FormProps'

export const CategoryForm = ({
  form,
  onSubmit,
  buttonText,
}: FormProps<CategorySchemaType>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='category_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder={'Gadgets'} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
