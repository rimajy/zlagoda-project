import { usePrint } from '@/shared/hooks/usePrint'
import { useEmployees } from '@/shared/hooks/employee/useEmployees'

export const usePrintEmployee = () => {
  const {data: employees, isLoading, isError} = useEmployees();
  const print = usePrint();

  const printEmployee = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Full Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          ${
      employees!.map(employee => {
              return `
              <tr>
                <td>${employee.id_employee}</td>
                <td>${employee.empl_surname} ${employee.empl_name} ${employee.empl_patronymic}</td>
                <td>${employee.empl_role}</td>
                <td>${employee.salary}</td>
                <td>${employee.date_of_birth}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Employee`, `Employee Report`);
  }

  return { printEmployee, isLoading, isError };
}