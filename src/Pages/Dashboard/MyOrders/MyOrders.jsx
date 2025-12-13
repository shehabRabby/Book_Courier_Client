import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaShoppingCart, FaCalendarAlt, FaTimesCircle, FaMoneyBillWave, FaCheckCircle, FaTruck, FaBookOpen } from 'react-icons/fa';
import toast from 'react-hot-toast'; 
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Logo/Loading/Loading';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyOrders = () => {
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure(); 

    const { 
        data: orders = [], 
        isLoading, 
        isError 
    } = useQuery({
        queryKey: ['myOrders', user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-orders/${user.email}`);
            return res.data;
        },
    });

    const cancelMutation = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosSecure.patch(`/orders/cancel/${orderId}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Order cancelled successfully!");
            queryClient.invalidateQueries({ queryKey: ['myOrders', user?.email] }); 
        },
    });

    const payMutation = useMutation({
        mutationFn: async (orderData) => {
            const res = await axiosSecure.post(`/create-checkout-session`, orderData);
            return res.data;
        },
        onSuccess: (data) => {
            if (data.url) window.location.href = data.url; 
        },
    });

    
    if (loading || isLoading) return <Loading />;
    if (isError || !user) return <h1 className="text-center text-red-600 text-3xl pt-20">Failed to load orders.</h1>;

    const handleCancelOrder = (id) => {
        if (window.confirm("Are you sure you want to cancel this order?")) {
            cancelMutation.mutate(id);
        }
    };

    const handlePayNow = (order) => {
        const paymentData = {
            orderId: order._id,
            bookTitle: order.bookTitle,
            price: parseFloat(order.price),
            email: order.email,
            quantity: 1, 
        };
        payMutation.mutate(paymentData);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'badge-warning gap-2';
            case 'delivered': return 'badge-success gap-2 text-white';
            case 'processing': return 'badge-info gap-2 text-white';
            case 'cancelled': return 'badge-error gap-2 text-white';
            default: return 'badge-ghost gap-2';
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-base-200 min-h-screen text-base-content">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold flex items-center justify-center">
                    <FaShoppingCart className="mr-3 text-[#ff0077]" /> My Orders
                </h1>
                <p className="text-lg opacity-70 mt-2">
                    View the status of all your book orders.
                </p>
            </header>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-xl shadow-lg mx-auto max-w-2xl border border-base-300">
                    <FaBookOpen className="mx-auto text-6xl opacity-20 mb-4" />
                    <h3 className="text-2xl font-semibold opacity-80">No Orders Placed Yet</h3>
                    <p className="opacity-60 mt-2">Start exploring our books to place your first order!</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-xl border border-base-300 bg-base-100">
                    <table className="table w-full">
                        <thead className="bg-base-300 text-base-content">
                            <tr>
                                <th className="bg-transparent">Book Title</th>
                                <th className="bg-transparent">Order Date</th>
                                <th className="bg-transparent">Status</th>
                                <th className="bg-transparent">Payment</th>
                                <th className="bg-transparent text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-base-200/50 transition-colors">
                                    
                                    <td>
                                        <div className="font-bold text-base-content">{order.bookTitle}</div>
                                        <div className="text-xs opacity-60">Price: ${order.price}</div>
                                    </td>
                                    
                                    <td className="text-sm opacity-80">
                                        <FaCalendarAlt className="inline mr-2 text-[#ff0077]/70" />
                                        {formatDate(order.orderDate)}
                                    </td>

                                    <td>
                                        <div className={`badge ${getStatusColor(order.status)} py-3 px-4`}>
                                            <FaTruck size={12} /> {order.status}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div className={`badge py-3 px-4 ${order.payment_status === 'paid' ? 'badge-success text-white' : 'badge-error text-white'}`}>
                                            <FaMoneyBillWave size={12} className="mr-1"/> {order.payment_status}
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                                            {order.status === 'pending' && order.payment_status === 'unpaid' && (
                                                <button 
                                                    onClick={() => handlePayNow(order)} 
                                                    className="btn btn-sm btn-success text-white shadow-md"
                                                    disabled={payMutation.isLoading || cancelMutation.isLoading}
                                                >
                                                    <FaMoneyBillWave /> 
                                                    {payMutation.isLoading && payMutation.variables?.orderId === order._id ? '...' : 'Pay Now'}
                                                </button>
                                            )}

                                            {order.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="btn btn-sm btn-error text-white shadow-md"
                                                    disabled={cancelMutation.isLoading || payMutation.isLoading}
                                                >
                                                    <FaTimesCircle /> Cancel
                                                </button>
                                            )}

                                            {order.status !== 'pending' && (
                                                <span className="text-xs opacity-50 italic">Completed</span>
                                            )}
                                            
                                            {order.status === 'pending' && order.payment_status === 'paid' && (
                                                <div className="flex items-center text-success font-bold text-xs">
                                                     <FaCheckCircle className='mr-1' /> Processing
                                                </div>
                                            )}
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

export default MyOrders;