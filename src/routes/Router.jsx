import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/home/Home";
import Coverage from "../pages/coverage/Coverage";

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

      }
    ]
  },
]);