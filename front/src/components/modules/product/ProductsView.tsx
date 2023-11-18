import { Input } from "@/components/ui/input";
import { ProductCard } from "./ProductCard";
import { useProductView } from "./useProductView";

export const ProductsView = () => {
  const { error, isLoading, filteredData, onSearch } = useProductView();

  return (
    <>
      <div className="flex flex-row gap-4 w-1/2">
        <Input
          className="rounded-2xl w-full"
          placeholder="Search product"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <section className="mt-4 mx-3">
        {error && <span className="text-red-700">{error}</span>}
        {isLoading ? "Loading ... " : ""}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {filteredData?.map((product) => {
            return (
              <ProductCard key={product.id + product.title} product={product} />
            );
          })}
        </div>
      </section>
    </>
  );
};
