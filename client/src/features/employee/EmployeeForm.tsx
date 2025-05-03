import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EmployeeRole } from '@/shared/entities/employee'
import {
  EmployeeSchemaType,
  EmployeeUpdateSchemaType,
} from '@/shared/schemas/employee.schema'
import { FormProps } from '@/shared/types/FormProps'

interface EmployeeFormProps
  extends FormProps<EmployeeSchemaType | EmployeeUpdateSchemaType> {
  hideAuthFields: boolean
}

export const EmployeeForm = ({
  form,
  onSubmit,
  buttonText,
  hideAuthFields,
}: EmployeeFormProps) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='empl_surname'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='empl_name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='empl_patronymic'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patronymic</FormLabel>
              <Input {...field} value={field.value ?? ''} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='empl_role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role*</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    {Object.values(EmployeeRole).map(role => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='salary'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary*</FormLabel>
              <Input
                type='number'
                min={0}
                step={0.01}
                {...field}
                value={String(field.value)}
                onChange={e =>
                  field.onChange(
                    e.target.value !== undefined ? +e.target.value : undefined,
                  )
                }
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date_of_birth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth*</FormLabel>
              <DatePicker
                mode='single'
                date={field.value}
                setDate={field.onChange}
                toYear={new Date().getFullYear() - 18}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date_of_start'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Start*</FormLabel>
              <DatePicker
                mode='single'
                date={field.value}
                setDate={field.onChange}
                toYear={new Date().getFullYear()}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='phone_number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>City*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='street'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Street*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='zip_code'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zip Code*</FormLabel>
              <Input {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        {!hideAuthFields && (
          <>
            <FormField
              control={form.control}
              name='login'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login*</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password*</FormLabel>
                  <Input type='password' {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
