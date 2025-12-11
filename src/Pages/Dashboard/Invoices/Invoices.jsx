import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaFileInvoiceDollar,
  FaCreditCard,
  FaCalendarAlt,
  FaDollarSign,
  FaBook,
} from "react-icons/fa";
import Loading from "../../../Components/Logo/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";

const Invoices = () => {
  const { user, loading: authLoading } = useAuth();

  // 1. Fetch Paid Orders (Invoices)
  const {
    data: invoices = [],
    isLoading,
    isError,
  } = useQuery({
    // Backend endpoint required: /my-invoices/:email
    queryKey: ["myInvoices", user?.email],
    enabled: !!user?.email, // Only run if user email is available
    queryFn: async () => {
      if (!user?.email) return [];
      // Assuming VITE_API_URL is your backend server base URL
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/my-invoices/${user.email}`
      );
      return res.data;
    },
  });

  if (authLoading || isLoading) return <Loading></Loading>;
  if (isError || !user)
    return (
      <h1 className="text-center text-red-600 text-3xl pt-20">
        Failed to load invoices or user data.
      </h1>
    );

  // Helper function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
          <FaFileInvoiceDollar className="mr-3 text-indigo-600" /> Payment
          Invoices
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          A record of all your successful payment transactions.
        </p>
      </header>

      {invoices.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl shadow-lg mx-auto max-w-2xl">
          <FaCreditCard className="mx-auto text-6xl text-gray-400 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700">
            No Payments Recorded Yet
          </h3>
          <p className="text-gray-500 mt-2">
            Successful payments will appear here as invoices.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Book Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment ID (Stripe Session)
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="hover:bg-green-50/50 transition duration-150"
                >
                  {/* Book Title */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <FaBook className="inline mr-2 text-indigo-400" />
                    {invoice.bookTitle}
                  </td>

                  {/* Amount */}
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-green-600">
                    <FaDollarSign className="inline mr-1 text-green-500" />
                    {parseFloat(invoice.price).toFixed(2)}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <FaCalendarAlt className="inline mr-2 text-gray-400" />
                    {formatDate(invoice.orderDate)}
                  </td>

                  {/* Payment ID (Stripe Session ID) - FIX APPLIED HERE */}
                  <td
                    className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-700 max-w-xs truncate"
                    title={invoice.stripeSessionId}
                  >
                    <FaCreditCard className="inline mr-2 text-gray-400" />
                    {invoice.stripeSessionId 
                        ? `${invoice.stripeSessionId.substring(0, 20)}...` 
                        : 'ID Missing'
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Invoices;