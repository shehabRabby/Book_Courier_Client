import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaEye, FaEyeSlash, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Logo/Loading/Loading';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; 

const MyBooks = () => {
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient();
    const accentColor = "#6366f1"; 
    const axiosSecure = useAxiosSecure(); 

    const { 
        data: books = [], 
        isLoading 
    } = useQuery({
        queryKey: ['myLibrarianBooks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/my-books/${user.email}`);
            return res.data;
        },
    });

    const statusMutation = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            const res = await axiosSecure.patch(`/books/status/${id}`, { status: newStatus });
            return res.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['myLibrarianBooks', user?.email] });
            const action = variables.newStatus === 'published' ? 'Published' : 'Unpublished';
            toast.success(`Book successfully ${action}!`);
        },
        onError: (error) => {
            toast.error(`Failed to update status: ${error.message}`);
        }
    });

    const handleStatusChange = (book) => {
        const newStatus = book.status === 'published' ? 'unpublished' : 'published';
        statusMutation.mutate({ id: book._id, newStatus });
    };

    if (authLoading || isLoading) return <Loading />;

    return (
        <div className="p-4 sm:p-8 bg-base-200 min-h-screen text-base-content animate-in fade-in duration-500">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-black italic tracking-tight flex items-center justify-center uppercase">
                    <FaBookOpen className="mr-3" style={{ color: accentColor }} /> 
                    My Added Books
                </h1>
                <p className="text-sm font-bold uppercase tracking-widest opacity-60 mt-2">
                    Manage and toggle the visibility of your listed library entries.
                </p>
                <div className="h-1.5 w-24 bg-[#6366f1] mx-auto mt-4 rounded-full"></div>
            </header>

            {books.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 mx-auto max-w-2xl">
                    <div className="text-6xl text-indigo-200 mb-4 flex justify-center"><FaBookOpen /></div>
                    <h3 className="text-2xl font-black uppercase italic opacity-80">
                        No Books Added Yet
                    </h3>
                    <p className="opacity-60 mt-2 font-medium">
                        Use the 'Add Book' feature to list your first item.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-[2rem] border border-base-300 bg-base-100">
                    <table className="table w-full">
                        <thead className="bg-indigo-50/50">
                            <tr className="text-indigo-600 uppercase text-xs font-black tracking-widest border-b border-base-300">
                                <th className="bg-transparent py-5">Cover</th>
                                <th className="bg-transparent py-5">Book Name</th>
                                <th className="bg-transparent py-5 text-center">Status</th>
                                <th className="bg-transparent py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-200">
                            {books.map((book) => (
                                <tr key={book._id} className="hover:bg-indigo-50/30 transition duration-150 group">
                                    
                                    {/* Book Image */}
                                    <td className="py-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-16 shadow-lg group-hover:scale-105 transition-transform">
                                                <img src={book.photo} alt={book.bookTitle} className="object-cover" />
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Book Name */}
                                    <td className="font-bold text-base tracking-tight">
                                        {book.bookTitle}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="text-center">
                                        <span className={`badge badge-md font-black uppercase italic px-4 py-3 border-2 tracking-tighter ${
                                            book.status === 'published' 
                                            ? 'border-emerald-500 text-emerald-600 bg-emerald-50' 
                                            : 'border-rose-500 text-rose-600 bg-rose-50'
                                        }`}>
                                            {book.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-3">
                                            {/* Edit Button */}
                                            <Link to={`/dashboard/edit-book/${book._id}`}>
                                                <button 
                                                    className="btn btn-square bg-white border-indigo-200 text-indigo-600 hover:bg-indigo-600 hover:text-white btn-sm shadow-sm transition-all"
                                                    title="Edit Book"
                                                >
                                                    <FaEdit className='w-4 h-4' />
                                                </button>
                                            </Link>

                                            {/* Publish/Unpublish Toggle */}
                                            <button 
                                                onClick={() => handleStatusChange(book)}
                                                className={`btn btn-square btn-sm shadow-sm border-2 transition-all ${
                                                    book.status === 'published' 
                                                    ? 'bg-white border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white' 
                                                    : 'bg-white border-emerald-200 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                                                }`}
                                                title={book.status === 'published' ? 'Unpublish Book' : 'Publish Book'}
                                                disabled={statusMutation.isPending}
                                            >
                                                {book.status === 'published' ? <FaEyeSlash className='w-4 h-4' /> : <FaEye className='w-4 h-4' />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyBooks;