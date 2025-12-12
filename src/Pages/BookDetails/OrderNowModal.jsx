import React, { useState } from "react";
import {
  FaShoppingCart,
  FaRegWindowClose,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaSpinner
} from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const OrderNowModal = ({
  isOpen,
  onClose,
  currentUser,
  bookPrice,
  bookId,
  bookTitle,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderForm, setOrderForm] = useState({
    phone: "",
    address: "",
  });

  if (!isOpen) return null;

  const handleOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!bookId || !bookTitle) {
      toast.error("Asset synchronization error: Book data missing.");
      setIsSubmitting(false);
      return;
    }

    const orderData = {
      bookId,
      bookTitle,
      name: currentUser.name,
      email: currentUser.email,
      phone: orderForm.phone,
      address: orderForm.address,
      price: bookPrice,
      quantity: 1,
      status: "pending",
      paymentStatus: "unpaid",
      orderedAt: new Date(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        orderData
      );

      if (response.data.insertedId) {
        toast.success("Order Logged. Status: PENDING / UNPAID");
        setOrderForm({ phone: "", address: "" });
        onClose();
      }
    } catch (error) {
      console.error("Order Transmission Error:", error);
      toast.error("System timeout. Please verify connectivity.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div 
        className="absolute inset-0 bg-base-300/60 backdrop-blur-sm"
        onClick={!isSubmitting ? onClose : null}
      />

      {/* Terminal Content */}
      <div className="relative bg-base-100 border border-base-300 rounded-[2rem] shadow-2xl w-full max-w-lg overflow-hidden animate-terminalPop">
        
        {/* Header Accent Line */}
        <div className="h-1.5 w-full bg-[#ff0077]" />

        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-black text-base-content flex items-center gap-3">
                <FaShoppingCart className="text-[#ff0077]" /> 
                Secure Checkout
              </h3>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-1">
                Transaction ID: TXN-{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="btn btn-circle btn-ghost btn-sm opacity-40 hover:opacity-100"
            >
              <FaRegWindowClose className="text-xl" />
            </button>
          </div>

          {/* Book Summary Card */}
          <div className="mb-8 p-6 bg-base-200 rounded-2xl border border-base-300 flex justify-between items-center">
            <div className="max-w-[70%]">
              <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter mb-1">Selected Asset</p>
              <p className="font-bold text-base-content truncate">{bookTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black opacity-40 uppercase tracking-tighter mb-1">Total Due</p>
              <p className="text-2xl font-black text-[#ff0077]">${bookPrice}</p>
            </div>
          </div>

          <form onSubmit={handleOrder} className="space-y-5">
            {/* Read-Only User Context */}
            <div className="grid grid-cols-2 gap-4">
              <div className="opacity-60 pointer-events-none">
                <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Purchaser</label>
                <input type="text" value={currentUser.name} className="w-full bg-base-200 border-none rounded-xl text-xs py-3 px-4 font-bold" readOnly />
              </div>
              <div className="opacity-60 pointer-events-none">
                <label className="text-[10px] font-black uppercase tracking-widest mb-2 block">Auth Email</label>
                <input type="text" value={currentUser.email} className="w-full bg-base-200 border-none rounded-xl text-xs py-3 px-4 font-bold" readOnly />
              </div>
            </div>

            {/* Editable Information */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaPhoneAlt className="text-[#ff0077] text-[8px]" /> Contact Signal (Phone)
              </label>
              <input
                type="tel"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                required
                placeholder="+8801XXXXXXXXX"
                className="input input-bordered w-full rounded-xl bg-base-100 focus:border-[#ff0077] transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <FaMapMarkedAlt className="text-[#ff0077] text-[8px]" /> Deployment Address
              </label>
              <textarea
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                required
                rows="3"
                placeholder="Coordinates / Street Address"
                className="textarea textarea-bordered w-full rounded-xl bg-base-100 focus:border-[#ff0077] transition-all resize-none"
              ></textarea>
            </div>

            {/* Submission Logic */}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn border-none text-white rounded-2xl h-14 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-pink-500/20 group"
              style={{ backgroundColor: "#ff0077" }}
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <>
                  Confirm Transaction
                  <FaCheckCircle className="ml-2 group-hover:scale-125 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes terminalPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-terminalPop { animation: terminalPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
};

export default OrderNowModal;