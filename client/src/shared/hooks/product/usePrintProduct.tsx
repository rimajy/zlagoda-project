import { usePrint } from '@/shared/hooks/usePrint'
import { useProducts } from '@/shared/hooks/product/useProducts'

export const usePrintProduct = () => {
  const {data: products, isLoading, isError} = useProducts();
  const print = usePrint();

  const printProducts = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category Number</th>
            <th>Name</th>
            <th>Characteristics</th>
          </tr>
        </thead>
        <tbody>
          ${
            products!.map(product => {
              return `
              <tr>
                <td>${product.id_product}</td>
                <td>${product.category_number}</td>
                <td>${product.product_name}</td>
                <td>${product.characteristics.slice(0,20)}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Products`, `Products Report`);
  }

  return { printProducts, isLoading, isError };
}