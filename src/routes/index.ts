import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import Root from "../pages/Root";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: RootLayout(),
    children: [
      { index: true, Component: Root },
      {
        path: "/login",
        Component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    element: AppLayout(),
    children: [{ index: true, Component: Dashboard }],
  },
]);
