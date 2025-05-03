import { PropsWithChildren } from 'react'

import { AppLayout } from '@/components/layouts/app-layout/AppLayout'

export default function Layout({ children }: PropsWithChildren) {
  return <AppLayout>{children}</AppLayout>
}
