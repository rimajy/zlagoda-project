import { authService } from '@/shared/services/auth.service'

import { useMutation } from '@tanstack/react-query'

export const useLogin = () => {
  return useMutation({
    mutationFn: authService.login,
  })
}
