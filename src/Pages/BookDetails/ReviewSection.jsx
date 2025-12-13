import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// ❌ REMOVE: import axios from 'axios';
import { FaStar, FaUser, FaRegCommentDots } from 'react-icons/fa';
import Swal from 'sweetalert2';
// 🚀 NEW IMPORT: Secure Axios Hook
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 

// Star Rating Component (Unchanged)
const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex justify-start items-center">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className={`text-3xl cursor-pointer transition-colors duration-100 ${
                            ratingValue <= rating ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                        onClick={() => setRating(ratingValue)}
                    />
                );
            })}
        </div>
    );
};

// Main Review Section Component
const ReviewSection = ({ bookId, userEmail, userName, refetchBook }) => {
    const queryClient = useQueryClient();
    // 1. Instantiate secure Axios
    const axiosSecure = useAxiosSecure(); 
    // NOTE: We no longer need API_BASE_URL if axiosSecure handles the base URL.
    // const API_BASE_URL = import.meta.env.VITE_API_URL; 

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    // --- QUERY 1: Check Review Eligibility (REQUIRES AUTH) ---
    const { data: eligibility = {}, isLoading: isLoadingEligibility } = useQuery({
        queryKey: ['reviewEligibility', bookId, userEmail],
        enabled: !!userEmail && !!bookId,
        queryFn: async () => {
            if (!userEmail) return { canReview: false };
            // 🔑 SECURITY FIX: Use axiosSecure for eligibility check
            const res = await axiosSecure.get(`/user-can-review/${bookId}/${userEmail}`); 
            return res.data;
        },
    });

    // --- QUERY 2: Fetch All Reviews (Public, standard Axios is okay, but using secure is fine too) ---
    const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
        queryKey: ['bookReviews', bookId],
        queryFn: async () => {
            // We keep this using standard fetch/axios if reviews are public and need no auth. 
            // If the base URL is handled by axiosSecure, we must use it. Assuming API_BASE_URL is still needed 
            // if you don't use axiosSecure for public endpoints, but let's assume it should be authenticated 
            // like everything else for consistency.
            const res = await axiosSecure.get(`/reviews/${bookId}`); 
            return res.data;
        },
    });

    // --- MUTATION: Submit Review (REQUIRES AUTH) ---
    const reviewMutation = useMutation({
        // 🔑 SECURITY FIX: Use axiosSecure for review submission
        mutationFn: (newReview) => axiosSecure.post(`/reviews`, newReview), 
        onSuccess: (response) => {
            Swal.fire('Success!', 'Your review has been submitted successfully.', 'success');
            
            // Invalidate and refetch queries
            queryClient.invalidateQueries(['bookReviews', bookId]);
            queryClient.invalidateQueries(['reviewEligibility', bookId, userEmail]);
            refetchBook(); // Refresh the main book details to show the new rating
            
            // Clear form
            setRating(0);
            setReviewText('');
        },
        onError: (error) => {
            console.error("Review submission failed:", error);
            // Provide a clearer error if it's an authorization issue
            const errorMessage = (error.response?.status === 401 || error.response?.status === 403) 
                ? "Authorization failed. Please log in again." 
                : 'Failed to submit review. Please try again.';
            Swal.fire('Error', errorMessage, 'error');
        },
    });

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (rating === 0) {
            Swal.fire('Warning', 'Please give a star rating.', 'warning');
            return;
        }

        const newReview = {
            bookId: bookId,
            userId: userEmail,
            userName: userName,
            rating: rating,
            reviewText: reviewText,
            createdAt: new Date().toISOString(), // Add timestamp for sorting/display
        };
        
        reviewMutation.mutate(newReview);
    };

    const renderReviewForm = () => {
        // ... (rest of renderReviewForm is unchanged)
        if (!userEmail) {
            return (
                <div className="bg-blue-100 p-4 rounded-lg text-blue-800 border-l-4 border-blue-500">
                    Please <span className="font-bold">log in</span> to write a review.
                </div>
            );
        }

        if (isLoadingEligibility || reviewMutation.isPending) {
            return <div className="text-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
        }

        if (!eligibility.canReview) {
            const reason = eligibility.reason;
            let message = "You cannot review this book yet.";
            
            if (reason === 'NOT_ORDERED') {
                message = "You must purchase and pay for this book before you can leave a review.";
            } else if (reason === 'ALREADY_REVIEWED') {
                message = "You have already submitted a review for this book.";
            }
            
            return (
                <div className="bg-red-100 p-4 rounded-lg text-red-800 border-l-4 border-red-500">
                    {message}
                </div>
            );
        }

        return (
            <form onSubmit={handleSubmitReview} className="space-y-4">
                <h4 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <FaStar className="mr-2 text-yellow-500" /> Write Your Review
                </h4>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <p className="font-medium text-gray-700">Your Rating:</p>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your thoughts on the book..."
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-lg text-white font-bold bg-pink-600 hover:bg-pink-700 transition-colors duration-200 disabled:bg-gray-400"
                    disabled={reviewMutation.isPending}
                >
                    {reviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                </button>
            </form>
        );
    };

    const renderReviews = () => {
        // ... (rest of renderReviews is unchanged)
        if (isLoadingReviews) {
            return <div className="text-center py-4"><span className="loading loading-spinner loading-md text-gray-500"></span></div>;
        }

        if (reviews.length === 0) {
            return (
                <p className="text-center text-gray-500 py-4">No reviews yet. Be the first to review!</p>
            );
        }

        return (
            <div className="space-y-6">
                {reviews.map((review, index) => (
                    <div key={index} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                                <FaUser className="mr-2 text-gray-500" />
                                <span className="font-bold text-gray-800">{review.userName || review.userId}</span>
                            </div>
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`text-lg ${
                                            i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                                        }`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">{review.rating.toFixed(1)}</span>
                            </div>
                        </div>
                        <p className="text-gray-700 italic border-l-4 border-pink-200 pl-3">
                            {review.reviewText || "No text review provided."}
                        </p>
                        <p className="text-xs text-gray-400 mt-2 text-right">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
                <FaRegCommentDots className="mr-3 text-pink-600" /> Customer Reviews 
                <span className="text-xl font-normal text-gray-500 ml-4">({reviews.length} total)</span>
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Review Submission Form (Column 1) */}
                <div className="lg:col-span-1 p-6 bg-white rounded-xl shadow-lg border border-gray-100 h-fit">
                    {renderReviewForm()}
                </div>

                {/* Reviews List (Columns 2 & 3) */}
                <div className="lg:col-span-2 space-y-4">
                    {renderReviews()}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;