import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AboutUs from "../Pages/AboutUs/AboutUs";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import LibrarianRoute from "./LibrarianRoute";
//dashboard
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
import DashboardHomePage from "../Layout/DashboardHomePage";

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
    // The main Dashboard layout must still be wrapped by PrivateRoute
    // to ensure *only* logged-in users can access the dashboard at all.
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHomePage></DashboardHomePage>,
      },
      {
        path: "my-orders",
        Component: MyOrders, // Already protected by PrivateRoute wrapper on DashboardLayout
      },
      {
        path: "my-profile",
        Component: MyProfile, // Already protected by PrivateRoute wrapper on DashboardLayout
      },
      {
        path: "invoices",
        Component: Invoices, // Already protected by PrivateRoute wrapper on DashboardLayout
      },
      {
        path: "my-wishlist",
        // Explicit wrapper (better practice, but redundant if DashboardLayout is protected)
        element: (
          <PrivateRoute>
            <MyWishlist></MyWishlist>
          </PrivateRoute>
        ),
      },

      // ===================================
      // 📚 LIBRARIAN ROUTES (Protected by LibrarianRoute)
      // ===================================
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks></MyBooks>
          </LibrarianRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <LibrarianRoute>
            <BookEdit></BookEdit>
          </LibrarianRoute>
        ),
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook></AddBook>
          </LibrarianRoute>
        ),
      },
      {
        // This typically refers to librarian's orders
        path: "all-orders",
        element: (
          <LibrarianRoute>
            <Orders></Orders>
          </LibrarianRoute>
        ),
      },

      // ===================================
      // 👑 ADMIN ROUTES (Protected by AdminRoute)
      // ===================================
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks></ManageBooks>
          </AdminRoute>
        ),
      },
    ],
  },
]);
