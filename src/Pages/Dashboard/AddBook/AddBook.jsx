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
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Loading from "../../../Components/Logo/Loading/Loading.jsx";
import ErrorPage from "../../ErrorPage/ErrorPage.jsx";
import toast from "react-hot-toast";

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
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //   tanstack query and useMutation
  const {
    isPending,
    isError,
    mutateAsync,
    reset: mutationReset,
  } = useMutation({
    mutationFn: async (payload) =>
      await axios.post(`${import.meta.env.VITE_API_URL}/books`, payload),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Book Successfully Added");
      mutationReset();
      //query key invalidate
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error(error.response?.data?.message || "Failed to add the book.");
    },
    retry: 4,
  });

  const onSubmit = async (data) => {
    const {
      authorName,
      bookTitle,
      category,
      description,
      isbn,
      language,
      page,
      photo,
      price,
      publicationDate,
      rating,
      status,
    } = data;
    const imageFile = photo[0];
    const uploadResponse = await imageUpload(imageFile);
    const finalPhotoUrl = uploadResponse?.data?.display_url;

    if (!finalPhotoUrl) {
      console.error(
        "Image upload succeeded, but URL was not found in the response."
      );
      return;
    }

    const bookData = {
      photo: finalPhotoUrl,
      authorName,
      bookTitle,
      category,
      description,
      isbn: Number(isbn),
      language,
      page: Number(page),
      price: Number(price),
      publicationDate,
      rating: Number(rating),
      status,
      seller_libarien: {
        image: user?.photoURL,
        name: user?.displayName,
        email: user?.email,
      },
    };

    try {
      await mutateAsync(bookData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (isPending) return <Loading></Loading>;
  //ekhane error page na diye data error dekhabo
  if (isError) return <ErrorPage></ErrorPage>;

  const accentColor = "#ff0077";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.header className="mb-10 text-center" variants={itemVariants}>
          <h1 className="text-5xl font-extrabold text-gray-900 flex items-center justify-center">
            <FaBookMedical className="mr-3" style={{ color: accentColor }} />
            Add New Book to Library
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Fill out the details below to catalog a new entry.
          </p>
        </motion.header>

        {/* Main Form Container */}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100"
          variants={containerVariants}
        >
          {/* --- Grid Layout: Two Columns on Large Screens --- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              {/* Book Title */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaBook className="mr-2" style={{ color: accentColor }} />{" "}
                  Book Title
                </label>
                <input
                  type="text"
                  {...register("bookTitle", { required: true })}
                  placeholder="book title"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                  style={{ "--tw-ring-color": accentColor }}
                />
                {errors.bookTitle?.type === "required" && (
                  <span className="text-red-500">Title is required</span>
                )}
              </motion.div>

              {/* Author Name */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaUserEdit className="mr-2" style={{ color: accentColor }} />{" "}
                  Author Name
                </label>
                <input
                  type="text"
                  placeholder="authore name"
                  {...register("authorName", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                  style={{ "--tw-ring-color": accentColor }}
                />
                {errors.authorName?.type === "required" && (
                  <span className="text-red-500">Name is required</span>
                )}
              </motion.div>

              {/* Category/Genre */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaTag className="mr-2" style={{ color: accentColor }} />{" "}
                  Category/Genre
                </label>
                <select
                  {...register("category", { required: true })}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-4 focus:border-transparent transition duration-150"
                  style={{ "--tw-ring-color": accentColor }}
                >
                  <option value="">Select Genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="nonfiction">Non-Fiction</option>
                  <option value="children">Children's Literature</option>
                  <option value="mystery">Mystery</option>
                </select>
                {errors.category?.type === "required" && (
                  <span className="text-red-500">Category is required</span>
                )}
              </motion.div>

              {/* Book Status */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaCheckCircle
                    className="mr-2"
                    style={{ color: accentColor }}
                  />{" "}
                  Status
                </label>
                <select {...register("status", { required: true })}>
                  <option value="">Choose Status</option>
                  <option value="published">Published</option>
                  <option value="unpublished">Unpublished</option>
                </select>
                {errors.status?.type === "required" && (
                  <span className="text-red-500">
                    Status must be required. Please select one
                  </span>
                )}
              </motion.div>

              {/* Book Image Upload */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaImage className="mr-2" style={{ color: accentColor }} />{" "}
                  Book Cover Image
                </label>
                <input
                  {...register("photo", { required: true })}
                  type="file"
                  className="file-input file-input-bordered file-input-md w-full bg-white transition duration-150"
                />
                {errors.photo?.type === "required" && (
                  <span className="text-red-500">Cover Photo is required</span>
                )}
              </motion.div>
            </div>

            {/* Column 2 */}
            <div className="space-y-6">
              {/* Price and Pages (Inline Grid) */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                    <FaDollarSign
                      className="mr-2"
                      style={{ color: accentColor }}
                    />{" "}
                    Price ($)
                  </label>
                  <input
                    {...register("price", { required: true })}
                    type="number"
                    placeholder="enter price"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                    style={{ "--tw-ring-color": accentColor }}
                  />
                  {errors.price?.type === "required" && (
                    <span className="text-red-500">Add price</span>
                  )}
                </motion.div>

                {/* pages  */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                    <FaRulerVertical
                      className="mr-2"
                      style={{ color: accentColor }}
                    />{" "}
                    Pages
                  </label>
                  <input
                    {...register("page")}
                    type="number"
                    placeholder="total page"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                    style={{ "--tw-ring-color": accentColor }}
                  />
                </motion.div>
              </div>

              {/* ISBN */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaBook className="mr-2" style={{ color: accentColor }} />{" "}
                  ISBN (International Standard Book Number)
                </label>
                <input
                  {...register("isbn", { required: true })}
                  type="text"
                  placeholder="inter ISBN"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                  style={{ "--tw-ring-color": accentColor }}
                />
                {errors.isbn?.type === "required" && (
                  <span className="text-red-500">Add ISBN</span>
                )}
              </motion.div>

              {/* Language and Publication Date */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                    <FaGlobe className="mr-2" style={{ color: accentColor }} />{" "}
                    Language
                  </label>
                  <input
                    {...register("language", { required: true })}
                    type="text"
                    placeholder="Enter language"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                    style={{ "--tw-ring-color": accentColor }}
                  />
                  {errors.language?.type === "required" && (
                    <span className="text-red-500">Language require</span>
                  )}
                </motion.div>

                {/* publication date  */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                    <FaCalendarAlt
                      className="mr-2"
                      style={{ color: accentColor }}
                    />{" "}
                    Pub. Date
                  </label>
                  <input
                    {...register("publicationDate")}
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-4 focus:border-transparent transition duration-150"
                    style={{ "--tw-ring-color": accentColor }}
                  />
                </motion.div>
              </div>

              {/* Rating */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaStar className="mr-2" style={{ color: accentColor }} />{" "}
                  Rating (1.0 to 5.0)
                </label>
                <input
                  {...register("rating", { required: true })}
                  type="number"
                  placeholder="Enter ratting"
                  step="0.1"
                  min="1.0"
                  max="5.0"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150"
                  style={{ "--tw-ring-color": accentColor }}
                />
                {errors.rating?.type === "required" && (
                  <span className="text-red-500">Publication date require</span>
                )}
              </motion.div>

              {/* Book Description */}
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 flex items-center mb-1">
                  <FaInfoCircle
                    className="mr-2"
                    style={{ color: accentColor }}
                  />{" "}
                  Book Synopsis/Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="A brief summary of the book..."
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-4 focus:border-transparent transition duration-150 resize-none"
                  style={{ "--tw-ring-color": accentColor }}
                />
              </motion.div>
            </div>
          </div>

          {/* From Submit Button */}
          <motion.div variants={itemVariants} className="mt-10">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-4 px-6 rounded-xl text-lg font-bold text-white 
                                       transition duration-300 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-50 
                                       transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              style={{
                backgroundColor: accentColor,
                "--tw-ring-color": accentColor,
              }}
            >
              <FaCloudUploadAlt className="mr-3 text-2xl" />
              Add Book
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default AddBook;
