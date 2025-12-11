import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import {
  FaCreditCard,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
} from "react-icons/fa";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const PaymentPage = () => {
  const { orderId } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();

  // State to track if the payment status has been sent to the backend
  const [dbUpdateStatus, setDbUpdateStatus] = useState("pending"); // pending | updating | success | failed

  // Order data for display
  const [orderData, setOrderData] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);

  // Get query parameters from Stripe redirect
  const status = searchParams.get("status"); // 'success' or 'cancelled'
  const sessionId = searchParams.get("session_id");

  // Effect to fetch order details and update payment status
  useEffect(() => {
    if (!orderId || !user?.email) {
      setLoadingOrder(false);
      return;
    }

    // 1. Fetch Order Details for display
    const fetchOrderDetails = async () => {
      setLoadingOrder(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/${orderId}`
        );
        setOrderData(res.data);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setOrderData({ bookTitle: "Unknown Book", price: "0.00" });
      }
      setLoadingOrder(false);
    };
    fetchOrderDetails();

    // 2. Client-side Success Update
    if (status === "success" && dbUpdateStatus === "pending") {
      setDbUpdateStatus("updating");

      const updatePaymentStatus = async () => {
        try {
          const res = await axios.patch(
            `${import.meta.env.VITE_API_URL}/orders/payment-success/${orderId}`,
            { sessionId: sessionId }
          );

          if (res.data.acknowledged) {
            setDbUpdateStatus("success");
            toast.success("Order payment confirmed and database updated!");
            // Re-fetch order details to show the updated status (Paid/Processing)
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
  }, [orderId, user?.email, status, dbUpdateStatus]);
  // dbUpdateStatus is in the dependency array to ensure the update only runs once.

  // --- Dynamic Content Display Logic ---
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
  } else if (status === "success" && dbUpdateStatus === "failed") {
    title = "Payment Success Confirmed (DB Error)";
    message =
      "Payment was successful, but there was an error updating your order status. Please contact support with the Session ID below.";
    icon = (
      <FaExclamationTriangle className="mx-auto text-6xl text-yellow-600 mb-4" />
    ); // Assuming FaExclamationTriangle is available
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
          {sessionId && (
            <p className="text-xs mt-2 text-gray-500">
              Stripe Session ID: {sessionId}
            </p>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <Link
            to="/dashboard/my-orders"
            className="w-full block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
          >
            Go to My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
