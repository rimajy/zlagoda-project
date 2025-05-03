import { PropsWithChildren } from 'react'

import { AuthLayout } from '@/components/layouts/auth-layout/AuthLayout'

export default function Layout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>
}
