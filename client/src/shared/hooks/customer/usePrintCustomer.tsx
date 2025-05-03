import { usePrint } from '@/shared/hooks/usePrint'
import { useCustomers } from '@/shared/hooks/customer/useCustomers'

export const usePrintCustomer = () => {
  const {data: customers, isLoading, isError} = useCustomers();
  const print = usePrint();

  const printCustomers = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>Card Number</th>
            <th>Surname</th>
            <th>Name</th>
            <th>Patronymic</th>
            <th>Phone</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          ${
            customers!.map(customer => {
              return `
              <tr>
                <td>${customer.card_number}</td>
                <td>${customer.cust_surname}</td>
                <td>${customer.cust_name}</td>
                <td>${customer.cust_patronymic}</td>
                <td>${customer.phone_number}</td>
                <td>${customer.percent}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Customers`, `Customers Report`);
  }

  return { printCustomers, isLoading, isError };
}