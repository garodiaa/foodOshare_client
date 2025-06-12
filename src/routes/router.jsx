import { createBrowserRouter } from "react-router";
import Homelayout from "../layouts/Homelayout";
import Home from "../pages/public/Home";
import Loading from "../components/Loading";
import AvailableFood from "../pages/public/AvailableFood";
import AddFood from "../pages/private/AddFood";
import MyFoodRequest from "../pages/private/MyFoodRequest";
import MyFood from "../pages/private/MyFood";
import FoodDetails from "../pages/public/FoodDetails";
import Authlayout from "../layouts/Authlayout";
import Login from "../pages/public/Login";
import Register from "../pages/public/Register";
import PrivateRoute from "../providers/PrivateRoute";
import axios from "axios";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Homelayout></Homelayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "available-foods",
        element: <AvailableFood></AvailableFood>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "add-food",
        element: <PrivateRoute><AddFood></AddFood></PrivateRoute>,
      },
      {
        path: "my-food-requests/:email",
        element: <PrivateRoute><MyFoodRequest></MyFoodRequest></PrivateRoute>,
      },
      {
        path: "manage-foods/:email",
        element: <PrivateRoute><MyFood></MyFood></PrivateRoute>
      },
      {
        path: "food/:id",
        element: <FoodDetails></FoodDetails>,
        loader: ({params}) => axios(`${import.meta.env.VITE_API_URL}/foods/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>
      },

    ]
  },
  {
    path: "auth",
    element: <Authlayout></Authlayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: "register",
        element: <Register></Register>
      }
    ]
  }
]);