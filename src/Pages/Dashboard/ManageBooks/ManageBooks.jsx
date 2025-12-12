import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaEyeSlash, FaEdit, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const accentColor = "#ff0077"; // Consistent brand accent

  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // Helper for SweetAlert Theme Support
  const swalConfig = {
    background: 'var(--fallback-b1,oklch(var(--b1)))',
    color: 'var(--fallback-bc,oklch(var(--bc)))',
    confirmButtonColor: accentColor,
    cancelButtonColor: '#6b7280',
  };

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/books/all`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        ...swalConfig,
        title: "Error",
        text: "Failed to fetch all books.",
        icon: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const handleUpdateStatus = async (bookId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    const result = await Swal.fire({
      ...swalConfig,
      title: `Confirm ${newStatus.toUpperCase()}`,
      text: `Change visibility for this entry?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.patch(`${API_BASE_URL}/books/status/${bookId}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
          Swal.fire({ ...swalConfig, title: "Success", icon: "success", timer: 1500 });
          fetchAllBooks();
        }
      } catch (error) {
        Swal.fire({ ...swalConfig, title: "Update Failed", icon: "error" });
      }
    }
  };

  const handleDeleteBook = async (bookId, title) => {
    const result = await Swal.fire({
      ...swalConfig,
      title: `Delete "${title}"?`,
      text: "Warning: This permanently removes the book and all related order history!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444", // Dangerous action uses red
      confirmButtonText: "Delete Everything",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${API_BASE_URL}/books/delete/${bookId}`);
        if (res.data.bookDeleted > 0) {
          Swal.fire({ 
            ...swalConfig, 
            title: "Deleted!", 
            text: `${res.data.ordersDeleted} associated orders also removed.`, 
            icon: "success" 
          });
          fetchAllBooks();
        }
      } catch (error) {
        Swal.fire({ ...swalConfig, title: "Delete Failed", icon: "error" });
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-bars loading-lg" style={{ color: accentColor }}></span>
      </div>
    );
  }

  return (
    // 🎨 CHANGE: Theme-aware background and text
    <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content">
      <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black flex items-center gap-3">
            <FaShieldAlt style={{ color: accentColor }} />
            Manage Inventory
          </h2>
          <p className="opacity-60 mt-2 font-medium">Global catalog management for all librarians.</p>
        </div>
        <div className="stats shadow bg-base-100 border border-base-300">
          <div className="stat py-2 px-6">
            <div className="stat-title text-xs uppercase">Total Listings</div>
            <div className="stat-value text-2xl">{books.length}</div>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto shadow-2xl rounded-2xl border border-base-300 bg-base-100">
        <table className="table w-full">
          {/* 🎨 CHANGE: Styled Table Header */}
          <thead className="bg-base-300">
            <tr className="text-base-content/70">
              <th className="w-16">Cover</th>
              <th>Book Info</th>
              <th className="hidden lg:table-cell">Librarian</th>
              <th>Price</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-base-200/50 transition-colors">
                <td>
                  <div className="avatar">
                    <div className="w-12 h-16 mask mask-squircle shadow-md">
                      <img src={book.photo} alt={book.bookTitle} className="object-cover" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-sm lg:text-base leading-tight">
                    {book.bookTitle}
                  </div>
                  <div className="text-xs opacity-50 block lg:hidden">
                    {book.seller_libarien?.email || "No Seller"}
                  </div>
                </td>
                <td className="hidden lg:table-cell text-sm opacity-80">
                  {book.seller_libarien?.email || "N/A"}
                </td>
                <td className="font-mono font-bold">${book.price}</td>
                <td>
                  <span className={`badge badge-sm lg:badge-md font-bold ${
                    book.status === "published" ? "badge-success badge-outline" : "badge-warning badge-outline"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1 lg:gap-2">
                    {/* Edit */}
                    <Link to={`/dashboard/edit-book/${book._id}`}>
                      <button className="btn btn-square btn-sm btn-ghost hover:bg-info/20 text-info" title="Edit">
                        <FaEdit />
                      </button>
                    </Link>

                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleUpdateStatus(book._id, book.status)}
                      className={`btn btn-square btn-sm btn-ghost ${
                        book.status === "published" ? "hover:bg-warning/20 text-warning" : "hover:bg-success/20 text-success"
                      }`}
                      title={book.status === "published" ? "Unpublish" : "Publish"}
                    >
                      {book.status === "published" ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteBook(book._id, book.bookTitle)}
                      className="btn btn-square btn-sm btn-ghost hover:bg-error/20 text-error"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {books.length === 0 && (
        <div className="text-center py-20 bg-base-100 rounded-2xl border-2 border-dashed border-base-300 mt-8">
           <p className="text-base-content/40 italic">The inventory is currently empty.</p>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;