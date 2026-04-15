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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path: '/coverage',
        Component:Coverage,
        loader: ()=> fetch('/serviceCenters.json').then(res=>res.json())

      },
    ]
  },
  {
    path:'/',
    Component: AuthLayout,
    children:[
      {
        path: '/login',
        Component: Login
      },
      {
        path:'/register',
        Component: RegisterForm
      },
      {
        path:'/forgot-password'
      }
    ]
  },
  {
    path: '/*',
    Component: NotFound
  },
  {
    path: '/be-rider',
    element: <PrivateRoute><Rider></Rider></PrivateRoute>
  },
  {
    path:'/send-parcel',
    element:<SendParcel></SendParcel>,
   loader: ()=> fetch('/serviceCenters.json').then(res=>res.json())

  }
]);