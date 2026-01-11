import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import {
  FaTimesCircle,
  FaTruckLoading,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// Status transition logic
const statusTransitions = {
  pending: "shipped",
  processing: "shipped",
  shipped: "delivered",
  delivered: "delivered",
  cancelled: "cancelled",
};

// Enhanced Badge logic using Indigo/Semantic colors
const getStatusBadgeClass = (status) => {
  switch (status) {
    case "delivered":
      return "border-emerald-500 text-emerald-600 bg-emerald-50";
    case "shipped":
      return "border-indigo-500 text-indigo-600 bg-indigo-50";
    case "pending":
    case "processing":
      return "border-amber-500 text-amber-600 bg-amber-50";
    case "cancelled":
      return "border-rose-500 text-rose-600 bg-rose-50";
    default:
      return "badge-neutral badge-outline";
  }
};

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const accentColor = "#6366f1"; // Changed to Indigo-500

  const axiosSecure = useAxiosSecure();

  const fetchOrders = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/orders`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch orders.",
        icon: "error",
        customClass: { popup: "bg-base-100 text-base-content rounded-[2rem]" },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleStatusChange = async (orderId, currentStatus) => {
    const nextStatus = statusTransitions[currentStatus];
    if (!nextStatus || nextStatus === currentStatus) return;

    Swal.fire({
      title: `Update to ${nextStatus.toUpperCase()}?`,
      text: `Transition from ${currentStatus} to ${nextStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: accentColor, // Indigo Confirm
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, Update!",
      background: "var(--fallback-b1,oklch(var(--b1)))",
      color: "var(--fallback-bc,oklch(var(--bc)))",
      customClass: { popup: "rounded-[2rem]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/orders/update-status/${orderId}`,
            {
              newStatus: nextStatus,
            }
          );
          if (res.data.modifiedCount > 0) {
            Swal.fire("Updated!", `Status is now ${nextStatus}.`, "success");
            fetchOrders();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to update.", "error");
        }
      }
    });
  };

  const handleCancelOrder = async (orderId, bookTitle) => {
    Swal.fire({
      title: `Cancel order?`,
      text: `Book: ${bookTitle}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Confirm Cancellation",
      background: "var(--fallback-b1,oklch(var(--b1)))",
      color: "var(--fallback-bc,oklch(var(--bc)))",
      customClass: { popup: "rounded-[2rem]" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
          if (res.data.modifiedCount > 0) {
            Swal.fire("Cancelled", "Order has been halted.", "success");
            fetchOrders();
          }
        } catch (error) {
          Swal.fire("Error", "Cancellation failed.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span
          className="loading loading-ring loading-lg"
          style={{ color: accentColor }}
        ></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content animate-in fade-in duration-500">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-black italic tracking-tight flex items-center justify-center gap-3 uppercase">
          <FaClipboardList style={{ color: accentColor }} />
          Order Fulfillment
        </h2>
        <p className="text-sm font-bold uppercase tracking-widest opacity-60 mt-2">
          Manage incoming orders and track shipment statuses.
        </p>
        <div className="h-1.5 w-24 bg-[#6366f1] mx-auto mt-4 rounded-full"></div>
      </header>

      <div className="overflow-x-auto shadow-2xl rounded-[2.5rem] border border-base-300 bg-base-100">
        <table className="table w-full">
          <thead className="bg-indigo-50/50">
            <tr className="text-indigo-600 uppercase text-xs font-black tracking-widest border-b border-base-300">
              <th className="py-5">Order Details</th>
              <th className="py-5">Customer</th>
              <th className="py-5">Payments</th>
              <th className="py-5 text-center">Fulfillment</th>
              <th className="py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {orders.map((order) => {
              const bookTitle = order.bookTitle || "Unknown Book";
              const isPaid = order.payment_status === "paid";
              const isFinal =
                order.status === "delivered" || order.status === "cancelled";
              const nextStatus = statusTransitions[order.status];
              const canTransition = nextStatus && nextStatus !== order.status;

              return (
                <tr
                  key={order._id}
                  className="cursor-pointer transition-colors group"
                >
                  <td className="py-5">
                    <div className="font-bold text-base tracking-tight">
                      {bookTitle}
                    </div>
                    <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                      ID: {order._id.slice(-8)}
                    </div>
                  </td>
                  <td className="text-sm font-medium">{order.email}</td>
                  <td>
                    <span
                      className={`badge font-black uppercase italic px-3 py-2 border ${
                        isPaid
                          ? "border-emerald-500 text-emerald-600 "
                          : "border-amber-500 text-amber-600 "
                      } text-[10px]`}
                    >
                      {order.payment_status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div
                      className={`badge ${getStatusBadgeClass(
                        order.status
                      )} font-black uppercase italic px-4 py-3 border-2 tracking-tighter text-xs`}
                    >
                      {order.status}
                    </div>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          handleStatusChange(order._id, order.status)
                        }
                        className={`btn btn-sm text-white border-none rounded-xl font-bold uppercase italic text-xs shadow-lg  transition-all active:scale-95 ${
                          isFinal ? "btn-ghost opacity-20" : ""
                        }`}
                        style={
                          !isFinal && isPaid && canTransition
                            ? { backgroundColor: accentColor }
                            : {}
                        }
                        disabled={!isPaid || isFinal || !canTransition}
                      >
                        {isFinal ? (
                          <FaBoxOpen className="text-lg " />
                        ) : !isPaid ? (
                          "Unpaid"
                        ) : (
                          <FaTruckLoading className="text-lg" />
                        )}
                        <span className="hidden lg:inline ml-2 ">
                          {isFinal
                            ? "Done"
                            : canTransition
                            ? `Next: ${nextStatus}`
                            : "N/A"}
                        </span>
                      </button>

                      <button
                        onClick={() => handleCancelOrder(order._id, bookTitle)}
                        className="btn btn-sm btn-circle  border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm"
                        disabled={isFinal}
                        title="Cancel Order"
                      >
                        <FaTimesCircle className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && (
        <div className="text-center py-20 bg-base-100 mt-10 rounded-[2rem] border-2 border-dashed border-base-300">
          <FaBoxOpen className="mx-auto text-5xl opacity-10 mb-4" />
          <p className="font-bold uppercase tracking-widest opacity-30 italic">
            No active orders found in inventory.
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
