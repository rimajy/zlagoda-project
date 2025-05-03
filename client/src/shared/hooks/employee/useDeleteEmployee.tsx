import { QueryKeys } from '@/shared/constants/query-keys'
import { employeeService } from '@/shared/services/exployee.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: employeeService.deleteEmployee,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.EMPLOYEES],
        exact: false,
      })
    },
  })
}
