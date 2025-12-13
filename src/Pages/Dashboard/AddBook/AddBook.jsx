import React from "react";
import { motion } from "framer-motion";
import {
  FaBookMedical,
  FaBook,
  FaUserEdit,
  FaDollarSign,
  FaCalendarAlt,
  FaRulerVertical,
  FaGlobe,
  FaTag,
  FaImage,
  FaInfoCircle,
  FaStar,
  FaCloudUploadAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../Utiles/index.js";
import useAuth from "../../../Hooks/useAuth";
// ❌ REMOVE: import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../Components/Logo/Loading/Loading.jsx";
import ErrorPage from "../../ErrorPage/ErrorPage.jsx";
import toast from "react-hot-toast";
// 🚀 NEW IMPORT: Secure Axios
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
};

const AddBook = () => {
  const { user } = useAuth();
  const accentColor = "#ff0077";
  // 1. Instantiate the secure Axios instance
  const axiosSecure = useAxiosSecure();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      // 2. FIX: Use axiosSecure for the POST request
      await axiosSecure.post(`/books`, payload),
    onSuccess: () => {
      toast.success("Book Successfully Added");
      mutationReset();
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to add the book.");
    },
    retry: 2,
  });

  const onSubmit = async (data) => {
    const imageFile = data.photo[0];
    try {
      const uploadResponse = await imageUpload(imageFile);
      const finalPhotoUrl = uploadResponse?.data?.display_url;

      if (!finalPhotoUrl) throw new Error("Image upload failed");

      const bookData = {
        ...data,
        photo: finalPhotoUrl,
        // Ensure fields are correctly cast as numbers
        isbn: Number(data.isbn),
        page: Number(data.page),
        price: Number(data.price),
        rating: Number(data.rating),
        // Include seller info automatically
        seller_libarien: {
          image: user?.photoURL,
          name: user?.displayName,
          email: user?.email,
        },
      };

      await mutateAsync(bookData);
    } catch (error) {
      console.error(error);
      if (!error.response) { // Handle errors not caught by the mutation's onError (e.g., local image upload failure)
        toast.error("An error occurred before submitting the form.");
      }
    }
  };

  if (isPending) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-6 lg:px-8 text-base-content">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-10 text-center" variants={itemVariants}>
          <h1 className="text-4xl sm:text-5xl font-extrabold flex items-center justify-center">
            <FaBookMedical className="mr-3" style={{ color: accentColor }} />
            Add New Book
          </h1>
          <p className="opacity-60 mt-2 text-lg">
            Fill out the details below to catalog a new entry in your library.
          </p>
        </motion.header>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-base-100 p-6 sm:p-10 rounded-3xl shadow-2xl border border-base-300"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1 */}
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="label font-semibold opacity-80">
                  <span className="flex items-center">
                    <FaBook className="mr-2" style={{ color: accentColor }} /> Book Title
                  </span>
                </label>
                <input
                  type="text"
                  {...register("bookTitle", { required: "Title is required" })}
                  placeholder="e.g. The Great Gatsby"
                  className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                />
                {errors.bookTitle && <span className="text-error text-sm mt-1">{errors.bookTitle.message}</span>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label className="label font-semibold opacity-80">
                  <span className="flex items-center">
                    <FaUserEdit className="mr-2" style={{ color: accentColor }} /> Author Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("authorName", { required: "Author name is required" })}
                  placeholder="Author Name"
                  className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                />
                {errors.authorName && <span className="text-error text-sm mt-1">{errors.authorName.message}</span>}
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaTag className="mr-2" style={{ color: accentColor }} /> Genre
                    </span>
                  </label>
                  <select
                    {...register("category", { required: "Genre is required" })}
                    className="select select-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  >
                    <option value="">Select Genre</option>
                    <option value="fiction">Fiction</option>
                    <option value="nonfiction">Non-Fiction</option>
                    <option value="children">Children</option>
                    <option value="mystery">Mystery</option>
                  </select>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaCheckCircle className="mr-2" style={{ color: accentColor }} /> Status
                    </span>
                  </label>
                  <select
                    {...register("status", { required: "Status is required" })}
                    className="select select-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  >
                    <option value="">Choose Status</option>
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label className="label font-semibold opacity-80">
                  <span className="flex items-center">
                    <FaImage className="mr-2" style={{ color: accentColor }} /> Cover Image
                  </span>
                </label>
                <input
                  {...register("photo", { required: "Photo is required" })}
                  type="file"
                  className="file-input file-input-bordered w-full bg-base-200"
                />
                {errors.photo && <span className="text-error text-sm mt-1">{errors.photo.message}</span>}
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaDollarSign className="mr-2" style={{ color: accentColor }} /> Price ($)
                    </span>
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    step="0.01"
                    placeholder="29.99"
                    className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaRulerVertical className="mr-2" style={{ color: accentColor }} /> Pages
                    </span>
                  </label>
                  <input
                    {...register("page")}
                    type="number"
                    placeholder="320"
                    className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label className="label font-semibold opacity-80">
                  <span className="flex items-center">
                    <FaBook className="mr-2" style={{ color: accentColor }} /> ISBN
                  </span>
                </label>
                <input
                  {...register("isbn", { required: true })}
                  type="text"
                  placeholder="ISBN Number"
                  className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                />
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaGlobe className="mr-2" style={{ color: accentColor }} /> Language
                    </span>
                  </label>
                  <input
                    {...register("language", { required: true })}
                    type="text"
                    placeholder="English"
                    className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="label font-semibold opacity-80">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-2" style={{ color: accentColor }} /> Pub. Date
                    </span>
                  </label>
                  <input
                    {...register("publicationDate")}
                    type="date"
                    className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                  />
                </motion.div>
              </div>

              <motion.div variants={itemVariants}>
                <label className="label font-semibold opacity-80">
                  <span className="flex items-center">
                    <FaStar className="mr-2" style={{ color: accentColor }} /> Rating (1.0 - 5.0)
                  </span>
                </label>
                <input
                  {...register("rating", { required: true })}
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  placeholder="4.5"
                  className="input input-bordered w-full bg-base-200 focus:border-[#ff0077]"
                />
              </motion.div>
            </div>

            {/* Synopsis - Full Width */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <label className="label font-semibold opacity-80">
                <span className="flex items-center">
                  <FaInfoCircle className="mr-2" style={{ color: accentColor }} /> Synopsis
                </span>
              </label>
              <textarea
                {...register("description")}
                placeholder="Write a brief summary..."
                rows="3"
                className="textarea textarea-bordered w-full bg-base-200 focus:border-[#ff0077] resize-none"
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="mt-10">
            <button
              type="submit"
              disabled={isPending}
              className="btn w-full text-lg font-bold text-white border-none shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              style={{ backgroundColor: accentColor }}
            >
              <FaCloudUploadAlt className="mr-3 text-2xl" />
              {isPending ? "Adding Book..." : "Catalog Book"}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddBook;