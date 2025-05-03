import { useCategories } from '@/shared/hooks/category/useCategories'
import { usePrint } from '@/shared/hooks/usePrint'

export const usePrintCategory = () => {
  const {data: categories, isLoading, isError} = useCategories();
  const print = usePrint();

  const printCategories = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>Category Number</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          ${
            categories!.map(category => {
              return `
              <tr>
                <td>${category.category_number}</td>
                <td>${category.category_name}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Categories`, `Categories Report`);
  }

  return { printCategories, isLoading, isError };
}