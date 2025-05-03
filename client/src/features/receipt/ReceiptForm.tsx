import { useCustomer } from '@/shared/hooks/customer/useCustomer'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormProps } from '@/shared/types/FormProps'
import { ReceiptSchemaType } from '@/shared/schemas/receipt.schema'
import { SelectCustomer } from '@/components/SelectCustomer'
import { SelectProducts } from './SelectProducts'

export const ReceiptForm = ({
  form,
  onSubmit,
  buttonText,
}: FormProps<ReceiptSchemaType>) => {
  const [totalSum, setTotalSum] = useState(0);
  const watchedProducts = form.watch("products");
  const watchedCustomerCardNumber = form.watch("card_number");
  const {data: customer} = useCustomer(watchedCustomerCardNumber ?? undefined);

  useEffect(() => {
    const products = form.getValues("products");
    if (!products || products.length === 0) {
      setTotalSum(0);
      return;
    }

    setTotalSum(
      products.reduce(
        (prev, product) => prev + product.products_number * product.selling_price, 0)
    )
  }, [watchedProducts])

  let sum = totalSum;
  let customerSale = customer ? customer.percent * 0.01 * sum : 0;
  let sumWithSale = sum - customerSale;
  let vat = sumWithSale * 0.2;
  let finalSum = sumWithSale + vat;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='card_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Customer</FormLabel>
              <SelectCustomer value={field.value} onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='products'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Products*</FormLabel>
              <SelectProducts onChange={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <p>Sum: <span>{sum.toFixed(4)}</span></p>
        {customer ? (<p>Customer Sale: <span>{sum.toFixed(4)} * {customer.percent}% = {customerSale.toFixed(4)}</span></p>) : null}
        <p>Vat: <span>{(sum - customerSale).toFixed(4)} * 20% = {vat.toFixed(4)}</span></p>
        <p>Total: <span>{sumWithSale.toFixed(4)} + {vat.toFixed(4)} = {finalSum.toFixed(4)}</span></p>
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
