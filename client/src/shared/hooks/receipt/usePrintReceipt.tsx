import { usePrint } from '@/shared/hooks/usePrint'
import { useReceipts } from '@/shared/hooks/receipt/useReceipts'

export const usePrintReceipt = () => {
  const {data: receipts, isLoading, isError} = useReceipts();
  const print = usePrint();

  const printReceipt = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>Receipt Number</th>
            <th>Employee</th>
            <th>Customer</th>
            <th>Sum Total</th>
            <th>Vat</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          ${
      receipts!.map(receipt => {
              return `
              <tr>
                <td>${receipt.receipt_number}</td>
                <td>${receipt.employee.empl_surname} ${receipt.employee.empl_name}</td>
                <td>${receipt.customer ? `${receipt.customer.cust_surname} ${receipt.customer.cust_name}${receipt.customer.cust_patronymic ?? ""}` : 'null'}</td>
                <td>${receipt.sum_total}</td>
                <td>${receipt.vat}</td>
                <td>${receipt.print_date}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Receipt`, `Receipt Report`);
  }

  return { printReceipt, isLoading, isError };
}