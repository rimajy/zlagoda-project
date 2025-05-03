import { SelectProduct } from '@/components/SelectProduct'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { StoreProductSchemaType } from '@/shared/schemas/store-product.schema'
import { FormProps } from '@/shared/types/FormProps'

export const StoreProductForm = ({
  form,
  buttonText,
  onSubmit,
}: FormProps<StoreProductSchemaType>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='id_product'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product</FormLabel>
              <SelectProduct value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='selling_price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  value={String(field.value)}
                  onChange={e =>
                    field.onChange(
                      e.target.value !== undefined
                        ? +e.target.value
                        : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='products_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products Amount</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  {...field}
                  value={String(field.value)}
                  onChange={e =>
                    field.onChange(
                      e.target.value !== undefined
                        ? +e.target.value
                        : undefined,
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='promotional_product'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotional?</FormLabel>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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
