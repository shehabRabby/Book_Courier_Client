import React, { useState } from "react";
import {
  FaShoppingCart,
  FaBook,
  FaUserEdit,
  FaStar,
  FaRulerVertical,
  FaGlobe,
  FaCheckCircle,
  FaInfoCircle,
  FaCalendarAlt,
  FaHeart,
  FaChevronLeft,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import OrderNowModal from "./OrderNowModal";
import ReviewSection from "./ReviewSection";
import Loading from "../../Components/Logo/Loading/Loading";

const DetailFactCard = ({ icon: Icon, title, value, colorClass, delay }) => (
  <div
    className="group p-5 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div
      className={`w-10 h-10 rounded-lg mb-3 flex items-center justify-center bg-base-200 transition-colors group-hover:bg-primary group-hover:text-primary-content ${colorClass}`}
    >
      <Icon className="text-lg" />
    </div>
    <p className="text-[10px] uppercase font-bold tracking-widest text-base-content-muted mb-1">
      {title}
    </p>
    <p
      className="font-semibold text-base text-base-content truncate"
      title={value}
    >
      {value}
    </p>
  </div>
);

const BookDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    data: book = {},
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return data;
    },
  });

  const {
    _id,
    authorName,
    bookTitle,
    category,
    description,
    isbn,
    language,
    page,
    photo,
    price,
    publicationDate,
    rating,
    status,
  } = book;

  const { mutate: handleAddToWishlist } = useMutation({
    mutationFn: async () => {
      // Logic-ti mutation-er baire thaka bhalo, kintu ekhane thakle Error throw korte hobe
      if (!user) {
        throw new Error("Please login to add to wishlist");
      }

      const wishlistData = {
        bookId: _id,
        bookTitle,
        authorName,
        photo,
        price,
        category,
        rating,
        userEmail: user?.email,
      };

      // Axios-er pure response return korun
      const response = await axiosSecure.post(`/wishlist`, wishlistData);
      return response.data;
    },
    onSuccess: (data) => {
      // Backend theke response ashar por eita oboshoyi trigger hobe
      toast.success("Added to your wishlist!");
    },
    onError: (err) => {
      // User login na thakle ba server error hole eita trigger hobe
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to update wishlist";
      toast.error(errorMessage);
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="py-20 text-center text-error font-bold">
        Error: Resource not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-8 transition-colors duration-300">
      {/* Navigation Bar */}
      <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-sm font-medium text-base-content-muted hover:text-primary transition-colors"
        >
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Library
        </button>
        <div className="flex items-center gap-2 px-3 py-1 bg-base-100 rounded-full shadow-sm">
          <span className="h-2 w-2 rounded-full bg-success-main animate-pulse"></span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-base-content-muted">
            Live Status
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Sidebar: Image & Actions */}
        <div className="lg:col-span-4 space-y-8">
          <div className="sticky top-10">
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={photo}
                alt={bookTitle}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
            </div>

            <div className="mt-8 bg-base-100 p-8 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-base-content-muted mb-1">
                    Price
                  </p>
                  <h3 className="text-3xl font-black text-base-content">
                    ${price}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-md bg-base-200 text-[10px] font-bold text-base-content-muted uppercase tracking-tighter">
                  {status}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary btn-lg border-none text-primary-content shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <FaShoppingCart className="mr-2" /> Order Asset
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="btn btn-ghost btn-lg text-primary hover:bg-primary/5"
                >
                  <FaHeart className="mr-2" /> Save to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content: Details */}
        <div className="lg:col-span-8 space-y-12">
          <section className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-1 w-8 bg-primary rounded-full"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                {category}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-base-content leading-tight mb-6">
              {bookTitle}
            </h1>
            <div className="flex items-center gap-3 text-lg font-semibold text-base-content-muted">
              <div className="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center">
                <FaUserEdit className="text-primary" />
              </div>
              <span>{authorName}</span>
            </div>
          </section>

          {/* Fact Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            <DetailFactCard
              icon={FaStar}
              title="Rating"
              value={`${rating} / 5`}
              colorClass="text-yellow-500"
              delay={100}
            />
            <DetailFactCard
              icon={FaCheckCircle}
              title="Status"
              value={status}
              colorClass="text-success-main"
              delay={200}
            />
            <DetailFactCard
              icon={FaRulerVertical}
              title="Pages"
              value={page}
              colorClass="text-info"
              delay={300}
            />
            <DetailFactCard
              icon={FaGlobe}
              title="Language"
              value={language}
              colorClass="text-secondary"
              delay={400}
            />
          </div>

          {/* Narrative Section */}
          <section className="relative">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/10 rounded-full"></div>
            <h3 className="flex items-center text-xl font-bold mb-4 gap-3 text-base-content">
              Narrative Overview
            </h3>
            <p className="text-lg text-base-content-muted leading-relaxed">
              {description}
            </p>
          </section>

          {/* Secondary Info */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center p-5 bg-base-100 rounded-2xl shadow-sm gap-4">
              <FaCalendarAlt className="text-xl text-primary/40" />
              <div>
                <p className="text-[10px] font-bold text-base-content-muted uppercase tracking-widest">
                  Published
                </p>
                <p className="font-semibold text-base-content">
                  {publicationDate}
                </p>
              </div>
            </div>
            <div className="flex items-center p-5 bg-base-100 rounded-2xl shadow-sm gap-4">
              <FaBook className="text-xl text-primary/40" />
              <div>
                <p className="text-[10px] font-bold text-base-content-muted uppercase tracking-widest">
                  ISBN
                </p>
                <p className="font-semibold text-base-content">{isbn}</p>
              </div>
            </div>
          </section>

          {/* Review Section */}
          <div className="pt-10 border-t border-base-300/50">
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
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
};

export default BookDetails;
