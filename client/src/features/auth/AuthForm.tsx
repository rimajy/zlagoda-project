'use client'

import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLogin } from '@/shared/hooks/auth/useLogin'
import {
  LoginFormSchema,
  LoginFormSchemaType,
} from '@/shared/schemas/login-form.schema'
import { ApiError } from '@/shared/types/ApiError'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

export function AuthForm() {
  const form = useForm<LoginFormSchemaType>({
    defaultValues: {
      login: '',
      password: '',
    },
    resolver: zodResolver(LoginFormSchema),
  })
  const { mutateAsync: login } = useLogin()
  const router = useRouter()

  const submitHandler = async (data: LoginFormSchemaType) => {
    try {
      await login(data)
      router.push('/dashboard')
    } catch (e) {
      const error = e as ApiError

      console.log(error)

      switch (error.statusCode) {
        case 404:
          form.setError('login', { type: 'manual', message: 'Invalid login' })
          break
        case 400:
          form.setError('password', {
            type: 'manual',
            message: 'Invalid password',
          })
          break
      }
    }
  }

  return (
    <Card className='p-6 min-w-[400px]'>
      <Form {...form}>
        <form
          className='flex flex-col gap-4'
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name='login'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Login</FormLabel>
                <FormControl>
                  <Input placeholder='employee-ivan-ivanov' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='password123' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            color='primary'
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </Form>
    </Card>
  )
}
