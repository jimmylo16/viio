import { useGlobalState } from "@/hooks/useGlobalContext";
import { axiosCall } from "@/infraestructure/axios";
import { Carts, Product } from "@/interfaces/carts";
import { TFetchState } from "@/interfaces/common";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const App = () => {
  const { isLogged } = useGlobalState();
  const navigate = useNavigate();
  const [fetchState, setFetchState] = useState<TFetchState<Product[]>>({
    isLoading: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

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

  return (
    <>
      <section className="mt-4 mx-3">
        {fetchState.error && (
          <span className="text-red-700">{fetchState.error}</span>
        )}
        {fetchState.isLoading ? "Loading ... " : ""}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          {fetchState.data?.map((product) => {
            return (
              <div
                key={product.id + product.title}
                className="flex flex-col gap-2 m-2"
              >
                <span className="text-blue-700 font-medium ">
                  {product.title}
                </span>
                <img
                  src={product.thumbnail}
                  alt=""
                  className="object-cover w-40 h-40"
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
