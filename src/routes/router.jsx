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
        element: <AddFood></AddFood>,
      },
      {
        path: "my-food-request/:email",
        element: <MyFoodRequest></MyFoodRequest>,
      },
      {
        path: "my-food/:email",
        element: <MyFood></MyFood>
      },
      {
        path: "food-details/:id",
        element: <FoodDetails></FoodDetails>,
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