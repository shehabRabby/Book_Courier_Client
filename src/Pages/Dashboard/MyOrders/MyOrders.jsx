import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaShoppingCart, FaCalendarAlt, FaTimesCircle, FaMoneyBillWave, FaCheckCircle, FaTruck, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Logo/Loading/Loading';

const accentColor = '#ff0077';

const MyOrders = () => {
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();

    // 1. Fetch Orders (Existing Logic)
    const { 
        data: orders = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/my-orders/${user.email}`);
            return res.data;
        },
    });

    // 2. Cancel Order Mutation (Existing Logic)
    const cancelMutation = useMutation({
        mutationFn: async (orderId) => {
            const res = await axios.patch(`${import.meta.env.VITE_API_URL}/orders/cancel/${orderId}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Order cancelled successfully!");
            queryClient.invalidateQueries(['myOrders', user?.email]); 
        },
        onError: (error) => {
            toast.error("Failed to cancel order.");
            console.error("Cancel error:", error);
        }
    });

    // ⭐ 3. Payment Initiation Mutation (NEWLY ADDED)
    const payMutation = useMutation({
        mutationFn: async (orderData) => {
            // Call the backend endpoint to create the Stripe session
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-checkout-session`, orderData);
            return res.data;
        },
        onSuccess: (data) => {
            // CRITICAL: Redirect user to the Stripe Checkout URL received from the backend
            if (data.url) {
                window.location.href = data.url; 
            } else {
                toast.error("Stripe Checkout URL missing from server response.");
            }
        },
        onError: (error) => {
            // Check network tab and backend console for specific errors
            toast.error("Failed to initiate payment. Check console for details.");
            console.error("Payment initiation error:", error);
        }
    });

    if (loading || isLoading) return <Loading></Loading>;
    if (isError || !user) return <h1 className="text-center text-red-600 text-3xl pt-20">Failed to load orders or user data.</h1>;

    const handleCancelOrder = (id) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            cancelMutation.mutate(id);
        }
    };

    // ⭐ NEW: Function to handle 'Pay Now' click
    const handlePayNow = (order) => {
        if (!order || !order._id || !order.price) {
            toast.error("Invalid order data for payment.");
            return;
        }

        const paymentData = {
            orderId: order._id, // The essential MongoDB Order ID
            bookTitle: order.bookTitle,
            price: parseFloat(order.price), // Ensure price is a number
            email: order.email,
            quantity: 1, 
        };
        
        payMutation.mutate(paymentData);
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    // Helper function to get color for status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-700 bg-yellow-100 border-yellow-500';
            case 'delivered':
                return 'text-green-700 bg-green-100 border-green-500';
            case 'processing': // Added 'processing' for paid status
                return 'text-blue-700 bg-blue-100 border-blue-500';
            case 'cancelled':
                return 'text-red-700 bg-red-100 border-red-500';
            default:
                return 'text-gray-700 bg-gray-100 border-gray-500';
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                    <FaShoppingCart className="mr-3 text-[#ff0077]" /> My Orders
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    View the status of all your book orders.
                </p>
            </header>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg mx-auto max-w-2xl">
                    <FaBookOpen className="mx-auto text-6xl text-gray-400 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-700">No Orders Placed Yet</h3>
                    <p className="text-gray-500 mt-2">Start exploring our books to place your first order!</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-indigo-50/50 transition duration-150">
                                    
                                    {/* Book Title */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">{order.bookTitle}</div>
                                        <div className="text-xs text-gray-500">Price: ${order.price}</div>
                                    </td>
                                    
                                    {/* Order Date */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <FaCalendarAlt className="inline mr-2 text-indigo-400" />
                                        {formatDate(order.orderDate)}
                                    </td>

                                    {/* Order Status */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)} capitalize`}>
                                            <FaTruck className="mr-1 mt-[2px]"/> {order.status}
                                        </span>
                                    </td>
                                    
                                    {/* Payment Status */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${order.payment_status === 'paid' ? 'text-green-700 bg-green-100 border-green-500' : 'text-red-700 bg-red-100 border-red-500'} capitalize`}>
                                            <FaMoneyBillWave className="mr-1 mt-[2px]"/> {order.payment_status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-y-2 md:space-y-0 md:space-x-3">
                                        
                                        {/* ⭐ Pay Now Button (UPDATED to call handlePayNow) */}
                                        {order.status === 'pending' && order.payment_status === 'unpaid' && (
                                            <button 
                                                onClick={() => handlePayNow(order)} 
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 transition duration-150"
                                                disabled={payMutation.isLoading || cancelMutation.isLoading}
                                            >
                                                <FaMoneyBillWave className="mr-2" /> 
                                                {payMutation.isLoading && payMutation.variables.orderId === order._id ? 'Redirecting...' : 'Pay Now'}
                                            </button>
                                        )}

                                        {/* Cancel Button (Show only if pending) */}
                                        {order.status === 'pending' && (
                                            <button 
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 transition duration-150"
                                                disabled={cancelMutation.isLoading || payMutation.isLoading}
                                            >
                                                <FaTimesCircle className="mr-2" /> Cancel
                                            </button>
                                        )}

                                        {/* Status Message when no actions are available */}
                                        {order.status !== 'pending' && (
                                            <span className="text-gray-500 italic">No actions available</span>
                                        )}
                                        {order.status === 'pending' && order.payment_status === 'paid' && (
                                            <span className="text-green-600 font-semibold flex items-center justify-center">
                                                 <FaCheckCircle className='mr-1' /> Paid - Processing
                                            </span>
                                        )}
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

export default MyOrders;