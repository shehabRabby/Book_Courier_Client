import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaEyeSlash, FaEdit, FaShieldAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const accentColor = "#6366f1"; // Changed to Indigo-500
  const axiosSecure = useAxiosSecure();

  const swalConfig = {
    background: 'var(--fallback-b1,oklch(var(--b1)))',
    color: 'var(--fallback-bc,oklch(var(--bc)))',
    confirmButtonColor: accentColor,
    cancelButtonColor: '#94a3b8',
    customClass: { popup: 'rounded-[2rem]' }
  };

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const response = await axiosSecure.get(`/books/all`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        ...swalConfig,
        title: "Error",
        text: "Failed to fetch all books. (Check Authorization)",
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
        const res = await axiosSecure.patch(`/books/status/${bookId}`, { status: newStatus });
        if (res.data.modifiedCount > 0) {
          Swal.fire({ ...swalConfig, title: "Success", icon: "success", timer: 1500 });
          fetchAllBooks();
        }
      } catch (error) {
        console.error("Status update failed:", error);
        Swal.fire({ ...swalConfig, title: "Update Failed", text: "Ensure you have the correct role.", icon: "error" });
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
      confirmButtonColor: "#ef4444", 
      confirmButtonText: "Delete Everything",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/books/delete/${bookId}`);
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
        console.error("Deletion failed:", error);
        Swal.fire({ ...swalConfig, title: "Delete Failed", text: "Ensure you have the correct role.", icon: "error" });
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
    <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content animate-in fade-in duration-500">
      <header className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black italic tracking-tight flex items-center gap-3 uppercase">
            <FaShieldAlt style={{ color: accentColor }} />
            Manage Inventory
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest opacity-60 mt-2">Global catalog management for all librarians.</p>
          <div className="h-1.5 w-24 bg-[#6366f1] mt-4 rounded-full hidden md:block"></div>
        </div>
        <div className="stats shadow-xl bg-indigo-600 text-white border-none rounded-3xl">
          <div className="stat py-3 px-8">
            <div className="stat-title text-indigo-100 text-xs font-black uppercase tracking-widest italic">Total Listings</div>
            <div className="stat-value text-3xl font-black">{books.length}</div>
          </div>
        </div>
      </header>

      <div className="overflow-x-auto shadow-2xl rounded-[2.5rem] border border-base-300 bg-base-100">
        <table className="table w-full">
          <thead className="bg-indigo-50/50">
            <tr className="text-indigo-600 uppercase text-xs font-black tracking-widest border-b border-base-300">
              <th className="w-16 py-5">Cover</th>
              <th className="py-5">Book Info</th>
              <th className="hidden lg:table-cell py-5">Librarian</th>
              <th className="py-5">Price</th>
              <th className="py-5">Status</th>
              <th className="text-right py-5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {books.map((book) => (
              <tr key={book._id} className="hover:bg-indigo-50/30 transition-colors group">
                <td>
                  <div className="avatar">
                    <div className="w-12 h-16 mask mask-squircle shadow-lg group-hover:scale-105 transition-transform">
                      <img src={book.photo} alt={book.bookTitle} className="object-cover" />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold text-base tracking-tight leading-tight">
                    {book.bookTitle}
                  </div>
                  <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter block lg:hidden">
                    {book.seller_libarien?.email || "No Seller"}
                  </div>
                </td>
                <td className="hidden lg:table-cell text-sm font-medium opacity-80 italic">
                  {book.seller_libarien?.email || "N/A"}
                </td>
                <td className="font-black text-indigo-600 italic tracking-tighter text-lg">${book.price}</td>
                <td>
                  <span className={`badge font-black uppercase italic px-4 py-3 border-2 tracking-tighter text-[10px] ${
                    book.status === "published" ? "border-emerald-500 text-emerald-600 bg-emerald-50" : "border-amber-500 text-amber-600 bg-amber-50"
                  }`}>
                    {book.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1 lg:gap-2">
                    {/* Edit */}
                    <Link to={`/dashboard/edit-book/${book._id}`}>
                      <button className="btn btn-square btn-sm bg-white border-indigo-100 text-indigo-500 hover:bg-indigo-500 hover:text-white shadow-sm transition-all" title="Edit">
                        <FaEdit />
                      </button>
                    </Link>

                    {/* Toggle Visibility */}
                    <button
                      onClick={() => handleUpdateStatus(book._id, book.status)}
                      className={`btn btn-square btn-sm bg-white shadow-sm transition-all border-2 ${
                        book.status === "published" ? "border-amber-100 text-amber-500 hover:bg-amber-500 hover:text-white" : "border-emerald-100 text-emerald-500 hover:bg-emerald-500 hover:text-white"
                      }`}
                      title={book.status === "published" ? "Unpublish" : "Publish"}
                    >
                      {book.status === "published" ? <FaEyeSlash /> : <FaEye />}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDeleteBook(book._id, book.bookTitle)}
                      className="btn btn-square btn-sm bg-white border-rose-100 text-rose-500 hover:bg-rose-500 hover:text-white shadow-sm transition-all"
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
        <div className="text-center py-20 bg-base-100 mt-10 rounded-[2rem] border-2 border-dashed border-base-300">
           <p className="font-bold uppercase tracking-widest opacity-30 italic">The inventory is currently empty.</p>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;