import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import { FaUsersCog, FaUserShield, FaUserTag, FaUserEdit } from 'react-icons/fa';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth(); 
    const accentColor = "#ff0077"; // Consistent brand accent

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

    // 🎨 Theme-aware SweetAlert configuration
    const swalConfig = {
        background: 'var(--fallback-b1,oklch(var(--b1)))',
        color: 'var(--fallback-bc,oklch(var(--bc)))',
        confirmButtonColor: accentColor,
        cancelButtonColor: '#6b7280',
    };

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                ...swalConfig,
                title: 'Error',
                text: 'Failed to fetch user list.',
                icon: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleUpdateRole = async (id, name, newRole) => {
        Swal.fire({
            ...swalConfig,
            title: `Promote ${name}?`,
            text: `Confirming promotion to ${newRole.toUpperCase()}. This grants elevated system permissions.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, Make ${newRole}`
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const endpoint = `${API_BASE_URL}/users/make-${newRole}/${id}`;
                    const res = await axios.patch(endpoint, {}); 
                    
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            ...swalConfig,
                            title: 'Role Updated!',
                            text: `${name} is now a ${newRole}.`,
                            icon: 'success',
                            timer: 2000
                        });
                        fetchUsers();
                    }
                } catch (error) {
                    Swal.fire({ ...swalConfig, title: 'Error', text: 'Update failed.', icon: 'error' });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg" style={{ color: accentColor }}></span>
            </div>
        );
    }

    return (
        // 🎨 CHANGE: Semantic background and text colors
        <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content">
            <header className="mb-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-black flex items-center gap-3">
                        <FaUsersCog style={{ color: accentColor }} />
                        User Management
                    </h2>
                    <p className="opacity-60 mt-2 font-medium">Control access levels and assign system roles.</p>
                </div>
                
                {/* 🎨 User Count Stat */}
                <div className="stats shadow bg-base-100 border border-base-300">
                    <div className="stat py-2 px-8">
                        <div className="stat-title text-xs uppercase font-bold">Total Members</div>
                        <div className="stat-value text-3xl" style={{ color: accentColor }}>{users.length}</div>
                    </div>
                </div>
            </header>
            
            <div className="overflow-x-auto shadow-2xl rounded-3xl border border-base-300 bg-base-100">
                <table className="table w-full">
                    {/* Table Head */}
                    <thead className="bg-base-300">
                        <tr className="text-base-content/70 uppercase text-xs tracking-wider">
                            <th>User</th>
                            <th>Contact Info</th>
                            <th className="text-center">Current Role</th>
                            <th className="text-right">Assign Authority</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {users.map((item) => (
                            <tr key={item._id} className="hover:bg-base-200/50 transition-colors">
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                <span className="text-xs">{item.name?.charAt(0) || 'U'}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{item.name || 'Anonymous'}</div>
                                            <div className="text-[10px] opacity-50 uppercase tracking-tighter">UID: {item._id.slice(-6)}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-sm opacity-80 font-mono">{item.email}</td>
                                <td className="text-center">
                                    <span className={`badge badge-md font-bold px-4 py-3 ${
                                        item.role === 'admin' 
                                        ? 'badge-error badge-outline' 
                                        : item.role === 'librarian' 
                                        ? 'badge-primary badge-outline' 
                                        : 'badge-ghost opacity-50'
                                    }`}>
                                        {item.role || 'User'}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* Promote to Librarian */}
                                        <button
                                            onClick={() => handleUpdateRole(item._id, item.name, 'librarian')}
                                            className="btn btn-sm btn-outline btn-primary normal-case gap-2"
                                            disabled={item.role === 'librarian' || item.role === 'admin'}
                                        >
                                            <FaUserTag className="hidden sm:inline" />
                                            Librarian
                                        </button>

                                        {/* Promote to Admin */}
                                        <button
                                            onClick={() => handleUpdateRole(item._id, item.name, 'admin')}
                                            className="btn btn-sm btn-outline btn-error normal-case gap-2"
                                            disabled={item.role === 'admin'}
                                        >
                                            <FaUserShield className="hidden sm:inline" />
                                            Admin
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {users.length === 0 && (
                <div className="text-center py-20 opacity-40 italic">
                    <p>No user records found in the database.</p>
                </div>
            )}
        </div>
    );
};

export default AllUsers;