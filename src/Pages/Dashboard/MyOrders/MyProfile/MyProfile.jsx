import React, { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom"; 
import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaSave,
  FaUserEdit,
} from "react-icons/fa";
import { AuthContext } from "../../../../Context/AuthContext/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion"; // Added for animations

const MyProfile = () => {
  const { user } = useOutletContext();
  const { updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [imageURL, setImageURL] = useState(user?.photoURL || "");

  // Brand Colors
  const brandPrimary = "#6366f1"; // Indigo-500

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!updateUserProfile) {
      toast.error("Authentication context failed.");
      return;
    }

    const updatePromise = updateUserProfile({
      displayName: name,
      photoURL: imageURL,
    });

    await toast.promise(updatePromise, {
      loading: "Updating profile...",
      success: `Profile updated! Welcome, ${name}.`,
      error: (err) => `Update failed: ${err.message}`,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto p-4 text-base-content"
    >
      <Toaster position="top-center" reverseOrder={false} />

      {/* Header with Emerald/Indigo Border */}
      <motion.h2 
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        className="text-4xl font-extrabold text-[#6366f1] mb-8 border-b-4 border-[#6366f1]/30 pb-3 flex items-center italic"
      >
        <FaUserCircle className="mr-3 text-3xl" /> My Profile
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-base-100 p-8 rounded-[2rem] shadow-2xl border border-base-300 relative overflow-hidden">
        
        {/* Profile Card (Left) */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="lg:col-span-1 flex flex-col items-center p-6 bg-base-200/50 rounded-2xl border border-base-300 transition-all"
        >
          <div className="relative group">
            <img
              src={imageURL || "https://via.placeholder.com/150/6366f1/ffffff?text=User"}
              alt="User Profile"
              className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-[#6366f1] shadow-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          <h3 className="text-2xl font-black break-words text-center mb-4 uppercase tracking-tighter">
            {user?.displayName || "N/A"}
          </h3>

          <div className="space-y-4 w-full text-left">
            <div className="flex items-center text-sm font-medium p-3 bg-base-100 rounded-lg border border-base-300">
              <FaEnvelope className="mr-3 text-[#6366f1]" />
              <span className="truncate">{user?.email || "N/A"}</span>
            </div>
            <div className="flex items-center text-sm font-medium p-3 bg-base-100 rounded-lg border border-base-300">
              <FaCalendarAlt className="mr-3 text-[#6366f1]" />
              <p>Joined: <span className="text-[#6366f1] font-bold">{memberSince}</span></p>
            </div>
          </div>
        </motion.div>

        {/* Update Form (Right) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 p-4"
        >
          <h3 className="text-3xl font-black mb-6 flex items-center italic tracking-tight">
            <FaUserEdit className="mr-2 text-[#6366f1]" /> Update Details
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-xs uppercase tracking-widest opacity-60">Display Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full bg-base-200/30 focus:border-[#6366f1] focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                placeholder="Enter new display name"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-xs uppercase tracking-widest opacity-60">Photo URL</span>
              </label>
              <input
                type="url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="input input-bordered w-full bg-base-200/30 focus:border-[#6366f1] focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 rounded-xl"
                placeholder="Enter new photo URL"
              />
            </div>

            {/* Submit Button - Indigo Gradient Style */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white border-none  shadow-indigo-200 font-bold uppercase tracking-widest rounded-xl"
            >
              <FaSave className="mr-2" /> Save Changes
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyProfile;