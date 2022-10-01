import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./routes/Root";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./routes/ErrorPage";
import Home from "./routes/Home";
import Add from "./routes/Add";
import EditPage from "./routes/Edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "add", element: <Add /> },
      { path: "edit/:id", element: <EditPage /> },
    ],
  },
]);

const rootEl = document.getElementById("root");

if (rootEl) {
  ReactDOM.createRoot(rootEl).render(
    // <React.StrictMode>
    <RouterProvider router={router} />
    // </React.StrictMode>
  );
}
