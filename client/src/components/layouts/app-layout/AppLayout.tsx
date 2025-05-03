import { PropsWithChildren } from 'react'

import { NavLinks } from '@/components/layouts/app-layout/NavLinks'

import { UserInfo } from './UserInfo'

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='container px-4 mx-auto min-h-screen relative'>
      <nav className='py-4 flex justify-between'>
        <NavLinks />
        <UserInfo />
      </nav>
      <main className='relative'>{children}</main>
    </div>
  )
}
