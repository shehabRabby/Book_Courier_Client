import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import "./index.css";
import { router } from "./Routes/Router.jsx";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <RouterProvider router={router} />
      <Toaster></Toaster>
    </AuthProvider>
   </QueryClientProvider>
  </StrictMode>
);
