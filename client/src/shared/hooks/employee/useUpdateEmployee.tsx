import { QueryKeys } from '@/shared/constants/query-keys'
import { employeeService } from '@/shared/services/exployee.service'

import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: employeeService.updateEmployee,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.EMPLOYEES],
        exact: false,
      })
    },
  })
}
