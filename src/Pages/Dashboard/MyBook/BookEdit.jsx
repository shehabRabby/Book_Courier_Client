import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Components/Logo/Loading/Loading";
import {
  FaBook,
  FaEdit,
  FaImage,
  FaMoneyBillWave,
  FaSave,
  FaUpload,
} from "react-icons/fa";
// 👇 Import the imageUpload function
import { imageUpload } from "../../../Utiles/index.js"; // Adjust the path as needed

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // 2. Fetch the current book data
  const {
    data: book,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["bookToEdit", id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return res.data;
    },
    enabled: !!id,
  });

  // Initialize react-hook-form
  // Note: We use the actual field names from your book data (e.g., 'bookTitle', 'photo')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Reset the form fields once the book data is loaded
  useEffect(() => {
    if (book) {
      reset({
        // Adjust field names to match your AddBook.jsx structure (e.g., bookTitle vs title)
        bookTitle: book.bookTitle || "",
        authorName: book.authorName || "", // Assuming this exists
        price: book.price || 0,
        // The 'photo' field holds the file input, which cannot be pre-filled for security.
        description: book.description || "",
        // Ensure all fields from the original AddBook form are included here for completeness
        // You might need to add: category, isbn, language, page, publicationDate, rating, status
      });
    }
  }, [book, reset]);

  // 3. Mutation for updating the book
  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/${id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Book updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookToEdit", id] });
      queryClient.invalidateQueries({ queryKey: ["myLibrarianBooks"] });
      navigate("/dashboard/my-books");
    },
    onError: (error) => {
      toast.error(
        `Failed to update book: ${
          error.response?.data?.message || error.message
        }`
      );
    },
  });

  // 🚨 UPDATED SUBMISSION LOGIC
  const onSubmit = async (data) => {
    let finalPhotoUrl = book?.photo;
    const { photo: photoFileList, ...restOfData } = data;
    const newImageFile = photoFileList?.[0];

    if (newImageFile) {
      toast.loading("Uploading new image...", { id: "imageUpload" });
      try {
        const uploadResponse = await imageUpload(newImageFile);
        finalPhotoUrl = uploadResponse?.data?.display_url;

        if (!finalPhotoUrl) {
          throw new Error("Uploaded image URL is missing.");
        }
        toast.success("Image uploaded successfully!", { id: "imageUpload" });
      } catch (error) {
        console.error("Image upload error during edit:", error);
        toast.error("Image upload failed. Aborting update.", {
          id: "imageUpload",
        });
        return;
      }
    }
    const updatedBookData = {
      ...restOfData,
      photo: finalPhotoUrl,
      updatedAt: new Date(),
    };
    updateMutation.mutate(updatedBookData);
  };

  if (isLoading) return <Loading />;
  if (isError || !book)
    return (
      <h1 className="text-center text-red-600 text-3xl pt-20">
        Failed to load book data or book not found.
      </h1>
    );

  // Check for potential naming mismatches based on your AddBook form
  // If book.title is not present, use book.bookTitle for the header
  const bookTitleDisplay = book.bookTitle || book.title || "Loading Book...";

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen max-w-3xl mx-auto">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center">
          <FaEdit className="mr-3 text-indigo-600" /> Edit Book:{" "}
          {bookTitleDisplay}
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Modify the details for the book ID: {id}
        </p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-2xl">
        {/* Current Image Preview */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Current Image:
          </h3>
          <img
            src={book.photo || "placeholder-image.jpg"}
            alt={bookTitleDisplay}
            className="w-32 h-40 object-cover mx-auto rounded-lg border-2 border-gray-200 shadow-md"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Book Title (Using bookTitle based on your AddBook) */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <FaBook className="mr-2" /> Book Title
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              // 🚨 Using 'bookTitle' to match the AddBook field name
              {...register("bookTitle", { required: "Title is required" })}
            />
            {errors.bookTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookTitle.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <FaMoneyBillWave className="mr-2" /> Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* 🚨 NEW: Image File Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <FaUpload className="mr-2" /> Replace Book Cover Image
            </label>
            <input
              // 🚨 Using 'photo' field name to match AddBook
              {...register("photo")}
              type="file"
              className="file-input file-input-bordered file-input-md w-full bg-white transition duration-150"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank to keep the current image.
            </p>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              {...register("description")}
            ></textarea>
          </div>
          {/* Note: You should add all other fields from AddBook.jsx here (authorName, category, etc.) */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
            disabled={updateMutation.isLoading}
          >
            {updateMutation.isLoading ? (
              "Saving..."
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
          {updateMutation.isError && (
            <p className="text-red-500 text-center mt-3">
              Error updating book. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookEdit;
