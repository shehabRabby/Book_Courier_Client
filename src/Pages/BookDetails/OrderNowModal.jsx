import { useState } from "react";
import {
  FaShoppingCart,
  FaRegWindowClose,
  FaCheckCircle,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaSpinner,
} from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const OrderNowModal = ({
  isOpen,
  onClose,
  currentUser,
  bookPrice,
  bookId,
  bookTitle,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const axiosSecure = useAxiosSecure();
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
      const response = await axiosSecure.post(`/orders`, orderData);

      if (response.data.insertedId) {
        toast.success("Order Logged. Status: PENDING");
        setOrderForm({ phone: "", address: "" });
        onClose();
      } else {
        toast.error("Order failed to log.");
      }
    } catch (error) {
      console.error("Order Transmission Error:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error("Authentication Error: Please log in again.");
      } else {
        toast.error("System timeout or server error.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Glassmorphism Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-900/40 backdrop-blur-md"
        onClick={!isSubmitting ? onClose : null}
      />

      {/* Modal Content */}
      <div className="relative bg-base-100 rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-terminalPop border-none">
        {/* Header Accent Line (Primary Color) */}
        <div className="h-2 w-full bg-primary" />

        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-2xl font-black text-base-content flex items-center gap-3">
                <FaShoppingCart className="text-primary" />
                Secure Checkout
              </h3>
              <p className="text-[10px] font-bold text-base-content-muted uppercase tracking-[0.2em] mt-2 opacity-60">
                Transaction ID: TXN-
                {Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
            </div>
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="p-2 rounded-full hover:bg-base-200 text-base-content-muted transition-colors"
            >
              <FaRegWindowClose className="text-xl" />
            </button>
          </div>

          {/* Asset Summary Card */}
          <div className="mb-8 p-6 bg-base-200 rounded-3xl flex justify-between items-center">
            <div className="max-w-[65%]">
              <p className="text-[10px] font-black text-base-content-muted uppercase tracking-widest mb-1">
                Selected Asset
              </p>
              <p className="font-bold text-base-content truncate text-lg">
                {bookTitle}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-base-content-muted uppercase tracking-widest mb-1">
                Total Due
              </p>
              <p className="text-2xl font-black text-primary">${bookPrice}</p>
            </div>
          </div>

          <form onSubmit={handleOrder} className="space-y-6">
            {/* Read-Only Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 opacity-70">
                <label className="text-[10px] font-black text-base-content-muted uppercase tracking-widest ml-1">
                  Purchaser
                </label>
                <div className="bg-base-200 rounded-xl py-3 px-4 text-xs font-bold text-base-content">
                  {currentUser.name}
                </div>
              </div>
              <div className="space-y-2 opacity-70">
                <label className="text-[10px] font-black text-base-content-muted uppercase tracking-widest ml-1">
                  Auth Email
                </label>
                <div className="bg-base-200 rounded-xl py-3 px-4 text-xs font-bold text-base-content truncate">
                  {currentUser.email}
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-base-content-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaPhoneAlt className="text-primary text-[8px]" /> Contact Signal
              </label>
              <input
                type="tel"
                value={orderForm.phone}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, phone: e.target.value })
                }
                required
                placeholder="+8801XXXXXXXXX"
                className="w-full py-4 px-5 rounded-2xl bg-base-200 text-base-content focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium border-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-base-content-muted uppercase tracking-widest ml-1 flex items-center gap-2">
                <FaMapMarkedAlt className="text-primary text-[8px]" /> Deployment Address
              </label>
              <textarea
                value={orderForm.address}
                onChange={(e) =>
                  setOrderForm({ ...orderForm, address: e.target.value })
                }
                required
                rows="3"
                placeholder="Street Address / City"
                className="w-full py-4 px-5 rounded-2xl bg-base-200 text-base-content focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium border-none resize-none"
              ></textarea>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary border-none text-white rounded-2xl h-16 text-sm font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 group transition-all active:scale-95"
            >
              {isSubmitting ? (
                <FaSpinner className="animate-spin text-xl" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Confirm Transaction
                  <FaCheckCircle className="text-lg group-hover:scale-110 transition-transform" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes terminalPop {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-terminalPop { animation: terminalPop 0.4s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
      `}</style>
    </div>
  );
};

export default OrderNowModal;