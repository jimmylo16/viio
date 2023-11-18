import { useGlobalState } from "@/hooks/useGlobalContext";
import { axiosCall } from "@/infraestructure/axios";
import { Carts, Product } from "@/interfaces/carts";
import { TFetchState } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useProductView = () => {
  const { isLogged } = useGlobalState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);
  const [fetchState, setFetchState] = useState<TFetchState<Product[]>>({
    isLoading: false,
    data: null,
    error: null,
  });
  useEffect(() => {
    setFetchState((prev) => ({
      ...prev,
      error: null,
      isLoading: true,
    }));

    if (isLogged) {
      axiosCall<Carts>({ method: "get", endpoint: "products" })
        .then((carts) => {
          const products = carts.carts
            .map((cart) => {
              return cart.products;
            })
            .flat();
          const productSets = new Set();
          const unique = products.filter((prod) => {
            if (!productSets.has(prod.id)) {
              productSets.add(prod.id);
              return true;
            }
            return false;
          });
          setFetchState((prev) => ({
            ...prev,
            isLoading: false,
            data: unique,
          }));
        })
        .catch((error) => {
          console.log(error);
          setFetchState((prev) => ({
            ...prev,
            isLoading: false,
            error: `Error loading the products
                   ${error.message}`,
          }));
        });
    }
  }, [isLogged]);

  const { isLoading, data, error } = fetchState;
  return { isLoading, data, error };
};
