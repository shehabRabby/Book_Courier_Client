import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); // Get current logged-in user details

    // Base URL for your backend server
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    // 1. Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            // Replace with your actual JWT/Axios setup if needed
            const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            Swal.fire('Error', 'Failed to fetch user list.', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 2. Handle role updates (Make Admin/Librarian)
    const handleUpdateRole = async (id, name, newRole) => {
        Swal.fire({
            title: `Change ${name}'s role to ${newRole}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change role!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Endpoint construction based on the backend routes
                    const endpoint = `${API_BASE_URL}/users/make-${newRole}/${id}`;
                    
                    const res = await axios.patch(endpoint, {}); // PATCH request
                    
                    if (res.data.modifiedCount > 0) {
                        Swal.fire(
                            'Success!',
                            `${name} is now a ${newRole}.`,
                            'success'
                        );
                        // Refresh the user list
                        fetchUsers();
                    }
                } catch (error) {
                    console.error(`Error making ${newRole}:`, error);
                    Swal.fire('Error', `Failed to update role to ${newRole}.`, 'error');
                }
            }
        });
    };


    if (loading) {
        // Use a DaisyUI loading spinner
        return <div className="text-center py-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    }

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-3xl font-bold text-neutral mb-8">
                Manage All Users ({users.length})
            </h2>
            
            <div className="overflow-x-auto shadow-xl rounded-box">
                <table className="table table-zebra w-full">
                    {/* Table Head */}
                    <thead>
                        <tr className="bg-base-200">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Current Role</th>
                            <th>Action: Librarian</th>
                            <th>Action: Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.name || 'N/A'}</td>
                                <td>{item.email}</td>
                                <td>
                                    {/* Display role with badge */}
                                    <span className={`badge badge-lg ${item.role === 'admin' ? 'badge-error' : item.role === 'librarian' ? 'badge-primary' : 'badge-ghost'}`}>
                                        {item.role}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateRole(item._id, item.name, 'librarian')}
                                        className="btn btn-sm btn-primary text-white"
                                        // Disable button if already a librarian or admin
                                        disabled={item.role === 'librarian' || item.role === 'admin'}
                                    >
                                        Make Librarian
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleUpdateRole(item._id, item.name, 'admin')}
                                        className="btn btn-sm btn-error text-white"
                                        // Disable button if already an admin
                                        disabled={item.role === 'admin'}
                                    >
                                        Make Admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <p className="text-center text-gray-500 mt-10">No users found.</p>
            )}
        </div>
    );
};

export default AllUsers;