import { useGlobalState } from "@/hooks/useGlobalContext";
import { axiosCall } from "@/infraestructure/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export const App = () => {
  const { isLogged } = useGlobalState();
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, navigate]);

  useEffect(() => {
    axiosCall({ method: "get", endpoint: "products" }).then((resp) => {
      setCarts(resp.data.results);
    });
  }, []);
  console.log({ carts });
  return (
    <>
      <section className="mt-4 mx-3">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-1">
          {/* {data?.pages?.map((page) =>
          page.results.map((movieResult) => (
            <MovieCard movieResult={movieResult} key={movieResult.id} />
          ))
        )} */}
        </div>
      </section>
    </>
  );
};
