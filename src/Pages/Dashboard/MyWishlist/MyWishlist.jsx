import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaHeartBroken, FaBookOpen, FaStar } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Logo/Loading/Loading";
import toast from "react-hot-toast";

const accentColor = "#ff0077";

const MyWishlist = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch Wishlist
  const { data: wishlist = [], isLoading } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/wishlist/${user?.email}`);
      return res.data;
    },
  });

  // Remove Mutation
  const { mutateAsync: removeWish } = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/wishlist/${id}`);
    },
    onSuccess: () => {
      toast.success("Removed from wishlist");
      queryClient.invalidateQueries(["wishlist", user?.email]);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center">
            <FaBookOpen className="mr-3" style={{ color: accentColor }} />
            My Wishlist
          </h1>
          <p className="text-gray-500 mt-2">Manage the books you've saved for later.</p>
        </header>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <FaHeartBroken className="mx-auto text-6xl text-gray-200 mb-4" />
            <h2 className="text-2xl font-bold text-gray-400">Your wishlist is empty</h2>
            <Link to="/all-books" className="mt-6 inline-block font-bold text-pink-600 hover:underline">
              Browse the library
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((item) => (
              <div key={item._id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-50 flex flex-col group">
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={item.photo} 
                    alt={item.bookTitle} 
                    className="w-full h-full object-cover transform transition duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-pink-600 shadow-sm">
                    ${item.price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">{item.bookTitle}</h3>
                    <span className="flex items-center text-sm font-semibold text-orange-500">
                      <FaStar className="mr-1" /> {item.rating}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4 font-medium">by {item.authorName}</p>
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md uppercase tracking-wider mb-6 w-fit">
                    {item.category}
                  </span>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <Link
                      to={`/book/${item.bookId}`}
                      className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                    >
                      <FaEye /> Details
                    </Link>
                    <button
                      onClick={() => removeWish(item._id)}
                      className="px-4 py-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all border border-red-100"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWishlist;