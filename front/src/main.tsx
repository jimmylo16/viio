import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { App } from "./routes/App";
import { GlobalProvider } from "./components/GlobalContext";

const router = createBrowserRouter([
  {
    element: <GlobalProvider />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
