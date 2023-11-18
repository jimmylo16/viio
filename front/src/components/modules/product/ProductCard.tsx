import { Product } from "@/interfaces/carts";
import { FC } from "react";

type ProductCardProps = {
  product: Product;
};
export const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-2 m-2">
      <span className="text-blue-700 font-medium ">{product.title}</span>
      <img src={product.thumbnail} alt="" className="object-cover w-40 h-40" />
    </div>
  );
};
