import { useEffect } from 'react'

import { QueryKeys } from '@/shared/constants/query-keys'
import { useLogout } from '@/shared/hooks/auth/useLogout'
import { employeeService } from '@/shared/services/exployee.service'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useCurrentEmployee = () => {
  const query = useQuery({
    queryFn: employeeService.getCurrentEmployeeInfo,
    queryKey: [QueryKeys.CURRENT_EMPLOYEE],
  })
  const router = useRouter()
  const { mutateAsync: logout } = useLogout()

  useEffect(() => {
    if (query.isError) {
      logout()
        .then(() => router.push('/login'))
        .catch(() => router.push('/login'))
    }
  }, [query.isError])

  return query
}
