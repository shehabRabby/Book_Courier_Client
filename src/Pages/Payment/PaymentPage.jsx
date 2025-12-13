import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaLock,
} from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 

const PaymentPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [dbUpdateStatus, setDbUpdateStatus] = useState("pending");

  // Initialize state with a loading message
  const [orderData, setOrderData] = useState({ 
        bookTitle: "Fetching Order...", 
        price: "..." 
    });
  const [loadingOrder, setLoadingOrder] = useState(true);

  const status = searchParams.get("status");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const email = user?.email;

    if (!orderId || !email) {
      setLoadingOrder(false);
      // Fallback if essential data is missing
      setOrderData({ bookTitle: "Missing Order ID or User", price: "N/A" });
      return;
    }

    const fetchOrderDetails = async () => {
      setLoadingOrder(true);
      try {
        // 💡 FIX ATTEMPT 2: Revert to basic ID lookup, relying solely on Axios Secure for auth header.
        // The previous attempt to add '?email=' likely confused the backend router.
        const res = await axiosSecure.get( 
          `/orders/${orderId}`
        );
        // Assuming response data contains { bookTitle, price, ... }
        setOrderData(res.data);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        // 🐛 Error Fallback: Set state to reflect the load failure clearly
        setOrderData({ bookTitle: "Failed to Load Book (404/Auth)", price: "N/A" });
      }
      setLoadingOrder(false);
    };
    
    // If not already loading/updating the DB, start fetching details.
    // This fetch should run on initial mount (when dependencies change).
    if (dbUpdateStatus === "pending" || dbUpdateStatus === "success") {
        fetchOrderDetails();
    }


    // 2. Client-side Success Update
    if (status === "success" && dbUpdateStatus === "pending") {
      setDbUpdateStatus("updating");

      const updatePaymentStatus = async () => {
        try {
            // PATCH request must include email if the backend needs it for authorization/lookup
          const res = await axiosSecure.patch( 
            `/orders/payment-success/${orderId}`,
            { sessionId: sessionId, email: email } 
          );

          if (res.data.acknowledged) {
            setDbUpdateStatus("success");
            toast.success("Order payment confirmed and database updated!");
            // Re-fetch order details to show the updated status
            fetchOrderDetails();
          } else {
            setDbUpdateStatus("failed");
            toast.error(
              "Payment confirmed by Stripe, but database update failed."
            );
          }
        } catch (err) {
          console.error("DB update error:", err);
          setDbUpdateStatus("failed");
          toast.error(
            "Payment confirmed by Stripe, but database update failed."
          );
        }
      };
      updatePaymentStatus();
    }
  }, [orderId, user?.email, status, dbUpdateStatus, axiosSecure]);
  
  // --- Dynamic Content Display Logic (Now handles loading and custom errors) ---
  let title, message, icon, color;

  if (loadingOrder || dbUpdateStatus === "updating") {
    title =
      dbUpdateStatus === "updating"
        ? "Confirming Payment..."
        : "Loading Order Details...";
    message =
      dbUpdateStatus === "updating"
        ? "Please wait, we are securing your payment status in our records."
        : "Please wait while we fetch your order details.";
    icon = (
      <FaSpinner className="mx-auto text-6xl text-gray-500 mb-4 animate-spin" />
    );
    color = "#ff0077";
  } else if (status === "success" && dbUpdateStatus === "success") {
    title = "Payment Successful!";
    message = `Thank you! Your order for "${
      orderData?.bookTitle || "the book"
    }" is PAID and is now being processed.`;
    icon = <FaCheckCircle className="mx-auto text-6xl text-green-600 mb-4" />;
    color = "#10B981";
  } else if (orderData.bookTitle.includes("Failed to Load")) {
    // 🐛 Custom display for the 404 error
    title = "Order Data Unavailable";
    message =
      "We successfully processed your payment (or it was cancelled), but we failed to load the order details from the server. Please check your 'My Orders' page or contact support.";
    icon = (
      <FaExclamationTriangle className="mx-auto text-6xl text-red-500 mb-4" />
    ); 
    color = "#EF4444";
  } else if (status === "success" && dbUpdateStatus === "failed") {
    title = "Payment Success Confirmed (DB Error)";
    message =
      "Payment was successful, but there was an error updating your order status. Please contact support with the Session ID below.";
    icon = (
      <FaExclamationTriangle className="mx-auto text-6xl text-yellow-600 mb-4" />
    ); 
    color = "#F59E0B";
  } else if (status === "cancelled") {
    title = "Payment Cancelled";
    message =
      "Your payment session was cancelled. The order remains in 'pending' status. You can try again from your 'My Orders' page.";
    icon = <FaTimesCircle className="mx-auto text-6xl text-red-600 mb-4" />;
    color = "#EF4444";
  } else {
    title = "Order Status Unknown";
    message =
      "The order status could not be determined. Please check your 'My Orders' page.";
    icon = <FaLock className="mx-auto text-6xl text-gray-500 mb-4" />;
    color = "#ff0077";
  }

  return (
    <div className="min-h-[60vh] bg-gray-100 flex items-center justify-center py-12">
      <div
        className="max-w-xl w-full bg-white p-8 rounded-xl shadow-2xl border-t-4"
        style={{ borderColor: color }}
      >
        {icon}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-6 text-lg">
          Order ID:{" "}
          <span className="font-mono font-semibold text-[#ff0077]">
            {orderId || "N/A"}
          </span>
        </p>

        {orderData && (
          <div className="mb-4 text-center p-3 bg-gray-100 rounded-lg">
            <p className="text-xl font-semibold text-gray-800">
              Book: {orderData.bookTitle}
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              Amount: ${orderData.price}
            </p>
          </div>
        )}

        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <p className="text-gray-700">{message}</p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/dashboard/my-orders"
            className="w-full block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Go to My Orders
          </Link>
        </div>

        {status === "success" && sessionId && (
            <div className="mt-4 p-4 text-sm bg-gray-200 rounded-lg break-words">
                <p className="font-bold text-gray-700">Payment Session ID (For support):</p>
                <code className="text-xs text-gray-600">{sessionId}</code>
            </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;