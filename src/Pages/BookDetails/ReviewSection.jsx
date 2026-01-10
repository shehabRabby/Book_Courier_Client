import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar, FaUser, FaRegCommentDots, FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure'; 

const StarRating = ({ rating, setRating }) => {
    return (
        <div className="flex justify-start items-center gap-1">
            {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className={`text-2xl cursor-pointer transition-all duration-200 hover:scale-110 ${
                            ratingValue <= rating ? 'text-yellow-500' : 'text-base-300'
                        }`}
                        onClick={() => setRating(ratingValue)}
                    />
                );
            })}
        </div>
    );
};

const ReviewSection = ({ bookId, userEmail, userName, refetchBook }) => {
    const queryClient = useQueryClient();
    const axiosSecure = useAxiosSecure(); 
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const { data: eligibility = {}, isLoading: isLoadingEligibility } = useQuery({
        queryKey: ['reviewEligibility', bookId, userEmail],
        enabled: !!userEmail && !!bookId,
        queryFn: async () => {
            if (!userEmail) return { canReview: false };
            const res = await axiosSecure.get(`/user-can-review/${bookId}/${userEmail}`); 
            return res.data;
        },
    });

    const { data: reviews = [], isLoading: isLoadingReviews } = useQuery({
        queryKey: ['bookReviews', bookId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${bookId}`); 
            return res.data;
        },
    });

    const reviewMutation = useMutation({
        mutationFn: (newReview) => axiosSecure.post(`/reviews`, newReview), 
        onSuccess: () => {
            Swal.fire({
                title: 'Success!',
                text: 'Your review has been submitted.',
                icon: 'success',
                confirmButtonColor: 'var(--color-primary)'
            });
            queryClient.invalidateQueries(['bookReviews', bookId]);
            queryClient.invalidateQueries(['reviewEligibility', bookId, userEmail]);
            refetchBook(); 
            setRating(0);
            setReviewText('');
        },
        onError: (error) => {
            const errorMessage = (error.response?.status === 401 || error.response?.status === 403) 
                ? "Authorization failed. Please log in again." 
                : 'Failed to submit review.';
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
            bookId,
            userId: userEmail,
            userName,
            rating,
            reviewText,
            createdAt: new Date().toISOString(), 
        };
        reviewMutation.mutate(newReview);
    };

    const renderReviewForm = () => {
        if (!userEmail) {
            return (
                <div className="bg-base-200 p-6 rounded-2xl text-center">
                    <FaLock className="mx-auto mb-3 opacity-20 text-3xl" />
                    <p className="text-sm font-medium text-base-content-muted">
                        Please <span className="text-primary font-bold">log in</span> to write a review.
                    </p>
                </div>
            );
        }

        if (isLoadingEligibility || reviewMutation.isPending) {
            return <div className="flex justify-center py-10"><span className="loading loading-spinner text-primary"></span></div>;
        }

        if (!eligibility.canReview) {
            const reason = eligibility.reason;
            let message = "You cannot review this book yet.";
            if (reason === 'NOT_ORDERED') message = "Purchase this book to leave a review.";
            else if (reason === 'ALREADY_REVIEWED') message = "You've already reviewed this book.";
            
            return (
                <div className="bg-base-200/50 p-6 rounded-2xl text-center border-t-2 border-primary/20">
                    <p className="text-sm font-semibold text-base-content-muted">{message}</p>
                </div>
            );
        }

        return (
            <form onSubmit={handleSubmitReview} className="space-y-5">
                <h4 className="text-xl font-bold text-base-content flex items-center gap-2">
                    Submit Review
                </h4>
                <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-base-content-muted">Rating</p>
                    <StarRating rating={rating} setRating={setRating} />
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-base-content-muted">Comment</p>
                    <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your experience..."
                        rows="4"
                        className="w-full p-4 bg-base-200 border-none rounded-xl focus:ring-2 focus:ring-primary/20 text-base-content outline-none transition-all"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-full shadow-lg shadow-primary/20 border-none text-white"
                    disabled={reviewMutation.isPending}
                >
                    {reviewMutation.isPending ? 'Submitting...' : 'Post Review'}
                </button>
            </form>
        );
    };

    const renderReviews = () => {
        if (isLoadingReviews) return <div className="flex justify-center py-10"><span className="loading loading-spinner opacity-20"></span></div>;
        if (reviews.length === 0) return <p className="text-center text-base-content-muted py-10 italic">Be the first to share your thoughts!</p>;

        return (
            <div className="space-y-4">
                {reviews.map((review, index) => (
                    <div key={index} className="p-6 bg-base-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-primary">
                                    <FaUser />
                                </div>
                                <div>
                                    <span className="block font-bold text-base-content">{review.userName || "Anonymous"}</span>
                                    <span className="block text-[10px] text-base-content-muted uppercase tracking-tighter">Verified Reader</span>
                                </div>
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={`text-xs ${i < review.rating ? 'text-yellow-500' : 'text-base-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-base-content-muted leading-relaxed pl-13 border-l-2 border-primary/10 italic">
                            "{review.reviewText || "Excellent read."}"
                        </p>
                        <p className="text-[10px] text-base-content-muted mt-4 text-right font-medium">
                            {new Date(review.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-16 animate-fadeInUp" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-base-content flex items-center gap-3">
                    <FaRegCommentDots className="text-primary" /> Reader Reviews 
                </h2>
                <div className="px-4 py-1 bg-primary/10 rounded-full text-primary text-xs font-bold">
                    {reviews.length} Feedbacks
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-base-100 p-6 rounded-3xl shadow-sm">
                        {renderReviewForm()}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {renderReviews()}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;