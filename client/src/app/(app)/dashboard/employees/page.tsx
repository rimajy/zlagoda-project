import { Employees } from '@/features/employee/Employees'
import { EmployeesWrapper } from '@/features/employee/EmployeesWrapper'

export default function Page() {
  return (
    <EmployeesWrapper>
      <Employees />
    </EmployeesWrapper>
  )
}
