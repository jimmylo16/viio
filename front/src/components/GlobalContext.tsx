import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Header } from "./layout/Header";
import { Outlet } from "react-router-dom";

export type views = "" | "login" | "register";

export type TsetView = contextDispatch<views>;

type contextDispatch<T> = Dispatch<SetStateAction<T>> | ((views: T) => void);
type ContextType = {
  view: views;
  setView: TsetView;
  setIsLogged: contextDispatch<boolean>;
  isLogged: boolean;
};
export const GlobalContext = createContext<ContextType>({
  view: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setView: (_views: views) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsLogged: (_islogged: boolean) => {},
  isLogged: false,
});

export const GlobalProvider = () => {
  const [view, setView] = useState<views>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <GlobalContext.Provider value={{ setView, view, setIsLogged, isLogged }}>
      <Header setView={setView} />
      <main
        className={`flex min-h-screen flex-col items-center justify-between sm:px-24 sm:pt-8 `}
      >
        <Outlet />
      </main>
    </GlobalContext.Provider>
  );
};