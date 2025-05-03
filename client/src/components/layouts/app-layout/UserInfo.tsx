'use client'

import { useCurrentEmployee } from '@/shared/hooks/auth/useCurrentEmployee'
import { useLogout } from '@/shared/hooks/auth/useLogout'
import { Button } from '@/components/ui/button'

export const UserInfo = () => {
  const { data, isSuccess } = useCurrentEmployee()
  const {mutateAsync: logout} = useLogout()

  return isSuccess ? (
    <>
      <div className='flex gap-2 items-center'>
        <div className='bg-gray-900 text-gray-50 py-1.5 px-2.5 rounded-lg text-sm select-none'>
          {data?.empl_role}
        </div>
        <p className='text-lg font-medium'>
          {data?.empl_surname} {data?.empl_name} {data?.empl_patronymic}
        </p>
        <Button size="sm" variant="outline" className="ml-4" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </>

  ) : (
    <span>Loading...</span>
  )
}
