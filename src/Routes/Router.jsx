import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import { Component } from "react";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Rider from "../Pages/BookRider/Rider";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import MyOrders from "../Pages/Dashboard/MyOrders/MyOrders";
import MyProfile from "../Pages/Dashboard/MyOrders/MyProfile/MyProfile";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BookDetails from "../Pages/BookDetails/BookDetails";
import AddBook from "../Pages/Dashboard/AddBook/AddBook";
import AllBook from "../Pages/AllBook/AllBook";
import MyBooks from "../Pages/Dashboard/MyBook/MyBooks";
import Orders from "../Pages/Dashboard/Orders/Orders";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageBooks from "../Pages/Dashboard/ManageBooks/ManageBooks";
import Invoices from "../Pages/Dashboard/Invoices/invoices";
import MyWishlist from "../Pages/Dashboard/MyWishlist/MyWishlist";
import PaymentPage from "../Pages/Payment/PaymentPage";
import BookEdit from "../Pages/Dashboard/MyBook/BookEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "all-books",
        Component: AllBook,
      },
      {
        path: "/book/:id",
        Component: BookDetails,
      },
      {
        path: "/payment/:orderId",
        element: (
          <PrivateRoute>
            <PaymentPage></PaymentPage>
          </PrivateRoute>
        ),
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-books",
        Component: MyBooks,
      },
      {
        path: "edit-book/:id",
        Component: BookEdit,
      },
      {
        path: "add-book",
        Component: AddBook,
      },
      {
        path: "all-orders",
        Component: Orders,
      },
      {
        path: "all-users",
        Component: AllUsers,
      },
      {
        path: "manage-books",
        Component: ManageBooks,
      },
      {
        path: "invoices",
        Component: Invoices,
      },
      {
        path: "my-wishlist",
        Component: MyWishlist,
      },
    ],
  },
]);
