import { useCurrentEmployee } from '@/shared/hooks/auth/useCurrentEmployee'

export const useEmployeeRole = () => {
  const { data, isSuccess } = useCurrentEmployee()

  return isSuccess ? data?.empl_role : undefined;
}