import { authService } from '@/shared/services/auth.service'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      router.push('/');
    }
  })
}
