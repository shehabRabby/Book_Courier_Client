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
            <h1 className="text-center text-error text-3xl pt-20">
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
                <h1 className="text-4xl font-extrabold flex items-center justify-center">
                    <FaFileInvoiceDollar className="mr-3 text-[#ff0077]" /> Payment Invoices
                </h1>
                <p className="text-lg opacity-70 mt-2">
                    A record of all your successful payment transactions.
                </p>
            </header>

            {invoices.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-xl shadow-lg mx-auto max-w-2xl border border-base-300">
                    <FaCreditCard className="mx-auto text-6xl opacity-20 mb-4" />
                    <h3 className="text-2xl font-semibold opacity-80">
                        No Payments Recorded Yet
                    </h3>
                    <p className="opacity-60 mt-2">
                        Successful payments will appear here as invoices.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-xl border border-base-300 bg-base-100">
                    <table className="table w-full">
                        <thead className="bg-base-300 text-base-content">
                            <tr>
                                <th className="bg-transparent uppercase text-xs">Book Title</th>
                                <th className="bg-transparent uppercase text-xs">Amount</th>
                                <th className="bg-transparent uppercase text-xs">Date & Time</th>
                                <th className="bg-transparent uppercase text-xs">Payment ID</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300">
                            {invoices.map((invoice) => (
                                <tr
                                    key={invoice._id}
                                    className="hover:bg-base-200/60 transition-colors"
                                >
                                    <td className="font-semibold">
                                        <FaBook className="inline mr-2 text-[#ff0077]/70" />
                                        {invoice.bookTitle}
                                    </td>

                                    <td className="text-lg font-bold text-success">
                                        <FaDollarSign className="inline mr-1" />
                                        {parseFloat(invoice.price).toFixed(2)}
                                    </td>

                                    <td className="text-sm opacity-80">
                                        <FaCalendarAlt className="inline mr-2 opacity-50" />
                                        {formatDate(invoice.orderDate)}
                                    </td>

                                    <td>
                                        <div 
                                            className="flex items-center text-xs font-mono opacity-60 max-w-[200px] truncate"
                                            title={invoice.stripeSessionId}
                                        >
                                            <FaCreditCard className="mr-2 shrink-0" />
                                            {invoice.stripeSessionId 
                                                ? invoice.stripeSessionId 
                                                : 'N/A'
                                            }
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