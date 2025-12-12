import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth'; 
import { FaTimesCircle } from 'react-icons/fa';

// Array for status transition (Librarian can only move forward)
const statusTransitions = {
    pending: 'shipped',
    // FIX: Add 'processing' as a recognized status that transitions to 'shipped'
    processing: 'shipped', 
    shipped: 'delivered',
    delivered: 'delivered', 
    cancelled: 'cancelled' 
};

// Helper function to determine the color of the status badge
const getStatusBadgeClass = (status) => {
    switch (status) {
        case 'delivered':
            return 'badge-info';
        case 'shipped':
            return 'badge-primary';
        case 'pending':
        case 'processing': // Include processing here for warning color
            return 'badge-warning';
        case 'cancelled':
            return 'badge-error';
        default:
            return 'badge-neutral';
    }
};

const Orders = () => {
    // 1. Hooks and State
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // 2. Fetch Orders Function
    const fetchOrders = async () => {
        if (!user?.email) return;

        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/librarian-orders/${user.email}`);
            setOrders(res.data);
        } catch (error) {
            console.error("Error fetching librarian orders:", error);
            Swal.fire('Error', 'Failed to fetch orders for your books.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    // 3. Handle Status Change (The core fulfillment logic)
    const handleStatusChange = async (orderId, currentStatus) => {
        const nextStatus = statusTransitions[currentStatus];

        if (!nextStatus || nextStatus === currentStatus) {
            return;
        }

        Swal.fire({
            title: `Update to ${nextStatus.toUpperCase()}?`,
            text: `The fulfillment status will be changed from ${currentStatus} to ${nextStatus}.`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update Status!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axios.patch(`${API_BASE_URL}/orders/update-status/${orderId}`, {
                        newStatus: nextStatus
                    });

                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Updated!', `Order status updated to ${nextStatus}.`, 'success');
                        fetchOrders(); // Refresh list to show new status
                    }
                } catch (error) {
                    console.error("Error updating status:", error);
                    Swal.fire('Error', 'Failed to update order status.', 'error');
                }
            }
        });
    };

    // 4. Handle Order Cancellation
    const handleCancelOrder = async (orderId, bookTitle) => {
        Swal.fire({
            title: `Cancel Order for "${bookTitle}"?`,
            text: "The status will be permanently set to 'cancelled'.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Cancel Order!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Reuses the existing PATCH /orders/cancel/:id route
                    const res = await axios.patch(`${API_BASE_URL}/orders/cancel/${orderId}`);

                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Cancelled!', 'The order has been cancelled.', 'success');
                        fetchOrders(); // Refresh list
                    }
                } catch (error) {
                    console.error("Error canceling order:", error);
                    Swal.fire('Error', 'Failed to cancel the order.', 'error');
                }
            }
        });
    };


    if (loading) {
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-neutral mb-8">
                Orders for Your Books ({orders.length})
            </h2>
            
            <div className="overflow-x-auto shadow-xl rounded-box">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Book Title</th>
                            <th>Customer Email</th>
                            <th>Payment Status</th>
                            <th>Fulfillment Status</th>
                            <th>Update Status</th>
                            <th>Cancel Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const isPaid = order.payment_status === 'paid';
                            // Final status means no further status transitions are allowed
                            const isFinal = order.status === 'delivered' || order.status === 'cancelled';
                            
                            // Check if a transition exists for the current status
                            const nextStatus = statusTransitions[order.status];
                            const canTransition = nextStatus && nextStatus !== order.status;
                            
                            return (
                                <tr key={order._id}>
                                    <th>{index + 1}</th>
                                    <td>{order.bookTitle}</td>
                                    <td>{order.email}</td>
                                    <td>
                                        {/* Payment Status Badge */}
                                        <span className={`badge ${isPaid ? 'badge-success' : 'badge-warning'}`}>
                                            {order.payment_status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Fulfillment Status Badge - Using the helper function */}
                                        <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Status Update Button (smart transition logic) */}
                                        <button
                                            onClick={() => handleStatusChange(order._id, order.status)}
                                            className="btn btn-sm btn-primary text-white"
                                            // Disable if unpaid, delivered, or cancelled (or if there's no defined next step)
                                            disabled={!isPaid || isFinal || !canTransition}
                                        >
                                            {/* Dynamic button text based on current status */}
                                            {isFinal ? 'Finalized' : 
                                             !isPaid ? 'Awaiting Payment' :
                                             canTransition ? `Ship Now (${nextStatus})` : 'No Action'}
                                        </button>
                                    </td>
                                    <td>
                                        {/* Cancel Button */}
                                        <button
                                            onClick={() => handleCancelOrder(order._id, order.bookTitle)}
                                            className="btn btn-sm btn-error text-white"
                                            disabled={order.status === 'cancelled'}
                                        >
                                            <FaTimesCircle /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {orders.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No orders found for your books.</p>
            )}
        </div>
    );
};

export default Orders;