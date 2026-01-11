import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaHeartBroken, FaBookOpen, FaStar } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Logo/Loading/Loading";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; 

const MyWishlist = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();
    const accentColor = "#6366f1"; // Changed to Indigo-500
    
    const axiosSecure = useAxiosSecure(); 

    const { data: wishlist = [], isLoading } = useQuery({
        queryKey: ["wishlist", user?.email],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/wishlist/${user?.email}`);
            return res.data;
        },
    });

    const { mutateAsync: removeWish } = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/wishlist/${id}`);
        },
        onSuccess: () => {
            toast.success("Removed from wishlist"); 
            queryClient.invalidateQueries({ queryKey: ["wishlist", user?.email] });
        },
        onError: (err) => {
            toast.error(err.message || "Failed to remove item.");
        }
    });

    if (isLoading) return <Loading />;

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8 text-base-content">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 text-center sm:text-left">
                    <h1 className="text-4xl font-black flex items-center justify-center sm:justify-start italic tracking-tight">
                        <FaBookOpen className="mr-3" style={{ color: accentColor }} />
                        My Wishlist
                    </h1>
                    <p className="text-sm font-medium opacity-60 mt-2 uppercase tracking-widest">Manage the books you've saved for later</p>
                    <div className="h-1 w-20 bg-[#6366f1] mt-4 rounded-full hidden sm:block"></div>
                </header>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-base-100 rounded-[2rem] shadow-xl border border-base-300">
                        <FaHeartBroken className="mx-auto text-6xl text-indigo-500 opacity-20 mb-4" />
                        <h2 className="text-2xl font-bold opacity-50">Your wishlist is empty</h2>
                        <Link to="/all-books" className="mt-6 btn btn-link text-[#6366f1] no-underline hover:underline font-bold uppercase tracking-widest text-xs">
                            Browse the library
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {wishlist.map((item) => (
                            <div key={item._id} className="bg-base-100 rounded-2xl shadow-xl overflow-hidden border border-base-300 flex flex-col group transition-all  hover:shadow-2xl">
                                
                                {/* Image Container */}
                                <div className="relative h-40 overflow-hidden">
                                    <img 
                                        src={item.photo} 
                                        alt={item.bookTitle} 
                                        className="w-full h-full object-cover transform transition duration-500 group-hover:scale-110" 
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg font-black text-[#6366f1] shadow-md border border-indigo-100 text-sm">
                                        ${item.price}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg font-black line-clamp-1 tracking-tight group-hover:text-[#6366f1] transition-colors">{item.bookTitle}</h3>
                                        <span className="flex items-center text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-md">
                                            <FaStar className="mr-1" /> {item.rating}
                                        </span>
                                    </div>
                                    <p className="opacity-60 text-xs mb-4 font-bold uppercase tracking-tighter">by {item.authorName}</p>
                                    
                                    <span className="badge bg-indigo-50 border-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-3 rounded-md uppercase tracking-wider mb-6">
                                        {item.category}
                                    </span>

                                    {/* Actions */}
                                    <div className="flex gap-3 mt-auto">
                                        <Link
                                            to={`/book/${item.bookId}`}
                                            className="flex-grow btn btn-neutral btn-sm rounded-xl font-bold shadow-md transition-all hover:bg-[#6366f1] hover:border-[#6366f1] hover:text-white uppercase text-[10px] tracking-widest"
                                        >
                                            <FaEye /> Details
                                        </Link>
                                        <button
                                            onClick={() => removeWish(item._id)}
                                            className="btn btn-square btn-outline btn-sm btn-error rounded-xl shadow-sm hover:shadow-rose-200 transition-all"
                                            title="Remove"
                                        >
                                            <FaTrash size={14} />
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