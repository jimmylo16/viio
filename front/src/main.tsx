import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { App } from "./routes/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    children: [],
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: "/register",
    element: (
      <Layout>
        <Register />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
