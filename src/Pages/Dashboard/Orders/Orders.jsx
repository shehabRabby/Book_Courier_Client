import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth'; 
import { FaTimesCircle, FaTruckLoading, FaBoxOpen, FaClipboardList } from 'react-icons/fa';

// Status transition logic
const statusTransitions = {
    pending: 'shipped',
    processing: 'shipped', 
    shipped: 'delivered',
    delivered: 'delivered', 
    cancelled: 'cancelled' 
};

// 🎨 CHANGE: Enhanced Badge logic using DaisyUI semantic colors
const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'delivered': return 'badge-info badge-outline';
        case 'shipped': return 'badge-primary badge-outline';
        case 'pending':
        case 'processing': return 'badge-warning badge-outline';
        case 'cancelled': return 'badge-error badge-outline';
        default: return 'badge-neutral badge-outline';
    }
};

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const accentColor = "#ff0077"; // Consistent brand color
    
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    const fetchOrders = async () => {
        if (!user?.email) return;
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/librarian-orders/${user.email}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: 'Error',
                text: 'Failed to fetch orders.',
                icon: 'error',
                customClass: { popup: 'bg-base-100 text-base-content' } // Theme-aware Swal
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchOrders(); }, [user]);

    const handleStatusChange = async (orderId, currentStatus) => {
        const nextStatus = statusTransitions[currentStatus];
        if (!nextStatus || nextStatus === currentStatus) return;

        Swal.fire({
            title: `Update to ${nextStatus.toUpperCase()}?`,
            text: `Transition from ${currentStatus} to ${nextStatus}.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: accentColor,
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, Update!',
            background: 'var(--fallback-b1,oklch(var(--b1)))', // DaisyUI variable for bg
            color: 'var(--fallback-bc,oklch(var(--bc)))'      // DaisyUI variable for text
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`${API_BASE_URL}/orders/update-status/${orderId}`, {
                        newStatus: nextStatus
                    });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Updated!', `Status is now ${nextStatus}.`, 'success');
                        fetchOrders();
                    }
                } catch (error) {
                    Swal.fire('Error', 'Failed to update.', 'error');
                }
            }
        });
    };

    const handleCancelOrder = async (orderId, bookTitle) => {
        Swal.fire({
            title: `Cancel order for ${bookTitle}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Confirm Cancellation'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`${API_BASE_URL}/orders/cancel/${orderId}`);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Cancelled', 'Order has been halted.', 'success');
                        fetchOrders();
                    }
                } catch (error) {
                    Swal.fire('Error', 'Cancellation failed.', 'error');
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-ring loading-lg" style={{ color: accentColor }}></span>
            </div>
        );
    }

    return (
        // 🎨 CHANGE: Theme-aware container
        <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content">
            <header className="mb-10 text-center">
                <h2 className="text-4xl font-extrabold flex items-center justify-center gap-3">
                    <FaClipboardList style={{ color: accentColor }} />
                    Order Fulfillment
                </h2>
                <p className="opacity-60 mt-2">Manage incoming orders and track shipment statuses.</p>
            </header>
            
            <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-300 bg-base-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-base-300">
                        <tr className="text-base-content/70">
                            <th>Order Details</th>
                            <th>Customer</th>
                            <th>Payments</th>
                            <th className="text-center">Fulfillment</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {orders.map((order) => {
                            const isPaid = order.payment_status === 'paid';
                            const isFinal = order.status === 'delivered' || order.status === 'cancelled';
                            const nextStatus = statusTransitions[order.status];
                            const canTransition = nextStatus && nextStatus !== order.status;
                            
                            return (
                                <tr key={order._id} className="hover:bg-base-200/50 transition-colors">
                                    <td>
                                        <div className="font-bold">{order.bookTitle}</div>
                                        <div className="text-xs opacity-50">ID: {order._id.slice(-8)}</div>
                                    </td>
                                    <td className="text-sm">{order.email}</td>
                                    <td>
                                        <span className={`badge font-bold ${isPaid ? 'badge-success' : 'badge-warning'} badge-sm`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td className="text-center">
                                        <div className={`badge ${getStatusBadgeClass(order.status)} font-bold p-3`}>
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Process/Ship Button */}
                                            <button
                                                onClick={() => handleStatusChange(order._id, order.status)}
                                                className={`btn btn-sm text-white border-none ${isFinal ? 'btn-ghost' : ''}`}
                                                style={!isFinal && isPaid && canTransition ? { backgroundColor: accentColor } : {}}
                                                disabled={!isPaid || isFinal || !canTransition}
                                            >
                                                {isFinal ? <FaBoxOpen className="text-lg opacity-30" /> : 
                                                 !isPaid ? 'Unpaid' : <FaTruckLoading className="text-lg" />}
                                                <span className="hidden lg:inline ml-2">
                                                    {isFinal ? 'Done' : canTransition ? `Next: ${nextStatus}` : 'N/A'}
                                                </span>
                                            </button>

                                            {/* Cancel Button */}
                                            <button
                                                onClick={() => handleCancelOrder(order._id, order.bookTitle)}
                                                className="btn btn-sm btn-circle btn-ghost text-error"
                                                disabled={isFinal}
                                                title="Cancel Order"
                                            >
                                                <FaTimesCircle className="text-xl" />
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
                <div className="text-center py-20 opacity-50 italic">
                    No active orders found for your inventory.
                </div>
            )}
        </div>
    );
};

export default Orders;