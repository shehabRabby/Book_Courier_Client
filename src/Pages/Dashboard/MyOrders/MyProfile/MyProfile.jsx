import React, { useState, useContext } from "react";
import { useOutletContext } from "react-router";
import toast, { Toaster } from "react-hot-toast";


import {
  FaUserCircle,
  FaEnvelope,
  FaCalendarAlt,
  FaSave,
  FaUserEdit,
  FaSpinner,
} from "react-icons/fa";
import { AuthContext } from "../../../../Context/AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = useOutletContext();
  const { updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || "");
  const [imageURL, setImageURL] = useState(user?.photoURL || "");

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  // 2. REAL PROFILE UPDATE FUNCTION IMPLEMENTATION using toast.promise
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!updateUserProfile) {
      toast.error("Authentication context failed to load the update function.");
      return;
    }

    // 1. Create the promise of the Firebase update call
    const updatePromise = updateUserProfile({
      displayName: name,
      photoURL: imageURL,
    });

    // 2. Use toast.promise to manage the async lifecycle (loading, success, error)
    await toast.promise(updatePromise, {
      loading: "Updating profile...",
      success: (data) => {
        // Success message
        return `Profile updated successfully! Welcome, ${name}.`;
      },
      error: (err) => {
        // Error message using the error details
        console.error("Profile Update Error:", err);
        return `Update failed: ${err.message}`;
      },
    });
  };

  // 3. RENDER THE ENHANCED PROFILE PAGE
  return (
    <div className="max-w-5xl mx-auto p-4 animate-fadeIn">
      {/* The Toaster component must be rendered once */}
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-4xl font-extrabold text-[#ff0077] mb-8 border-b-4 border-[#ff0077]/50 pb-3 flex items-center">
        <FaUserCircle className="mr-3 text-3xl" /> My Profile
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white p-8 rounded-2xl shadow-2xl">
        {/* Current Profile Info Card (Left) */}
        <div className="lg:col-span-1 flex flex-col items-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-[#ff0077]/20 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]">
          <img
            // Using the state value for instant preview
            src={
              imageURL ||
              "https://via.placeholder.com/150/ff0077/ffffff?text=User"
            }
            alt="User Profile"
            className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-[#ff0077] shadow-xl transition-all duration-300 transform hover:scale-105"
          />

          <h3 className="text-2xl font-bold text-gray-900 break-words text-center mb-4">
            {user?.displayName || "N/A"}
          </h3>

          <div className="space-y-3 w-full text-left">
            <p className="flex items-center text-md text-gray-700">
              <FaEnvelope className="mr-3 text-[#ff0077]" />
              {user?.email || "Email not available"}
            </p>
            <p className="flex items-center text-md text-gray-700">
              <FaCalendarAlt className="mr-3 text-[#ff0077]" />
              Joined: **{memberSince}**
            </p>
          </div>
        </div>

        {/* Update Form (Right) */}
        <div className="lg:col-span-2 p-4">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FaUserEdit className="mr-2" /> Update Profile Details
          </h3>

          {/* Dynamic Feedback Message state is removed, Toast handles this */}

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            {/* Name Input Group */}
            <div className="relative group">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Display Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-[#ff0077]/30 focus:border-[#ff0077] transition duration-300"
                placeholder="Enter new display name"
                required
                // Removed disabled={isUpdating} as toast handles loading feedback
              />
            </div>

            {/* Photo URL Input Group */}
            <div className="relative group">
              <label
                htmlFor="imageURL"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Photo URL
              </label>
              <input
                id="imageURL"
                type="url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-inner focus:outline-none focus:ring-4 focus:ring-[#ff0077]/30 focus:border-[#ff0077] transition duration-300"
                placeholder="Enter new photo URL"
                // Removed disabled={isUpdating}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              // Removed disabled={isUpdating} and the conditional class logic
              className={`w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-lg text-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.01] 
                                bg-[#ff0077] hover:bg-[#d60065] focus:ring-4 focus:ring-offset-2 focus:ring-[#ff0077]/50
                            `}
            >
              <FaSave className="mr-2" /> Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
