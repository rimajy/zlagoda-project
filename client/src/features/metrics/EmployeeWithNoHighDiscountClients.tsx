import { useEmployeesWithNoHighDiscountClients } from '@/shared/hooks/employee/useEmployeesWithNoHighDiscountClients'

export const EmployeeWithNoHighDiscountClients = () => {
  const {data: employees} = useEmployeesWithNoHighDiscountClients();

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <h2 className="font-bold text-3xl">Employees with no high discount clients (over 10%)</h2>
      {employees?.map(employee => {
         return (
           <div key={employee.id_employee} className="flex gap-2">
             <p>{employee.id_employee}</p>
             <p>{employee.empl_surname}</p>
             <p>{employee.empl_name}</p>
           </div>
         )
      })}
    </div>
  )
}