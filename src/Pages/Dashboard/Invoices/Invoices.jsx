import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaFileInvoiceDollar,
  FaCreditCard,
  FaCalendarAlt,
  FaDollarSign,
  FaBook,
} from "react-icons/fa";
import Loading from "../../../Components/Logo/Loading/Loading";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Invoices = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: invoices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myInvoices", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-invoices/${user.email}`);
      return res.data;
    },
  });

  if (authLoading || isLoading) return <Loading />;
  if (isError || !user)
    return (
      <h1 className="text-center text-rose-500 font-bold text-3xl pt-20 italic">
        Failed to load invoices or user data.
      </h1>
    );

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
    <div className="p-4 sm:p-8 bg-base-200 min-h-screen text-base-content">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-black flex items-center justify-center text-base-content italic tracking-tight">
          <FaFileInvoiceDollar className="mr-3 text-[#6366f1]" /> Payment
          Invoices
        </h1>
        <p className="text-sm font-medium opacity-60 mt-2 uppercase tracking-widest">
          Digital receipts for your successful transactions
        </p>
        <div className="h-1 w-20 bg-[#6366f1] mx-auto mt-4 rounded-full"></div>
      </header>

      {invoices.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-[2rem] shadow-xl mx-auto max-w-2xl border border-base-300">
          <FaCreditCard className="mx-auto text-6xl text-[#6366f1] opacity-20 mb-4" />
          <h3 className="text-2xl font-bold opacity-80">
            No Payments Recorded Yet
          </h3>
          <p className="opacity-60 mt-2 font-medium">
            Successful payments will appear here as invoices.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-[1.5rem] border border-base-300 bg-base-100 overflow-hidden">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="bg-base-200/50 border-b border-base-300">
                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">
                  Book Title
                </th>
                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">
                  Amount
                </th>
                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">
                  Date & Time
                </th>
                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">
                  Payment ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {invoices.map((invoice) => (
                <tr
                  key={invoice._id}
                  className="hover:bg-indigo-50/40 transition-colors"
                >
                  <td className="font-extrabold py-4">
                    <FaBook className="inline mr-2 text-indigo-400" />
                    {invoice.bookTitle}
                  </td>

                  <td className="text-lg font-black text-emerald-600">
                    <FaDollarSign className="inline mr-1 text-xs" />
                    {parseFloat(invoice.price).toFixed(2)}
                  </td>

                  <td className="text-sm font-medium opacity-80">
                    <FaCalendarAlt className="inline mr-2 text-indigo-400/70" />
                    {formatDate(invoice.orderDate)}
                  </td>

                  <td>
                    <div
                      className="flex items-center text-[10px] font-mono font-bold bg-base-200 px-3 py-1.5 rounded-lg text-indigo-600/70 max-w-[200px] truncate border border-base-300 shadow-sm"
                      title={invoice.stripeSessionId}
                    >
                      <FaCreditCard className="mr-2 shrink-0" />
                      {invoice.stripeSessionId
                        ? invoice.stripeSessionId
                        : "N/A"}
                    </div>
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
