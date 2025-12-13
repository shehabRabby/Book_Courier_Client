import React, { useState } from "react";
import {
  FaShoppingCart, FaBook, FaUserEdit, FaStar,
  FaRulerVertical, FaGlobe, FaCheckCircle, FaInfoCircle,
  FaTag, FaCalendarAlt, FaHeart, FaChevronLeft
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import useAuth from "../../Hooks/useAuth";
// 🚀 NEW IMPORT: Secure Axios Hook
import useAxiosSecure from "../../Hooks/useAxiosSecure"; 
import OrderNowModal from "./OrderNowModal";
import ReviewSection from "./ReviewSection";
import Loading from "../../Components/Logo/Loading/Loading";

const ACCENT_COLOR = "#ff0077";

// --- Metadata Fact Card (Glass Effect) ---
const DetailFactCard = ({ icon: Icon, title, value, colorClass, delay }) => (
  <div
    className={`group p-4 bg-base-100 border border-base-300 rounded-2xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-fadeInUp`}
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center bg-base-200 transition-colors group-hover:bg-[#ff0077] group-hover:text-white ${colorClass}`}>
      <Icon className="text-xl" />
    </div>
    <p className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1">{title}</p>
    <p className="font-bold text-lg text-base-content truncate" title={value}>
      {value}
    </p>
  </div>
);

const BookDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
    
    // 1. Instantiate the secure Axios instance
    const axiosSecure = useAxiosSecure(); 

  const { data: book = {}, isLoading, isError, refetch } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
        // ✅ FETCH: This GET request is public, so standard axios is appropriate.
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return data;
    },
  });

  const {
    _id, authorName, bookTitle, category, description, isbn,
    language, page, photo, price, publicationDate, rating, status
  } = book;

  const { mutateAsync: handleAddToWishlist } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Authentication Required");
      const wishlistData = { bookId: _id, bookTitle, authorName, photo, price, category, rating, userEmail: user?.email };
        
        // 2. FIX: Use axiosSecure for the POST request requiring authentication (JWT)
        return await axiosSecure.post(`/wishlist`, wishlistData);
    },
    onSuccess: () => toast.success("Added to your wishlist!"),
    onError: (err) => {
        // Log the full error to console for debugging
        console.error("Wishlist addition failed:", err);
        // Display a more helpful user error if status is 401/403 (handled by useAxiosSecure interceptor, but good practice)
        if (err.response?.status === 401 || err.response?.status === 403) {
             toast.error("Please log in again to add items to your wishlist.");
        } else {
             toast.error(err.message || "Failed to update wishlist");
        }
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <div className="py-20 text-center text-error font-bold">Error: Resource not found.</div>;

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-8">
      
      {/* --- Navigation & Header --- */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="btn btn-ghost gap-2 opacity-60 hover:opacity-100">
          <FaChevronLeft /> Back to Library
        </button>
        <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-success animate-ping"></span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50">System Active</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* --- Left Column: Visuals --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-10">
            <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-4 border-base-100">
              <img src={photo} alt={bookTitle} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="mt-8 bg-base-100 p-8 rounded-[2rem] border border-base-300 shadow-xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-tighter opacity-40">Rental / Purchase</p>
                  <h3 className="text-4xl font-black text-base-content">${price}</h3>
                </div>
                <div className="badge badge-outline border-base-300 opacity-50">{status}</div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-lg border-none text-white hover:scale-[1.02] shadow-xl shadow-pink-500/20"
                  style={{ backgroundColor: ACCENT_COLOR }}
                >
                  <FaShoppingCart className="mr-2" /> Order Asset
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="btn btn-lg btn-outline hover:bg-transparent"
                  style={{ color: ACCENT_COLOR, borderColor: `${ACCENT_COLOR}33` }}
                >
                  <FaHeart className="mr-2" /> Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Intelligence & Data --- */}
        <div className="lg:col-span-8 space-y-10">
          <section className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1 w-12 bg-[#ff0077] rounded-full"></span>
              <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">{category}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-base-content leading-tight mb-4">{bookTitle}</h1>
            <div className="flex items-center gap-4 text-xl font-bold opacity-70">
              <FaUserEdit className="text-[#ff0077]" />
              <span>{authorName}</span>
            </div>
          </section>

          {/* Metadata Pulse Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <DetailFactCard icon={FaStar} title="System Rating" value={`${rating} / 5`} colorClass="text-yellow-500" delay={100} />
            <DetailFactCard icon={FaCheckCircle} title="Registry Status" value={status} colorClass="text-success" delay={200} />
            <DetailFactCard icon={FaRulerVertical} title="Page Count" value={page} colorClass="text-info" delay={300} />
            <DetailFactCard icon={FaGlobe} title="Language" value={language} colorClass="text-secondary" delay={400} />
          </div>

          {/* Description Section */}
          <section className="bg-base-100 p-8 rounded-3xl border border-base-300">
            <h3 className="flex items-center text-xl font-black mb-6 gap-3">
              <FaInfoCircle className="opacity-20" /> Narrative Overview
            </h3>
            <p className="text-lg opacity-70 leading-relaxed font-medium">
              {description}
            </p>
          </section>

          {/* Technical Specs */}
          
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-6 bg-base-300 rounded-2xl gap-4">
              <FaCalendarAlt className="text-2xl opacity-30" />
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Release Date</p>
                <p className="font-bold">{publicationDate}</p>
              </div>
            </div>
            <div className="flex items-center p-6 bg-base-300 rounded-2xl gap-4">
              <FaBook className="text-2xl opacity-30" />
              <div>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Serial Number (ISBN)</p>
                <p className="font-bold">{isbn}</p>
              </div>
            </div>
          </section>

          {/* Community Feedback */}
          <div className="pt-10 border-t border-base-300">
             <ReviewSection 
                bookId={_id} 
                userEmail={user?.email} 
                userName={user?.displayName} 
                refetchBook={refetch} 
             />
          </div>
        </div>
      </main>

      <OrderNowModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        currentUser={{ name: user?.displayName, email: user?.email }} 
        bookPrice={price} 
        bookId={_id} 
        bookTitle={bookTitle} 
      />

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default BookDetails;