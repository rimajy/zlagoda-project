import { useNotSoldProducts } from '@/shared/hooks/product/useNotSoldProducts'

export const NotSoldProducts = () => {
  const {data: notSoldProducts} = useNotSoldProducts();

  return (
    <div className="flex flex-col gap-2 items-center mt-4">
      <h2 className="font-bold text-3xl">Not sold products</h2>
      {notSoldProducts?.map(product => {
        return (
          <div key={product.id_product} className="flex gap-2">
            <p>{product.product_name}</p>
          </div>
        )
      })}
    </div>
  )
}