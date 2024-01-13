import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout";
import NotFound404 from "../layout/NotFound404";
import Auth from "../components/auth/Auth";
import Home from "../components/home";
import OneProduct from "../components/products/OneProduct";
import Profile from "../components/profile";
import EditProfile from "../components/profile/editProfile";
import ChangePasswordForm from "../components/changePasswordForm";
import LayoutAdmin from "../layout/admin/layoutAdmin";
import Dashboard from "../components/dashboard";
import AddProduct from "../layout/admin/products/addProduct";
import EditProduct from "../layout/admin/products/editProduct";
import AllProduct from "../layout/admin/products/allProduct";
import Cart from "../components/cart";
import Email from "../components/email";
import OrdersFromUsers from "../layout/admin/ordersFromUsers";
import Payment from "../components/payment";
import ConstructionPage from "../layout/constructionPage";
import UpdateAddress from "../components/profile/updateAddress";

const AppRoutes = () => {
  const checkAdmin = () => {
    return () => {
      const role = JSON.parse(localStorage.getItem("user"))?.role;
      console.log(role);
      return role == "admin" || role == "superadmin";
    };
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "user/signUp",
          element: <Auth />,
        },
        {
          path: "user/signIn",
          element: <Auth />,
        },
        {
          path: "singleProduct/:id",
          element: <OneProduct />,
        },
        {
          path: "user/profile",
          element: <Profile />,
        },
        {
          path: "/user/editProfile",
          element: <EditProfile />,
        },
        {
          path: "user/editAddress",
          element: <UpdateAddress />,
        },
        {
          path: "/user/editProfile/password",
          element: <ChangePasswordForm />,
        },
        {
          path: "/user/cart",
          element: <Cart />,
        },
        {
          path: "/user/cart/payment",
          element: <Payment />,
        },
        {
          path: "/user/email",
          element: <Email />,
        },
        {
          path: "/user/page-in-building",
          element: <ConstructionPage />,
        },
      ],
    },
    checkAdmin() && {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin",
          element: <Dashboard />,
        },
        {
          path: "addProduct",
          element: <AddProduct />,
        },
        {
          path: "allProductAdmin",
          element: <AllProduct   />,
        },
        {
          path: "editProduct/:id",
          element: <EditProduct />,
        },
        {
          path: "allOrders",
          element: <OrdersFromUsers />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound404 />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRoutes;
