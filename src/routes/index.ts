import { createBrowserRouter } from "react-router";
import RootLayout from "../components/layout/RootLayout";
import Root from "../pages/Root";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import NotFound from "@/pages/NotFound";
import Booking from "@/pages/Booking";
import User from "@/pages/User";
import Transportation from "@/pages/Transportation";
import MulitFactorAuthentication from "@/pages/MulitFactorAuthentication";

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
      {
        path: "/dashboard",
        Component: AppLayout,
        children: [
          { index: true, Component: Dashboard },
          {
            path: "booking",
            Component: Booking,
          },
          {
            path: "user",
            Component: User,
          },
          {
            path: "transportation",
            Component: Transportation,
          },
          {
            path: "multi-factor-auth",
            Component: MulitFactorAuthentication,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
