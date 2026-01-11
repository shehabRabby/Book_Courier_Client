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
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="p-4 sm:p-8 bg-base-200 min-h-screen text-base-content">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-black flex items-center justify-center text-base-content italic tracking-tight">
                    <FaShoppingCart className="mr-3 text-[#6366f1]" /> My Orders
                </h1>
                <p className="text-sm font-medium opacity-60 mt-2 uppercase tracking-widest">
                    Manage and track your book purchases
                </p>
                <div className="h-1 w-20 bg-[#6366f1] mx-auto mt-4 rounded-full"></div>
            </header>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-[2rem] shadow-xl mx-auto max-w-2xl border border-base-300">
                    <FaBookOpen className="mx-auto text-6xl text-[#6366f1] opacity-20 mb-4" />
                    <h3 className="text-2xl font-bold opacity-80">No Orders Placed Yet</h3>
                    <p className="opacity-60 mt-2 font-medium">Start exploring our library to place your first order!</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-[1.5rem] border border-base-300 bg-base-100">
                    <table className="table w-full border-collapse">
                        <thead>
                            <tr className="bg-base-200/50 border-b border-base-300">
                                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">Book Details</th>
                                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">Order Date</th>
                                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">Status</th>
                                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider">Payment</th>
                                <th className="py-5 text-[#6366f1] font-bold uppercase text-xs tracking-wider text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300">
                            {orders.map(order => (
                                <tr key={order._id} className="hover:bg-indigo-50/30 transition-colors">
                                    <td className="py-4">
                                        <div className="font-extrabold text-base-content">{order.bookTitle}</div>
                                        <div className="text-xs font-bold text-indigo-600">Amt: ${order.price}</div>
                                    </td>
                                    
                                    <td className="text-sm font-medium opacity-80">
                                        <FaCalendarAlt className="inline mr-2 text-indigo-400" />
                                        {formatDate(order.orderDate)}
                                    </td>

                                    <td>
                                        <div className={`badge badge-outline border px-3 py-3 font-bold text-[10px] uppercase tracking-tighter ${getStatusColor(order.status)}`}>
                                            <FaTruck className="mr-1" size={10} /> {order.status}
                                        </div>
                                    </td>
                                    
                                    <td>
                                        <div className={`badge border px-3 py-3 font-bold text-[10px] uppercase ${order.payment_status === 'paid' ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-rose-500 text-white border-rose-600'}`}>
                                            <FaMoneyBillWave size={10} className="mr-1"/> {order.payment_status}
                                        </div>
                                    </td>

                                    <td className="text-center">
                                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                                            {order.status === 'pending' && order.payment_status === 'unpaid' && (
                                                <button 
                                                    onClick={() => handlePayNow(order)} 
                                                    className="btn btn-xs sm:btn-sm bg-emerald-500 hover:bg-emerald-600 text-white border-none shadow-md shadow-emerald-100"
                                                    disabled={payMutation.isLoading || cancelMutation.isLoading}
                                                >
                                                    <FaMoneyBillWave /> 
                                                    {payMutation.isLoading && payMutation.variables?.orderId === order._id ? '...' : 'Pay Now'}
                                                </button>
                                            )}

                                            {order.status === 'pending' && (
                                                <button 
                                                    onClick={() => handleCancelOrder(order._id)}
                                                    className="btn btn-xs sm:btn-sm bg-rose-500 hover:bg-rose-600 text-white border-none shadow-md shadow-rose-100"
                                                    disabled={cancelMutation.isLoading || payMutation.isLoading}
                                                >
                                                    <FaTimesCircle /> Cancel
                                                </button>
                                            )}

                                            {order.status !== 'pending' && (
                                                <span className="text-[10px] uppercase font-bold opacity-30 italic">Completed</span>
                                            )}
                                            
                                            {order.status === 'pending' && order.payment_status === 'paid' && (
                                                <div className="flex items-center text-emerald-600 font-bold text-xs">
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