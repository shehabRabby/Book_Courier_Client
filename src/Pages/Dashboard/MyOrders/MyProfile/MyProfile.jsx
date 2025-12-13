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
    <div className="max-w-5xl mx-auto p-4 animate-fadeIn text-base-content">
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-4xl font-extrabold text-[#ff0077] mb-8 border-b-4 border-[#ff0077]/50 pb-3 flex items-center">
        <FaUserCircle className="mr-3 text-3xl" /> My Profile
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-base-100 p-8 rounded-2xl shadow-2xl border border-base-300">
        
        <div className="lg:col-span-1 flex flex-col items-center p-6 bg-base-200 rounded-xl border border-base-300 transition-all duration-500 hover:shadow-lg">
          <img
            src={imageURL || "https://via.placeholder.com/150/ff0077/ffffff?text=User"}
            alt="User Profile"
            className="w-36 h-36 rounded-full object-cover mb-6 border-4 border-[#ff0077] shadow-xl"
          />

          <h3 className="text-2xl font-bold break-words text-center mb-4">
            {user?.displayName || "N/A"}
          </h3>

          <div className="space-y-3 w-full text-left opacity-90">
            <p className="flex items-center text-md">
              <FaEnvelope className="mr-3 text-[#ff0077]" />
              {user?.email || "Email not available"}
            </p>
            <p className="flex items-center text-md">
              <FaCalendarAlt className="mr-3 text-[#ff0077]" />
              Joined: <span className="font-semibold ml-1">{memberSince}</span>
            </p>
          </div>
        </div>

        {/* Update Form (Right) */}
        <div className="lg:col-span-2 p-4">
          <h3 className="text-3xl font-bold mb-6 flex items-center">
            <FaUserEdit className="mr-2 text-[#ff0077]" /> Update Details
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base-content">Display Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-[#ff0077] transition-all duration-300"
                placeholder="Enter new display name"
                required
              />
            </div>

            {/* Photo URL Input Group */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-base-content">Photo URL</span>
              </label>
              <input
                type="url"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
                className="input input-bordered w-full bg-base-100 focus:border-[#ff0077] transition-all duration-300"
                placeholder="Enter new photo URL"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full bg-[#ff0077] hover:bg-[#d60065] text-white border-none shadow-lg transform hover:scale-[1.01] transition-all"
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