import React, { useState } from 'react';
import {
    FaShoppingCart,
    FaRegWindowClose,
    FaCheckCircle,
    FaMapMarkedAlt,
    FaPhoneAlt,
} from "react-icons/fa";

const OrderNowModal = ({ isOpen, onClose, currentUser, bookPrice }) => {
    // Local form state for phone and address
    const [orderForm, setOrderForm] = useState({
        phone: "",
        address: "",
    });

    if (!isOpen) {
        return null;
    }

    const handleOrder = (e) => {
        e.preventDefault();
        
        const orderData = { 
            name: currentUser.name, 
            email: currentUser.email, 
            phone: orderForm.phone, 
            address: orderForm.address,
            price: bookPrice,
            status: "pending", // required by prompt
            payment_status: "unpaid" // required by prompt
        };
        
        console.log("Order placed:", orderData);
        alert("Order Placed Successfully! Status: pending, Payment: unpaid.");
        
        // Reset form and close modal
        setOrderForm({ phone: "", address: "" });
        onClose();
    };

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
            
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fadeInDown">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                        <FaShoppingCart className="mr-2 text-[#ff0077]" /> Place Your Order
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition"
                    >
                        <FaRegWindowClose className="text-2xl" />
                    </button>
                </div>
                
                {/* Modal Form */}
                <form onSubmit={handleOrder} className="space-y-4">
                    
                    {/* Name (Readonly) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            value={currentUser.name}
                            readOnly
                            className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Email (Readonly) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={currentUser.email}
                            readOnly
                            className="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-lg px-3 py-2 text-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                            <FaPhoneAlt className="mr-1 text-sm text-indigo-500" /> Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            value={orderForm.phone}
                            onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-[#ff0077] focus:border-[#ff0077]"
                            placeholder="e.g., +8801XXXXXXXXX"
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 flex items-center"
                        >
                            <FaMapMarkedAlt className="mr-1 text-sm text-indigo-500" /> Delivery Address
                        </label>
                        <textarea
                            id="address"
                            value={orderForm.address}
                            onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                            required
                            rows="3"
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm px-3 py-2 focus:ring-[#ff0077] focus:border-[#ff0077]"
                            placeholder="Street, City, Post Code"
                        ></textarea>
                    </div>

                    {/* Place Order Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-md text-lg font-semibold text-white transition-all duration-300 bg-indigo-600 hover:bg-indigo-700"
                    >
                        <FaCheckCircle className="mr-2" /> Place Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderNowModal;