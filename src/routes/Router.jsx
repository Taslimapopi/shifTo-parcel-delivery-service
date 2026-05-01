import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/home/Home";
import Coverage from "../pages/coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login/Login";
import RegisterForm from "../pages/auth/register/RegisterForm";
import NotFound from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import Dashboard from "../layouts/DashboardLayout";
import MyParcel from "../pages/Dashboard/my-parcel/My-parcel";

import PaymentCancelled from "../pages/Dashboard/PaymentCancelled";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess";
import Loading from "../components/Loading";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ApproveRiders from "../pages/rider/ApproveRider/ApproveRider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    hydrateFallbackElement: <Loading></Loading>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/be-rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>

        ),
        loader: ()=>fetch('/serviceCenters.json').then((res)=> res.json()),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: RegisterForm,
      },
      {
        path: "/forgot-password",
      },
    ],
  },
  {
    path: "/*",
    Component: NotFound,
  },

  {
    path: "/send-parcel",
    element: (
      <PrivateRoute>
        <SendParcel></SendParcel>
      </PrivateRoute>
    ),
    loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcel,
      },
      {
        path: "/dashboard/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/dashboard/payment-cancelled",
        Component: PaymentCancelled,
      },
      {
        path: "/dashboard/payment-history",
        Component: PaymentHistory,
      },
      {
        path:'/dashboard/approve-rider',
        Component: ApproveRiders
      }
    ],
  },
]);
