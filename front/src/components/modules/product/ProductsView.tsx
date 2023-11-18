import { ProductCard } from "./ProductCard";
import { useProductView } from "./useProductView";

export const ProductsView = () => {
  const { error, isLoading, data } = useProductView();

  return (
    <>
      <section className="mt-4 mx-3">
        {error && <span className="text-red-700">{error}</span>}
        {isLoading ? "Loading ... " : ""}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {data?.map((product) => {
            return (
              <ProductCard key={product.id + product.title} product={product} />
            );
          })}
        </div>
      </section>
    </>
  );
};
