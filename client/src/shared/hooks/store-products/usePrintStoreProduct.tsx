import { usePrint } from '@/shared/hooks/usePrint'
import { useStoreProducts } from '@/shared/hooks/store-products/useStoreProducts'

export const usePrintStoreProduct = () => {
  const {data: storeProduct, isLoading, isError} = useStoreProducts();
  const print = usePrint();

  const printStoreProduct = () => {
    if (isLoading || isError) {
      return;
    }

    const printString = `
      <table>
        <thead>
          <tr>
            <th>UPC</th>
            <th>Product Name</th>
            <th>Selling Price</th>
            <th>Product Number</th>
            <th>Promotional?</th>
          </tr>
        </thead>
        <tbody>
          ${
      storeProduct!.map(storeProduct => {
              return `
              <tr>
                <td>${storeProduct.upc}</td>
                <td>${storeProduct.product?.product_name}</td>
                <td>${storeProduct.selling_price}</td>
                <td>${storeProduct.products_number}</td>
                <td>${storeProduct.promotional_product ? "TRUE" : "FALSE"}</td>
              </tr>
            `
            }).join(`\n`)
          }
        </tbody>
      </table>
    `

    print(printString, `Store Products`, `Store Products Report`);
  }

  return { printStoreProduct, isLoading, isError };
}