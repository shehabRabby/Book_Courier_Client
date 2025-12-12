import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash, FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom"; // For the edit button

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Uses the API URL provided in your VITE environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  // --- SECURITY NOTE: An Admin/Role check should be implemented here or in a custom hook. ---
  // if (user?.role !== 'admin') { return <UnauthorizedComponent />; }
  // -----------------------------------------------------------------------------------------

  // 1. Fetch all books (Admin View)
  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      // Include Firebase JWT in headers for robust security (if verifyJWT is protecting this endpoint)
      // const token = await user.getIdToken();
      const response = await axios.get(`${API_BASE_URL}/books/all`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching all books:", error);
      Swal.fire("Error", "Failed to fetch all books for management.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // 2. Handle Status Update (Publish / Unpublish) - Reuses existing backend route
  const handleUpdateStatus = async (bookId, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    // ... (SweetAlert confirmation dialog remains the same) ...
    const result = await Swal.fire({
      title: `Are you sure you want to ${newStatus.toUpperCase()} this book?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.patch(
          `${API_BASE_URL}/books/status/${bookId}`,
          {
            status: newStatus,
          }
        );

        if (res.data.modifiedCount > 0) {
          Swal.fire("Success!", `Book status set to ${newStatus}.`, "success");
          fetchAllBooks(); // Refresh list
        }
      } catch (error) {
        console.error("Error updating book status:", error);
        Swal.fire("Error", `Failed to update status.`, "error");
      }
    }
  };

  // 3. Handle Book and Orders Deletion
  const handleDeleteBook = async (bookId, title) => {
    // ... (SweetAlert confirmation dialog remains the same) ...
    const result = await Swal.fire({
      title: `Are you sure you want to delete "${title}"?`,
      text: "This will permanently delete the book AND all associated orders!",
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(
          `${API_BASE_URL}/books/delete/${bookId}`
        );

        if (res.data.bookDeleted > 0) {
          Swal.fire(
            "Deleted!",
            `${title} and ${res.data.ordersDeleted} orders were deleted.`,
            "success"
          );
          fetchAllBooks(); // Refresh list
        }
      } catch (error) {
        console.error("Error deleting book:", error);
        Swal.fire("Error", "Failed to delete the book.", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-neutral mb-8">
        Manage Books ({books.length})
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-box">
        <table className="table w-full">
          {/* Table Head */}
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Librarian Email</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <th>{index + 1}</th>
                <td>
                  {/* Display small thumbnail */}
                  <div className="avatar">
                    <div className="w-12 h-16 mask ">
                      <img src={book.photo} alt={book.bookTitle} />
                    </div>
                  </div>
                </td>
                <td className="font-semibold">{book.bookTitle}</td>
                <td>{book.seller_libarien?.email || "N/A"}</td>
                <td>${book.price}</td>
                <td>
                  {/* Status Badge */}
                  <span
                    className={`badge badge-lg ${
                      book.status === "published"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {book.status}
                  </span>
                </td>
                <td className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-2">
                  {/* Edit Button (Links to BookEdit page from Router.jsx) */}
                  <Link
                    to={`/dashboard/edit-book/${book._id}`}
                    className="btn btn-xs btn-info text-white"
                  >
                    <FaEdit />
                  </Link>

                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleUpdateStatus(book._id, book.status)}
                    className={`btn btn-xs ${
                      book.status === "published"
                        ? "btn-warning"
                        : "btn-success"
                    } text-white`}
                    title={
                      book.status === "published" ? "Unpublish" : "Publish"
                    }
                  >
                    {book.status === "published" ? <FaEyeSlash /> : <FaEye />}
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteBook(book._id, book.bookTitle)}
                    className="btn btn-xs btn-error text-white"
                    title="Delete Book and Orders"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {books.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No books found in the system.
        </p>
      )}
    </div>
  );
};

export default ManageBooks;
