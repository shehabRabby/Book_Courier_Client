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
    const accentColor = "#ff0077";
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
        <div className="p-4 sm:p-8 bg-base-200 min-h-screen text-base-content">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold flex items-center justify-center">
                    <FaBookOpen className="mr-3" style={{ color: accentColor }} /> 
                    My Added Books
                </h1>
                <p className="text-lg opacity-70 mt-2">
                    Manage and toggle the visibility of your listed library entries.
                </p>
            </header>

            {books.length === 0 ? (
                <div className="text-center py-20 bg-base-100 rounded-3xl shadow-xl border border-base-300 mx-auto max-w-2xl">
                    <h3 className="text-2xl font-semibold opacity-80">
                        No Books Added Yet
                    </h3>
                    <p className="opacity-60 mt-2">
                        Use the 'Add Book' feature to list your first item.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-300 bg-base-100">
                    <table className="table w-full">
                        <thead className="bg-base-300">
                            <tr className="text-base-content/70 uppercase text-xs">
                                <th className="bg-transparent">Cover</th>
                                <th className="bg-transparent">Book Name</th>
                                <th className="bg-transparent text-center">Status</th>
                                <th className="bg-transparent text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300">
                            {books.map((book) => (
                                <tr key={book._id} className="hover:bg-base-200/50 transition duration-150">
                                    
                                    {/* Book Image */}
                                    <td className="py-4">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-16">
                                                <img src={book.photo} alt={book.bookTitle} />
                                            </div>
                                        </div>
                                    </td>
                                    
                                    {/* Book Name */}
                                    <td className="font-bold text-sm">
                                        {book.bookTitle}
                                    </td>

                                    {/* Status Badge */}
                                    <td className="text-center">
                                        <span className={`badge badge-md font-bold px-4 py-3 ${
                                            book.status === 'published' 
                                            ? 'badge-success badge-outline' 
                                            : 'badge-error badge-outline'
                                        }`}>
                                            {book.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {/* Edit Button */}
                                            <Link to={`/dashboard/edit-book/${book._id}`}>
                                                <button 
                                                    className="btn btn-square btn-outline btn-neutral btn-sm"
                                                    title="Edit Book"
                                                >
                                                    <FaEdit className='w-4 h-4' />
                                                </button>
                                            </Link>

                                            {/* Publish/Unpublish Toggle */}
                                            <button 
                                                onClick={() => handleStatusChange(book)}
                                                className={`btn btn-square btn-sm ${
                                                    book.status === 'published' 
                                                    ? 'btn-error btn-outline' 
                                                    : 'btn-success btn-outline'
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