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
  FaMoneyBillWave,
  FaSave,
  FaUpload,
  FaArrowLeft,
  FaUserEdit,
  FaAlignLeft,
} from "react-icons/fa";
import { imageUpload } from "../../../Utiles/index.js";

const BookEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const accentColor = "#ff0077"; // Brand accent

  const { data: book, isLoading, isError } = useQuery({
    queryKey: ["bookToEdit", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (book) {
      reset({
        bookTitle: book.bookTitle || "",
        authorName: book.authorName || "",
        price: book.price || 0,
        description: book.description || "",
      });
    }
  }, [book, reset]);

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/books/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Book updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookToEdit", id] });
      queryClient.invalidateQueries({ queryKey: ["myLibrarianBooks"] });
      navigate("/dashboard/my-books");
    },
  });

  const onSubmit = async (data) => {
    let finalPhotoUrl = book?.photo;
    const { photo: photoFileList, ...restOfData } = data;
    const newImageFile = photoFileList?.[0];

    if (newImageFile) {
      const uploadToast = toast.loading("Uploading new image...");
      try {
        const uploadResponse = await imageUpload(newImageFile);
        finalPhotoUrl = uploadResponse?.data?.display_url;
        toast.success("Image ready!", { id: uploadToast });
      } catch (error) {
        toast.error("Image upload failed.", { id: uploadToast });
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
  if (isError || !book) return <div className="text-center text-error p-20">Data error.</div>;

  return (
    <div className="p-4 md:p-8 bg-base-200 min-h-screen text-base-content">
      {/* Header with Back Button */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-ghost gap-2 normal-case"
        >
          <FaArrowLeft /> Back to List
        </button>
        <div className="badge badge-outline p-4 font-mono opacity-50">ID: {id}</div>
      </div>

      <header className="text-center mb-10">
        <h1 className="text-4xl font-black flex items-center justify-center gap-3">
          <FaEdit style={{ color: accentColor }} />
          Edit Book Details
        </h1>
        <p className="opacity-60 mt-2 font-medium italic">"{book.bookTitle}"</p>
      </header>

      <div className="max-w-4xl mx-auto bg-base-100 p-6 md:p-10 rounded-3xl shadow-2xl border border-base-300">
        
        {/* Update Flow Visualization */}
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left Column: Cover Preview */}
            <div className="flex flex-col items-center justify-center bg-base-200 rounded-2xl p-6 border-2 border-dashed border-base-300">
              <span className="text-xs font-bold uppercase opacity-40 mb-4 tracking-widest">Active Cover</span>
              <img
                src={book.photo}
                alt="Preview"
                className="w-40 h-56 object-cover rounded-xl shadow-xl border-4 border-base-100 mb-4"
              />
              <input
                {...register("photo")}
                type="file"
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
              <p className="text-[10px] opacity-50 mt-2 text-center">Accepted: JPG, PNG, WEBP (Max 5MB)</p>
            </div>

            {/* Right Column: Key Fields */}
            <div className="space-y-4">
              <div>
                <label className="label font-bold text-xs uppercase opacity-70">
                  <span className="flex items-center gap-2"><FaBook /> Book Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full focus:border-indigo-500"
                  {...register("bookTitle", { required: "Title is required" })}
                />
              </div>

              <div>
                <label className="label font-bold text-xs uppercase opacity-70">
                  <span className="flex items-center gap-2"><FaUserEdit /> Author Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  {...register("authorName", { required: "Author is required" })}
                />
              </div>

              <div>
                <label className="label font-bold text-xs uppercase opacity-70">
                  <span className="flex items-center gap-2"><FaMoneyBillWave /> Price (USD)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="input input-bordered w-full font-mono font-bold"
                  {...register("price", { required: true, valueAsNumber: true })}
                />
              </div>
            </div>
          </div>

          {/* Bottom Area: Full Width Description */}
          <div>
            <label className="label font-bold text-xs uppercase opacity-70">
              <span className="flex items-center gap-2"><FaAlignLeft /> Description / Synopsis</span>
            </label>
            <textarea
              rows="5"
              className="textarea textarea-bordered w-full text-base"
              {...register("description")}
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="btn flex-1 text-white border-none shadow-lg"
              style={{ backgroundColor: accentColor }}
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <><FaSave className="text-lg" /> Publish Changes</>
              )}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookEdit;