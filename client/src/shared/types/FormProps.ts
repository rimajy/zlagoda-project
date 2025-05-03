import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T, unknown, T>
  onSubmit: (data: T) => Promise<void>
  buttonText: string
}
