import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { FaEdit, FaEye, FaEyeSlash, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';
import Loading from '../../../Components/Logo/Loading/Loading';
import toast from 'react-hot-toast'; // Assuming you have a toast library installed

const MyBooks = () => {
    const { user, loading: authLoading } = useAuth();
    const queryClient = useQueryClient();

    // 1. Fetch Books
    const { 
        data: books = [], 
        isLoading 
    } = useQuery({
        queryKey: ['myLibrarianBooks', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            if (!user?.email) return [];
            // Use the new backend endpoint
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/my-books/${user.email}`
            );
            return res.data;
        },
    });

    // 2. Mutation for Publish/Unpublish
    const statusMutation = useMutation({
        mutationFn: async ({ id, newStatus }) => {
            const res = await axios.patch(
                `${import.meta.env.VITE_API_URL}/books/status/${id}`, 
                { status: newStatus }
            );
            return res.data;
        },
        onSuccess: (data, variables) => {
            // Invalidate the cache to refetch the list immediately
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
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
                    <FaBookOpen className="mr-3 text-indigo-600" /> My Added Books
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                    Manage the books you have added to the system.
                </p>
            </header>

            {books.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-lg mx-auto max-w-2xl">
                    <h3 className="text-2xl font-semibold text-gray-700">
                        No Books Added Yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                        Use the 'Add Book' feature to list your first item.
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200 bg-white">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books.map((book) => (
                                <tr key={book._id} className="hover:bg-indigo-50/50 transition duration-150">
                                    
                                    {/* Book Image */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={book.photo} alt={book.bookTitle} className="w-16 h-20 object-cover rounded-md shadow-sm" />
                                    </td>
                                    
                                    {/* Book Name */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {book.bookTitle}
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${book.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`
                                        }>
                                            {book.status}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* Edit Button */}
                                        <Link to={`/dashboard/edit-book/${book._id}`}>
                                            <button 
                                                className="text-indigo-600 hover:text-indigo-900 p-2 border border-indigo-200 rounded-md transition duration-150 mr-3"
                                                title="Edit Book"
                                            >
                                                <FaEdit className='w-5 h-5' />
                                            </button>
                                        </Link>

                                        {/* Publish/Unpublish Button */}
                                        <button 
                                            onClick={() => handleStatusChange(book)}
                                            className={`p-2 border rounded-md transition duration-150 
                                                ${book.status === 'published' 
                                                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                                                    : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                                                }`}
                                            title={book.status === 'published' ? 'Unpublish Book' : 'Publish Book'}
                                            disabled={statusMutation.isLoading}
                                        >
                                            {book.status === 'published' ? <FaEyeSlash className='w-5 h-5' /> : <FaEye className='w-5 h-5' />}
                                        </button>
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